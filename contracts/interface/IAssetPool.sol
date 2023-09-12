// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IAssetPool {
    function depositedDelegate(
        address account,
        uint256 depositedAmount,
        uint256 sentAmount
    ) external;
}
