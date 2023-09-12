// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import {IAssetPool} from "./interface/IAssetPool.sol";
import {IWrappedCoin} from "./interface/IWrappedCoin.sol";
import {TranferEthWithCard} from "./abstract/TranferEthWithCard.sol";
import {PermissionControl} from "./abstract/PermissionControl.sol";

contract PoolFomo is
    PermissionControl,
    IAssetPool,
    ReentrancyGuardUpgradeable,
    TranferEthWithCard
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    struct InvestInfo {
        address account;
        uint256 amount;
    }

    uint256 public distrubutedTime;
    IERC20Upgradeable public rewardToken;
    InvestInfo[] public investHistoryAt;
    address public unownedAssetReceiptor;

    event Distrubtioned(
        uint256 time,
        uint256 beforTotalAmount,
        uint256 afterTotalAmount
    );

    event Transfer(address indexed from, address indexed to, uint256 value);

    function initialize(
        address rewardToken_,
        address unownedAssetReceiptor_,
        address card_
    ) public initializer {
        __PermissionControl_init();
        __ReentrancyGuard_init();
        __TranferEthOfCard_init(card_);
        rewardToken = IERC20Upgradeable(rewardToken_);
        unownedAssetReceiptor = unownedAssetReceiptor_;
        distrubutedTime = block.timestamp + 12 hours;
    }

    function investHistoryLen() external view returns (uint256) {
        return investHistoryAt.length;
    }

    function depositedDelegate(
        address cardAddr,
        uint256 depositedAmount,
        uint256 sentAmount
    ) external override onlyRole(DELEGATE_ROLE) {
        sentAmount;

        require(block.timestamp < distrubutedTime, "time's up");
        distrubutedTime = block.timestamp + 12 hours;

        // 追加投入历史
        investHistoryAt.push(
            InvestInfo({account: cardAddr, amount: depositedAmount})
        );
    }

    function restartTick() external onlyRole(MANAGER_ROLE) {
        require(block.timestamp > distrubutedTime, "time not up");
        distrubutedTime = block.timestamp + 12 hours;
    }

    receive() external payable {}

    function distrubtionPool() external nonReentrant onlyRole(MANAGER_ROLE) {
        require(block.timestamp > distrubutedTime, "not yet");
        uint256 historyLen = investHistoryAt.length;
        require(historyLen > 0, "empty invest history");

        uint256 totalReward = rewardToken.balanceOf(address(this));
        uint256 beforTotalAmount = totalReward;
        uint256 index = historyLen - 1;
        uint256 descNum;

        require(totalReward > 0, "no reward");
        IWrappedCoin(address(rewardToken)).withdraw(totalReward);

        do {
            descNum = (historyLen - 1 - index);

            uint256 sentReward;
            // Desc 1
            if (descNum == 0) {
                sentReward = (totalReward * 0.5e12) / 1e12;
            } else {
                sentReward = investHistoryAt[index].amount * 2;
            }

            // 不足时全部发送
            if (totalReward < sentReward) {
                sentReward = totalReward;
            }

            totalReward -= sentReward;
            if (investHistoryAt[index].account != address(0)) {
                tranferEthTo(investHistoryAt[index].account, sentReward);
                //payable(investHistoryAt[index].account).transfer(sentReward);
                emit Transfer(
                    address(this),
                    investHistoryAt[index].account,
                    sentReward
                );
            }

            if (index == 0) {
                break;
            }
            index--;
        } while (totalReward > 0 && descNum < 50);

        // 剩余量转移
        uint256 afterTotalAmount = address(this).balance;
        if (afterTotalAmount > 0) {
            payable(unownedAssetReceiptor).transfer(afterTotalAmount);
        }

        emit Distrubtioned(block.timestamp, beforTotalAmount, afterTotalAmount);
    }
}
