// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

import {Achievement} from "./abstract/Achievement.sol";
import {PermissionControl} from "./abstract/PermissionControl.sol";
import {TranferEthWithCard, ICard} from "./abstract/TranferEthWithCard.sol";

import {IAssetPool} from "./interface/IAssetPool.sol";
import {ILevels} from "./interface/ILevels.sol";
import {INodes} from "./interface/INodes.sol";

contract Nodes is PermissionControl, INodes, TranferEthWithCard {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    struct MinerInfo {
        uint256 reward;
        uint256 taked;
        uint256 power;
        uint256 rewardDebt;
    }

    mapping(address => MinerInfo) public minerInfoOf;
    uint256 private accountPerShare;
    uint256 public override totalPower;
    IERC20Upgradeable public rewardToken;

    function initialize(
        address rewardToken_,
        address card_
    ) public initializer {
        __PermissionControl_init();
        __TranferEthOfCard_init(card_);
        rewardToken = IERC20Upgradeable(rewardToken_);
    }

    /// @notice 用户收益
    function earned(address cardAddr) public view returns (uint256) {
        MinerInfo storage info = minerInfoOf[cardAddr];
        if (totalPower == 0) {
            return 0;
        }
        return
            info.reward +
            (info.power * (accountPerShare - info.rewardDebt)) /
            1e12;
    }

    function takeReward(address cardAddr) external {
        MinerInfo storage info = minerInfoOf[cardAddr];
        uint256 reward = earned(cardAddr);
        if (reward > 0) {
            info.reward = 0;
            info.rewardDebt = accountPerShare;
            info.taked += reward;
            rewardToken.safeTransfer(msg.sender, reward);
        }

        emit TakedReward(cardAddr, reward, block.timestamp);
    }

    function setNoderPowerDelegate(
        address cardAddr,
        uint256 power
    ) external onlyRole(DELEGATE_ROLE) {
        MinerInfo storage info = minerInfoOf[cardAddr];

        // 结算当前奖励
        info.reward = earned(cardAddr);
        info.rewardDebt = accountPerShare;

        // 算力更新
        totalPower = totalPower - info.power + power;
        info.power = power;
        minerInfoOf[cardAddr].power = power;

        emit NoderPowerChanged(cardAddr, power);
    }

    function distrubutionReward(uint256 amount) external {
        require(totalPower != 0, "TotalPowerIsZero");
        rewardToken.safeTransferFrom(msg.sender, address(this), amount);
        accountPerShare += (amount * 1e12) / totalPower;
    }
}
