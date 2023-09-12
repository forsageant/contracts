// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IWrappedCoin is IERC20 {
    function deposit() external payable;

    function withdraw(uint256 _amount) external;
}
