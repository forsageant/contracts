// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

interface INodes {
    event TakedReward(address indexed owner, uint256 reward, uint256 time);
    event NoderPowerChanged(address indexed account, uint256 power);

    function totalPower() external view returns (uint256);

    function earned(address account) external view returns (uint256);

    function takeReward(address cardAddr) external;

    function setNoderPowerDelegate(address account, uint256 power) external;

    function distrubutionReward(uint256 amount) external;
}
