// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import {IMine} from "./interface/IMine.sol";
import {IFamily} from "./interface/IFamily.sol";
import {IAssetPool} from "./interface/IAssetPool.sol";
import {IWrappedCoin} from "./interface/IWrappedCoin.sol";
import {ILevels, AchievementRewardType, AchievementRewardInfo} from "./interface/ILevels.sol";

import {TranferEthWithCard, ICard} from "./abstract/TranferEthWithCard.sol";
import {PermissionControl} from "./abstract/PermissionControl.sol";

import "./library/UserInfo.sol";

// static distribution props
uint40 constant MINE_POOL_DISTRIBUTE_PROPS = 0.3e12;
uint40 constant NODES_DISTRIBUTE_PROPS = 0.02e12;
// share father distribution props
uint40 constant SHARE_PARENT_DISTRIBUTE_PROPS = 0.3e12;
uint40 constant FOMO_DISTRIBUTE_RADIO = 0.03e12;
uint40 constant WEEK_DISTRIBUTE_RADIO = 0.03e12;
uint40 constant DEV_DISTRIBUTE_RADIO = 0;

contract Home is
    Initializable,
    PermissionControl,
    ReentrancyGuardUpgradeable,
    TranferEthWithCard
{
    using SafeERC20Upgradeable for IERC20Upgradeable;
    using SafeERC20Upgradeable for IWrappedCoin;
    using UserInfoLib for mapping(address => UserInfo);

    // @notice user infomations
    mapping(address => UserInfo) public userInfoOf;

    // @notice quota multiplier per level
    mapping(uint8 => uint256) public quotaMultiplierPerOfStart;

    // @notice withdraw reward fee ratio ever level
    mapping(uint8 => uint40) public withdrawFeeRatioOfLevel;

    IFamily public family;
    ILevels public levels;
    IMine public mine;
    IAssetPool public fomoPool;
    IAssetPool public weekPool;
    IERC20Upgradeable public depositToken;

    address public devReceiptor;
    address public withdrawFeeReceiptor;

    uint256 public unownedAssetTokenId;
    uint256 public unownedAssetAmount;

    event Deposited(address indexed owner, uint256 amount, uint256 time);

    event TakedReward(address indexed owner, uint256 reward, uint256 time);

    event RewardIncreased(
        address indexed owner,
        address indexed sender,
        RewardType indexed rewardType,
        uint256 reward,
        uint256 time
    );

    function initialize(
        address depositToken_,
        address family_,
        address levels_,
        address mine_,
        address weekPool_,
        address fomoPool_,
        address devReceiptor_,
        address withdrawFeeReceiptor_,
        address card_
    ) public initializer {
        __PermissionControl_init();
        __ReentrancyGuard_init();
        __TranferEthOfCard_init(card_);

        quotaMultiplierPerOfStart[0] = 3.0e12;
        quotaMultiplierPerOfStart[1] = 3.0e12;
        quotaMultiplierPerOfStart[2] = 3.0e12;
        quotaMultiplierPerOfStart[3] = 3.0e12;
        quotaMultiplierPerOfStart[4] = 3.0e12;
        quotaMultiplierPerOfStart[5] = 3.0e12;
        quotaMultiplierPerOfStart[6] = 9.0e12;

        withdrawFeeRatioOfLevel[0] = 0.04e12;
        withdrawFeeRatioOfLevel[1] = 0.05e12;
        withdrawFeeRatioOfLevel[2] = 0.06e12;
        withdrawFeeRatioOfLevel[3] = 0.07e12;
        withdrawFeeRatioOfLevel[4] = 0.08e12;
        withdrawFeeRatioOfLevel[5] = 0.09e12;
        withdrawFeeRatioOfLevel[6] = 0.10e12;

        depositToken = IERC20Upgradeable(depositToken_);
        family = IFamily(family_);
        levels = ILevels(levels_);
        mine = IMine(mine_);
        weekPool = IAssetPool(weekPool_);
        fomoPool = IAssetPool(fomoPool_);

        devReceiptor = devReceiptor_;
        withdrawFeeReceiptor = withdrawFeeReceiptor_;
        unownedAssetTokenId = 10000;
    }

    function setWithdrawFeeReceiptor(
        address receiptor
    ) external onlyRole(MANAGER_ROLE) {
        require(receiptor != address(0), "ReceiptorIsNullAddress");
        withdrawFeeReceiptor = receiptor;
    }

    function setWithdrawFeeRatioAtLevel(
        uint8 lv,
        uint40 ratioE12
    ) external onlyRole(MANAGER_ROLE) {
        require(ratioE12 <= 1e12, "InvaildRatio");
        withdrawFeeRatioOfLevel[lv] = ratioE12;
    }

    function _rewardIncreasedHandle(
        address rewardReceiptor,
        RewardType rewardType,
        uint256 amount
    ) internal {
        if (amount > 0) {
            emit RewardIncreased(
                rewardReceiptor,
                msg.sender,
                rewardType,
                amount,
                block.timestamp
            );
        }
    }

    function _getParentOfDeep(
        address account,
        uint256 deep
    ) internal view returns (address) {
        address parent = account;
        for (uint i = 0; i < deep; i++) {
            parent = family.parentOf(parent);
            if (parent == address(0)) {
                return parent;
            }
        }
        return parent;
    }

    function getAmountParams(
        address cardAddr
    ) public view returns (uint8, uint256, uint256) {
        uint8 originStart = levels.startOf(cardAddr);
        uint256 minValue = 100 ether * 2 ** originStart;
        uint256 maxValue;
        if (originStart + 1 >= 5) {
            maxValue = type(uint256).max;
        } else {
            maxValue = 1000 ether;
        }
        if (originStart + 1 > 6) {
            minValue = 1000 ether;
        }
        return (originStart, minValue, maxValue);
    }

    function deposit(address cardAddr) external payable {
        (
            uint8 originStart,
            uint256 minValue,
            uint256 maxValue
        ) = getAmountParams(cardAddr);

        require(
            msg.value >= minValue && msg.value <= maxValue,
            "AmountOutOfRange"
        );
        require(
            ICard(card).ownerOfAddr(cardAddr) == msg.sender,
            "invalid cardAddr"
        );
        if (cardAddr != family.rootAddress()) {
            require(family.parentOf(cardAddr) != address(0), "no parent");
        }

        IWrappedCoin(address(depositToken)).deposit{value: msg.value}();
        _deposit(msg.value, cardAddr, originStart);
    }

    function _deposit(
        uint256 amount,
        address cardAddr,
        uint8 originStart
    ) internal {
        uint8 currentStart = originStart + 1;

        // increase levels achievement amount and update userinfo
        levels.increaseDelegate(cardAddr, amount);
        levels.updateStartDelegate(cardAddr, currentStart);

        UserInfo storage info = userInfoOf[cardAddr];
        info.totalDeposited += amount;
        info.rewardQuota +=
            (amount *
                quotaMultiplierPerOfStart[
                    currentStart > 6 ? 6 : currentStart
                ]) /
            1e12;

        // undistributed rewards
        uint256 diffAmount = amount;
        if (currentStart <= 6) {
            // 30% mine pool amount
            {
                uint256 minePoolAmount = (amount * MINE_POOL_DISTRIBUTE_PROPS) /
                    1e12;
                diffAmount -= minePoolAmount;
                depositToken.safeTransfer(address(mine), minePoolAmount);
            }

            // 30% to parent
            for (
                (uint256 searchDeep, address parent) = (
                    0,
                    _getParentOfDeep(cardAddr, currentStart)
                );
                searchDeep <= 16 - currentStart && parent != address(0);
                (searchDeep++, parent = family.parentOf(parent))
            ) {
                if (levels.startOf(parent) >= currentStart) {
                    diffAmount -= userInfoOf.increasePendingReward(
                        parent,
                        RewardType.Parent,
                        (amount * SHARE_PARENT_DISTRIBUTE_PROPS) / 1e12,
                        _rewardIncreasedHandle
                    );
                    break;
                }
            }
        } else {
            // >6 all in mine
            {
                uint256 minePoolAmount = (amount *
                    (MINE_POOL_DISTRIBUTE_PROPS +
                        SHARE_PARENT_DISTRIBUTE_PROPS)) / 1e12;
                diffAmount -= minePoolAmount;
                depositToken.safeTransfer(address(mine), minePoolAmount);
            }
        }

        // 24% levels + 10% layers
        {
            AchievementRewardInfo[] memory achievementRewardInfos = levels
                .distrubutionsForefathers(cardAddr, amount, 50);

            for (uint256 i = 0; i < achievementRewardInfos.length; i++) {
                AchievementRewardInfo
                    memory achievementRewardInfo = achievementRewardInfos[i];

                if (
                    achievementRewardInfo.account != address(0) &&
                    achievementRewardInfo.amount > 0
                ) {
                    diffAmount -= userInfoOf.increasePendingReward(
                        achievementRewardInfo.account,
                        achievementRewardInfo.rewardType ==
                            AchievementRewardType.Level
                            ? RewardType.Levels
                            : RewardType.Layers,
                        achievementRewardInfo.amount,
                        _rewardIncreasedHandle
                    );
                }
            }
        }

        // when deposit count >= 3 clear mine pool powers
        if (currentStart == 1) {
            mine.addPowerDelegate(cardAddr, (amount * 1.5e12) / 1e12);
        } else if (currentStart == 3) {
            mine.clearPowerDelegate(cardAddr);
        }

        // transfer to fomo pool
        {
            uint256 fomoAmount = (amount * FOMO_DISTRIBUTE_RADIO) / 1e12;
            if (fomoAmount > 0) {
                diffAmount -= fomoAmount;
                depositToken.safeTransfer(address(fomoPool), fomoAmount);
                fomoPool.depositedDelegate(cardAddr, amount, fomoAmount);
            }
        }

        // transfer to week pool
        {
            uint256 weekAmount = (amount * WEEK_DISTRIBUTE_RADIO) / 1e12;
            if (weekAmount > 0) {
                diffAmount -= weekAmount;
                depositToken.safeTransfer(address(weekPool), weekAmount);
                weekPool.depositedDelegate(
                    family.parentOf(cardAddr),
                    amount,
                    weekAmount
                );
            }
        }

        // trasnfer to dev
        // {
        //     uint256 devAmount = (amount * WEEK_DISTRIBUTE_RADIO) / 1e12;
        //     if (devAmount > 0) {
        //         diffAmount -= devAmount;
        //         depositToken.safeTransfer(devReceiptor, devAmount);
        //     }
        // }

        // diffamount to unownedAssetReceiptor
        if (diffAmount > 0) {
            unownedAssetAmount += diffAmount;
            //depositToken.safeTransfer(unownedAssetReceiptor, diffAmount);
        }

        emit Deposited(cardAddr, amount, block.timestamp);
    }

    function earned(address cardAddr) public view returns (uint256) {
        UserInfo memory info = userInfoOf[cardAddr];
        return info.rewardPending;
    }

    function takeReward(address cardAddr) external nonReentrant {
        require(
            ICard(card).ownerOfAddr(cardAddr) == msg.sender,
            "invalid cardAddr"
        );

        uint256 reward = earned(cardAddr);

        UserInfo storage userInfo = userInfoOf[cardAddr];
        userInfo.rewardPending = 0;
        userInfo.rewardTotal += reward;

        // take 10% fee
        require(
            depositToken.balanceOf(address(this)) >= reward,
            "InsufficientReward"
        );

        IWrappedCoin(address(depositToken)).withdraw(reward);

        uint8 lv = levels.levelOf(cardAddr);
        uint256 rewardFee = (reward * withdrawFeeRatioOfLevel[lv]) / 1e12;

        payable(msg.sender).transfer(reward - rewardFee);
        payable(withdrawFeeReceiptor).transfer(rewardFee);

        emit TakedReward(cardAddr, reward, block.timestamp);
    }

    function takeUnownedAssetBalance() external {
        require(unownedAssetAmount > 0, "zero");
        require(
            ICard(card).ownerOf(unownedAssetTokenId) == msg.sender,
            "invalid msg"
        );
        IWrappedCoin(address(depositToken)).withdraw(unownedAssetAmount);

        payable(msg.sender).transfer(unownedAssetAmount);
        unownedAssetAmount = 0;
    }

    receive() external payable {}
}
