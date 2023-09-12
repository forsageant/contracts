// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "../abstract/Achievement.sol";

abstract contract ILevels is Achievement {
    event TakedReward(address indexed owner, uint256 reward, uint256 time);

    function startOf(address account) external view virtual returns (uint8);

    function updateStartDelegate(address account, uint8 start) external virtual;

    function increaseDelegate(address account, uint256 amount) external virtual;
}
