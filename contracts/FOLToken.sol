// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FOLToken is ERC20, Ownable {
    uint256 public buyFee;

    uint256 public sellFee;

    address public buyPreAddress;

    address public sellPreAddress;

    mapping(address => bool) public isBlockedOf;

    mapping(address => bool) public isGuardedOf;

    mapping(address => bool) public isPairsOf;

    event Blocked(address indexed user, uint256 indexed time, bool addOrRemove);
    event Guarded(address indexed user, uint256 indexed time, bool addOrRemove);

    constructor(address _account) ERC20("Antworld", "AD") {
        _mint(_account, 2100 * 10000 * 1e18);

        sellFee = 0.02e12;
        buyFee = 1e12;
        buyPreAddress = _account;
        sellPreAddress = _account;
    }

    function addPair(address _pair) external onlyOwner {
        require(!isPairsOf[_pair], "pair already exist");
        isPairsOf[_pair] = true;
    }

    function removePair(address _pair) external onlyOwner {
        require(isPairsOf[_pair], "pair not found");
        isPairsOf[_pair] = false;
    }

    function setSellFee(uint256 _sellFee) external onlyOwner {
        require(_sellFee <= 1e12, "sellFee must leq 1e12");
        sellFee = _sellFee;
    }

    function setBuyFee(uint256 _buyFee) external onlyOwner {
        require(_buyFee <= 1e12, "buyFee must leq 1e12");
        buyFee = _buyFee;
    }

    function setBuyPreAddress(address _buyPreAddress) external onlyOwner {
        require(_buyPreAddress != address(0), "not zero");
        buyPreAddress = _buyPreAddress;
    }

    function setSellPreAddress(address _sellPreAddress) external onlyOwner {
        require(_sellPreAddress != address(0), "not zero");
        sellPreAddress = _sellPreAddress;
    }

    function addGuarded(address account) external onlyOwner {
        require(!isGuardedOf[account], "account already exist");
        isGuardedOf[account] = true;
        emit Guarded(account, block.timestamp, true);
    }

    function removeGuarded(address account) external onlyOwner {
        require(isGuardedOf[account], "account not exist");
        isGuardedOf[account] = false;
        emit Guarded(account, block.timestamp, false);
    }

    function addBlocked(address account) external onlyOwner {
        require(!isBlockedOf[account], "account already exist");
        isBlockedOf[account] = true;
        emit Blocked(account, block.timestamp, true);
    }

    function removeBlocked(address account) external onlyOwner {
        require(isBlockedOf[account], "account not exist");
        isBlockedOf[account] = false;
        emit Blocked(account, block.timestamp, false);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        require(!isBlockedOf[from] && !isBlockedOf[to], "blocked!");

        if (!isGuardedOf[from] && !isGuardedOf[to]) {
            if (buyFee > 0 && isPairsOf[from]) {
                uint256 buyFeeAmount = (amount * buyFee) / 1e12;
                super._transfer(from, buyPreAddress, buyFeeAmount);
                amount -= buyFeeAmount;
            } else if (sellFee > 0 && isPairsOf[to]) {
                uint256 sellFeeAmount = (amount * sellFee) / 1e12;
                super._transfer(from, sellPreAddress, sellFeeAmount);
                amount -= sellFeeAmount;
            }
        }

        super._transfer(from, to, amount);
    }
}
