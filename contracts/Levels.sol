// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

import {Achievement, AchievementUserInfo} from "./abstract/Achievement.sol";
import {PermissionControl} from "./abstract/PermissionControl.sol";

import {IAssetPool} from "./interface/IAssetPool.sol";
import {ILevels} from "./interface/ILevels.sol";
import {INodes} from "./interface/INodes.sol";
import {ICard} from "./interface/ICard.sol";

uint256 constant LEVEL_3_PRICE = 1000 ether;

contract Levels is PermissionControl, Achievement, ILevels {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    mapping(address => uint8) public override startOf;
    INodes public inodes;

    address payable payableLevelAmountReceiptor;
    address public card;

    function initialize(
        address family_,
        address nodes_,
        address amountReceiptor_,
        address card_
    ) public initializer {
        __PermissionControl_init();

        uint40[] memory levelRewardRatios = new uint40[](7);
        levelRewardRatios[0] = uint40(0.0e12);
        levelRewardRatios[1] = uint40(0.04e12);
        levelRewardRatios[2] = uint40(0.04e12);
        levelRewardRatios[3] = uint40(0.04e12);
        levelRewardRatios[4] = uint40(0.04e12);
        levelRewardRatios[5] = uint40(0.04e12);
        levelRewardRatios[6] = uint40(0.04e12);

        uint40[] memory layerRewardRatios = new uint40[](7);
        layerRewardRatios[0] = uint40(0.0e12);
        layerRewardRatios[1] = uint40(0.02e12);
        layerRewardRatios[2] = uint40(0.02e12);
        layerRewardRatios[3] = uint40(0.02e12);
        layerRewardRatios[4] = uint40(0.02e12);
        layerRewardRatios[5] = uint40(0.02e12);
        layerRewardRatios[6] = uint40(0.02e12);

        uint8[] memory layerRewardDepths = new uint8[](7);
        layerRewardDepths[0] = 0;
        layerRewardDepths[1] = 3;
        layerRewardDepths[2] = 3;
        layerRewardDepths[3] = 3;
        layerRewardDepths[4] = 4;
        layerRewardDepths[5] = 5;
        layerRewardDepths[6] = 5;

        __Achievement_init(
            family_,
            levelRewardRatios,
            layerRewardRatios,
            layerRewardDepths,
            16
        );

        inodes = INodes(nodes_);
        payableLevelAmountReceiptor = payable(amountReceiptor_);
        card = card_;
    }

    function setLevelRewardRatios(
        uint40[] memory levelRatios_
    ) external onlyRole(MANAGER_ROLE) {
        levelRewardRatios = levelRatios_;
    }

    function setLayerRewardRatios(
        uint40[] memory layerRatios_
    ) external onlyRole(MANAGER_ROLE) {
        layerRewardRatios = layerRatios_;
    }

    function setLayerRewardDepths(
        uint8[] memory layerDepths_
    ) external onlyRole(MANAGER_ROLE) {
        layerRewardDepths = layerDepths_;
    }

    function upgradeToLevel3(address cardAddr) external payable {
        require(msg.value >= LEVEL_3_PRICE, "NeedPayment");
        require(
            ICard(card).ownerOfAddr(cardAddr) == msg.sender,
            "invalid cardAddr"
        );
        _upgradeToLevel(levelOf(cardAddr), 3, cardAddr);
        payableLevelAmountReceiptor.transfer(LEVEL_3_PRICE);
    }

    function levelUpgrade(
        address[] memory useChildren,
        address cardAddr
    ) external returns (uint8 origin, uint8 current) {
        require(
            ICard(card).ownerOfAddr(cardAddr) == msg.sender,
            "invalid cardAddr"
        );

        AchievementUserInfo storage info = userInfoOf[cardAddr];
        origin = info.level;
        current = origin;

        // total count each of greater or equal origin levels
        uint8[] memory childrenLevels = new uint8[](levelRewardRatios.length);
        for (uint256 i = 0; i < useChildren.length; i++) {
            require(
                addressTree.parentOf(useChildren[i]) == cardAddr,
                "InvaildChild"
            );

            for (uint256 j = origin; j < childrenLevels.length; j++) {
                if (userInfoOf[useChildren[i]].childrenLevelsNums[j] > 0) {
                    childrenLevels[j]++;
                }
            }
        }

        uint8 start = startOf[cardAddr];
        // Lv.1
        if (
            current == 0 && start >= 1 && info.childrenTotalValue >= 10000 ether
        ) {
            current = 1;
        }

        // Lv.2
        if (current == 1 && start >= 2 && childrenLevels[1] >= 2) {
            current = 2;
        }

        // Lv.3
        if (current == 2 && start >= 3 && childrenLevels[2] >= 2) {
            current = 3;
        }

        // Lv.4
        if (current == 3 && start >= 4 && childrenLevels[3] >= 3) {
            current = 4;
        }

        // Lv.5
        if (current == 4 && start >= 5 && childrenLevels[4] >= 3) {
            current = 5;
        }

        // Lv.6
        if (current == 5 && start >= 5 && childrenLevels[5] >= 3) {
            current = 6;
        }

        if (current > origin) {
            _upgradeToLevel(origin, current, cardAddr);
        }
    }

    function updateStartDelegate(
        address cardAddr,
        uint8 start
    ) external override onlyRole(DELEGATE_ROLE) {
        if (startOf[cardAddr] < start) {
            startOf[cardAddr] = start;
        }
    }

    function increaseDelegate(
        address cardAddr,
        uint256 amount
    ) external override onlyRole(DELEGATE_ROLE) {
        _increase(cardAddr, amount);
    }

    function whenLevelUpgraded(
        address cardAddr,
        uint8 origin,
        uint8 current
    ) internal override {
        origin;
        if (current == 4) {
            inodes.setNoderPowerDelegate(cardAddr, 1);
        } else if (current == 5) {
            inodes.setNoderPowerDelegate(cardAddr, 3);
        }
    }
}
