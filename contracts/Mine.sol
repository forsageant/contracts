// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import {IERC20MetadataUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable.sol";

import {Achievement} from "./abstract/Achievement.sol";
import {PermissionControl} from "./abstract/PermissionControl.sol";
import {TranferEthWithCard, ICard} from "./abstract/TranferEthWithCard.sol";

import {IPancakeRouter} from "./interface/IPancakeRouter.sol";
import {IPancakeFactory} from "./interface/IPancakeFactory.sol";

import {IAssetPool} from "./interface/IAssetPool.sol";
import {ILevels} from "./interface/ILevels.sol";

uint256 constant CREATE_LIQUIDITY_DURATION_LIMIT = 0.1 days;
uint256 constant CREATE_LIQUIDITY_CURRENCY_TOKEN_AMOUNT = 21 ether;
uint256 constant CREATE_LIQUIDITY_REWARD_TOKEN_AMOUNT = 21000000 ether;

contract Mine is PermissionControl, TranferEthWithCard {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    struct MinerInfo {
        uint256 reward;
        uint256 taked;
        uint256 power;
        uint256 rewardDebt;
    }

    mapping(address => MinerInfo) public minerInfoOf;

    IPancakeRouter public router;
    IERC20Upgradeable public rewardToken;
    IERC20Upgradeable public currencyToken;

    bool public isInitedLiquidity;

    uint256 public totalPower;
    uint256 public createTime;
    uint256 public accountPerShare;
    uint256 public accountPerShareUpdateTime;

    event TakedReward(address indexed owner, uint256 reward, uint256 time);

    function initialize(
        address rewardToken_,
        address router_,
        address currencyToken_,
        address card_
    ) public initializer {
        __PermissionControl_init();
        __TranferEthOfCard_init(card_);
        rewardToken = IERC20Upgradeable(rewardToken_);
        router = IPancakeRouter(router_);
        currencyToken = IERC20Upgradeable(currencyToken_);
        createTime = block.timestamp;
    }

    function addPowerDelegate(
        address account,
        uint256 power
    ) external onlyRole(DELEGATE_ROLE) {
        MinerInfo storage info = minerInfoOf[account];

        // settlement current reward
        info.reward = earned(account);
        info.rewardDebt = accountPerShare;

        // update powers
        totalPower += power;
        info.power += power;
    }

    function clearPowerDelegate(
        address account
    ) external onlyRole(DELEGATE_ROLE) {
        MinerInfo storage info = minerInfoOf[account];

        // settlement current reward
        uint256 reward = earned(account);
        info.rewardDebt = accountPerShare;
        if (reward > 0) {
            uint8 decimals = IERC20MetadataUpgradeable(address(rewardToken))
                .decimals();
            uint256 rewardTokenPrice = _rewardTokenPerCurrency(10 ** decimals);
            uint256 rewardQuotaDiff = (info.power * (10 ** decimals)) /
                rewardTokenPrice;

            if (reward > rewardQuotaDiff) {
                reward = rewardQuotaDiff;
            }
        }
        info.reward = reward;
        // update powers
        totalPower -= info.power;
        info.power = 0;
    }

    function setMineEnable() external onlyRole(MANAGER_ROLE) {
        require(isInitedLiquidity, "NoInitedLiquidity");
        require(accountPerShareUpdateTime == 0, "AlreadyEnable");
        require(totalPower > 0, "TotalPowerIsZero");

        accountPerShareUpdateTime = block.timestamp;
    }

    function initLiquidity() external onlyRole(MANAGER_ROLE) {
        require(!isInitedLiquidity, "InitedLiquidity");

        require(
            block.timestamp > createTime + CREATE_LIQUIDITY_DURATION_LIMIT,
            "TimeNotYet"
        );

        require(
            currencyToken.balanceOf(address(this)) >=
                CREATE_LIQUIDITY_CURRENCY_TOKEN_AMOUNT,
            "InsufficientCurrency"
        );

        // make liquidity
        rewardToken.approve(
            address(router),
            CREATE_LIQUIDITY_REWARD_TOKEN_AMOUNT
        );
        currencyToken.approve(
            address(router),
            CREATE_LIQUIDITY_CURRENCY_TOKEN_AMOUNT
        );
        router.addLiquidity(
            address(currencyToken),
            address(rewardToken),
            CREATE_LIQUIDITY_CURRENCY_TOKEN_AMOUNT,
            CREATE_LIQUIDITY_REWARD_TOKEN_AMOUNT,
            CREATE_LIQUIDITY_CURRENCY_TOKEN_AMOUNT,
            CREATE_LIQUIDITY_REWARD_TOKEN_AMOUNT,
            address(this),
            block.timestamp
        );
        isInitedLiquidity = true;
    }

    function _getMaxOutput(
        uint256 amount,
        address[] memory buyPath
    ) internal view returns (uint256) {
        uint256[] memory amounts = router.getAmountsOut(amount, buyPath);
        return amounts[1];
    }

    function _pendingAccountPerShare() internal {
        uint256 rewardBeforeBalance = rewardToken.balanceOf(address(this));
        uint256 currencyBeforeBalance = currencyToken.balanceOf(address(this));
        address pair = IPancakeFactory(router.factory()).getPair(
            address(rewardToken),
            address(currencyToken)
        );
        uint256 pairBalance = IERC20Upgradeable(pair).balanceOf(address(this));

        address[] memory buyPath = new address[](2);
        buyPath[0] = address(currencyToken);
        buyPath[1] = address(rewardToken);

        // 0.05% removeLiquidity
        IERC20Upgradeable(pair).approve(address(router), pairBalance / 2000);
        router.removeLiquidity(
            address(rewardToken),
            address(currencyToken),
            pairBalance / 2000,
            0,
            0,
            address(this),
            block.timestamp
        );
        uint256 currencyAfterBalance = currencyToken.balanceOf(address(this));

        // 10% + 0.05% currency buy reward
        uint256 amountIn = currencyBeforeBalance /
            10 +
            (currencyAfterBalance - currencyBeforeBalance);
        uint256 amountOutMin = _getMaxOutput(amountIn, buyPath);
        currencyToken.approve(address(router), amountIn);
        router.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amountIn,
            (amountOutMin * 0.98e18) / 1e18,
            buyPath,
            address(this),
            block.timestamp
        );

        uint256 rewardAfterBalance = rewardToken.balanceOf(address(this));

        accountPerShare +=
            ((rewardAfterBalance - rewardBeforeBalance) * 1e12) /
            totalPower;
    }

    function updateAccountPerShare() external {
        require(accountPerShareUpdateTime > 0, "NotAlreadyEnable");
        require(
            block.timestamp - accountPerShareUpdateTime > 1 days,
            "NotAllowed"
        );
        _pendingAccountPerShare();
        accountPerShareUpdateTime += 1 days;
    }

    function earned(address cardAddr) public view returns (uint256) {
        if (accountPerShareUpdateTime == 0 || totalPower == 0) {
            return 0;
        }

        MinerInfo storage info = minerInfoOf[cardAddr];
        return
            info.reward +
            (info.power * (accountPerShare - info.rewardDebt)) /
            1e12;
    }

    function _rewardTokenPerCurrency(
        uint256 rewardAmount
    ) internal view returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = address(rewardToken);
        path[1] = address(currencyToken);
        return router.getAmountsOut(rewardAmount, path)[1];
    }

    function takeReward(address cardAddr) external returns (uint256 reward) {
        require(
            ICard(card).ownerOfAddr(cardAddr) == msg.sender,
            "invalid cardAddr"
        );
        MinerInfo storage info = minerInfoOf[cardAddr];

        reward = earned(cardAddr);
        if (info.power > 0) {
            uint8 decimals = IERC20MetadataUpgradeable(address(rewardToken))
                .decimals();
            uint256 rewardTokenPrice = _rewardTokenPerCurrency(10 ** decimals);
            uint256 rewardQuotaDiff = (info.power * (10 ** decimals)) /
                rewardTokenPrice;

            if (reward > rewardQuotaDiff) {
                reward = rewardQuotaDiff;
                totalPower -= info.power;
                info.power = 0;
            } else {
                uint256 rewardPerPower = (reward * rewardTokenPrice) /
                    (10 ** decimals);
                totalPower -= rewardPerPower;
                info.power -= rewardPerPower;
            }
        }

        if (reward > 0) {
            info.reward = 0;
            info.rewardDebt = accountPerShare;
            info.taked += reward;
            rewardToken.safeTransfer(msg.sender, reward);
            emit TakedReward(cardAddr, reward, block.timestamp);
        }
    }
}
