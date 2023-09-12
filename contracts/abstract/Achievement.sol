// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import {IFamily} from "../interface/IFamily.sol";

enum AchievementRewardType {
    Level,
    Layer
}

struct AchievementRewardInfo {
    AchievementRewardType rewardType;
    address account;
    uint256 amount;
}

struct AchievementResponse {
    address child;
    uint8 level;
    uint256 selfValue;
    uint256 childrenTotalValue;
}

struct AchievementUserInfo {
    uint256 selfValue;
    uint256 childrenTotalValue;
    uint8 level;
    mapping(uint256 => uint256) childrenLevelsNums;
}

abstract contract Achievement is Initializable {
    uint256 public settlementDeepMaxLimit;
    IFamily internal addressTree;

    /// @notice account info
    mapping(address => AchievementUserInfo) public userInfoOf;

    /// @notice befor activity levels increased total values
    mapping(address => uint256) public beforActivityValue;

    /// @notice level reward
    uint40[] public levelRewardRatios;

    /// @notice layer reward ratios
    uint40[] public layerRewardRatios;

    /// @notice layer reward depths
    uint8[] public layerRewardDepths;

    function __Achievement_init(
        address addressTree_,
        uint40[] memory levelRatios_,
        uint40[] memory layerRatios_,
        uint8[] memory layerDepths_,
        uint8 settlementDeepMaxLimit_
    ) internal onlyInitializing {
        addressTree = IFamily(addressTree_);
        settlementDeepMaxLimit = settlementDeepMaxLimit_;
        levelRewardRatios = levelRatios_;
        layerRewardRatios = layerRatios_;
        layerRewardDepths = layerDepths_;
    }

    function levelOf(address owner) public view returns (uint8) {
        return userInfoOf[owner].level;
    }

    function childrenAchievementsOf(
        address owner
    ) external view returns (AchievementResponse[] memory) {
        address[] memory children = addressTree.childrenOf(owner);
        AchievementResponse[] memory response = new AchievementResponse[](
            children.length
        );

        for (uint256 i = 0; i < children.length; i++) {
            response[i].child = children[i];
            response[i].level = userInfoOf[children[i]].level;
            response[i].selfValue = userInfoOf[children[i]].selfValue;
            response[i].childrenTotalValue = userInfoOf[children[i]]
                .childrenTotalValue;
        }

        return response;
    }

    function distrubutionsForefathers(
        address owner,
        uint256 amountValue,
        uint256 searchDeepMaxLimit
    ) external view returns (AchievementRewardInfo[] memory rewards) {
        uint8 endLevel = uint8(levelRewardRatios.length - 1);
        rewards = new AchievementRewardInfo[](endLevel * 2);

        uint256 seqOffset;
        uint8 lastSearchLevel;
        uint8 layerDepth;

        for (
            (uint256 depth, address parent) = (1, addressTree.parentOf(owner));
            (depth <= searchDeepMaxLimit && parent != address(0));
            (depth++, parent = addressTree.parentOf(parent))
        ) {
            uint8 lv = levelOf(parent);
            if (lv == 0) {
                continue;
            } else {
                layerDepth++;
            }

            // level reward
            if (lv > lastSearchLevel) {
                uint256 subProp;
                for (uint8 l = lastSearchLevel + 1; l <= lv; l++) {
                    subProp += levelRewardRatios[l];
                }
                rewards[seqOffset] = AchievementRewardInfo({
                    rewardType: AchievementRewardType.Level,
                    account: parent,
                    amount: (amountValue * subProp) / 1e12
                });
                seqOffset++;
                lastSearchLevel = lv;
            }

            // layer reward
            if (
                lv < layerRewardDepths.length &&
                layerDepth <= layerRewardDepths[lv]
            ) {
                rewards[seqOffset] = AchievementRewardInfo({
                    rewardType: AchievementRewardType.Layer,
                    account: parent,
                    amount: (amountValue * layerRewardRatios[lv]) / 1e12
                });
                seqOffset++;
            }

            if (
                lastSearchLevel >= endLevel &&
                layerDepth >= layerRewardDepths[layerRewardDepths.length - 1]
            ) {
                break;
            }
        }

        assembly {
            mstore(rewards, seqOffset)
        }
    }

    function _increase(address owner, uint256 amount) internal {
        if (addressTree.parentOf(owner) == address(0)) {
            beforActivityValue[owner] += amount;
            return;
        }

        if (beforActivityValue[owner] > 0) {
            amount += beforActivityValue[owner];
            beforActivityValue[owner] = 0;
        }

        // 变更自身数据
        userInfoOf[owner].selfValue += amount;

        address parent = addressTree.parentOf(owner);
        for (
            (uint256 i, address child) = (0, owner);
            i < settlementDeepMaxLimit - 1 && parent != address(0);
            (i++, child = parent, parent = addressTree.parentOf(parent))
        ) {
            userInfoOf[parent].childrenTotalValue += amount;
        }
    }

    function _upgradeToLevel(
        uint8 origin,
        uint8 current,
        address account
    ) internal {
        require(current > origin, "unable to upgrade");
        userInfoOf[account].level = current;

        for (
            (address parent, uint256 i) = (account, 0);
            parent != address(0) && i < settlementDeepMaxLimit;
            (i++, parent = addressTree.parentOf(parent))
        ) {
            for (uint8 l = origin; l <= current; l++) {
                userInfoOf[parent].childrenLevelsNums[l]++;
            }
        }

        whenLevelUpgraded(account, origin, current);
    }

    function whenLevelUpgraded(
        address account,
        uint8 origin,
        uint8 current
    ) internal virtual {}
}
