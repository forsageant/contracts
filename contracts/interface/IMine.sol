// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IMine {
    function addPowerDelegate(address account, uint256 power) external;

    function clearPowerDelegate(address account) external;
}
