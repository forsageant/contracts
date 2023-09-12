// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import {IAssetPool} from "./interface/IAssetPool.sol";
import {IWrappedCoin} from "./interface/IWrappedCoin.sol";
import {PermissionControl} from "./abstract/PermissionControl.sol";
import {TranferEthWithCard} from "./abstract/TranferEthWithCard.sol";

contract PoolWeek is
    PermissionControl,
    IAssetPool,
    ReentrancyGuardUpgradeable,
    TranferEthWithCard
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    struct EpochInfo {
        address[10] topAddresses;
        uint256 totalReward;
        uint256 distrubutedTime;
    }

    IERC20Upgradeable public rewardToken;
    address public unownedAssetReceiptor;
    uint256 public epochStartTime;

    mapping(uint256 => EpochInfo) public epochInfoOf;
    mapping(uint256 => mapping(address => uint256))
        public valueOfEpochAndAccount;

    function initialize(
        address rewardToken_,
        address unownedAssetReceiptor_,
        address card_
    ) public initializer {
        __PermissionControl_init();
        __ReentrancyGuard_init();
        __TranferEthOfCard_init(card_);

        epochStartTime = (block.timestamp / 1 days) * 1 days;
        rewardToken = IERC20Upgradeable(rewardToken_);
        unownedAssetReceiptor = unownedAssetReceiptor_;
    }

    function currentIndex() external view returns (uint256) {
        return (block.timestamp - epochStartTime) / 7 days;
    }

    function topAddressInfoAtEpoch(
        uint256 targetEpochIndex
    )
        external
        view
        returns (address[10] memory addresses, uint256[10] memory amounts)
    {
        EpochInfo storage epochInfo = epochInfoOf[targetEpochIndex];

        addresses = epochInfo.topAddresses;
        for (uint256 i = 0; i < addresses.length; i++) {
            amounts[i] = valueOfEpochAndAccount[targetEpochIndex][addresses[i]];
        }
    }

    receive() external payable {}

    function distrubtionAtEpoch(
        uint256 targetEpochIndex
    ) external nonReentrant {
        uint256 currentEpochIndex = (block.timestamp - epochStartTime) / 7 days;
        EpochInfo storage epochInfo = epochInfoOf[targetEpochIndex];

        // The current cycle is greater than the allocation cycle, there are rewards, and they can only be used if they have not been allocated yet
        require(
            targetEpochIndex < currentEpochIndex &&
                epochInfo.totalReward > 0 &&
                epochInfo.distrubutedTime == 0,
            "InvaildEpochInfo"
        );

        epochInfo.distrubutedTime = block.timestamp;

        // start distubution
        uint256 totalReward = epochInfo.totalReward / 2;
        uint256 totalRewardDiff = totalReward;

        IWrappedCoin(address(rewardToken)).withdraw(totalReward);

        for (uint i = 0; i < epochInfo.topAddresses.length; i++) {
            address account = epochInfo.topAddresses[i];
            if (account == address(0)) {
                continue;
            }
            uint256 sentReward;
            if (i == 0) {
                sentReward = (totalReward * 0.5e12) / 1e12;
            } else if (i == 1) {
                sentReward = (totalReward * 0.2e12) / 1e12;
            } else {
                sentReward = (totalReward * 0.3e12) / 1e12 / 8;
            }

            totalRewardDiff -= sentReward;
            tranferEthTo(account, sentReward);
            //payable(account).transfer(sentReward);
        }

        if (totalRewardDiff > 0) {
            payable(unownedAssetReceiptor).transfer(totalRewardDiff);
        }
    }

    function depositedDelegate(
        address parent,
        uint256 depositedAmount,
        uint256 sentAmount
    ) external override onlyRole(DELEGATE_ROLE) {
        // 获取周期检索
        uint256 epochIndex = (block.timestamp - epochStartTime) / 7 days;
        // 获取当前周期数据
        EpochInfo storage epochInfo = epochInfoOf[epochIndex];
        // 奖励累计记录
        epochInfo.totalReward += sentAmount;

        if (parent != address(0)) {
            address[10] storage topAddresses = epochInfo.topAddresses;
            mapping(address => uint256)
                storage valueOf = valueOfEpochAndAccount[epochIndex];

            valueOf[parent] += depositedAmount;
            uint256 parentValue = valueOf[parent];

            int256 originOrderIndex = -1;
            for (uint256 i = 0; i < topAddresses.length; i++) {
                if (topAddresses[i] == parent) {
                    originOrderIndex = int256(i);
                    break;
                }
            }

            for (
                uint256 i = 0;
                i <
                (
                    originOrderIndex >= 0
                        ? uint256(originOrderIndex)
                        : topAddresses.length
                );
                i++
            ) {
                if (valueOf[topAddresses[i]] < parentValue) {
                    for (
                        uint256 j = (
                            originOrderIndex >= 0
                                ? uint256(originOrderIndex)
                                : topAddresses.length - 1
                        );
                        j > i;
                        j--
                    ) {
                        topAddresses[j] = topAddresses[j - 1];
                    }

                    topAddresses[i] = parent;
                    break;
                }
            }
        }
    }
}
