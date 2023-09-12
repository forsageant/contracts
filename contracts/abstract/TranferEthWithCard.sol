// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import {ICard} from "../interface/ICard.sol";

abstract contract TranferEthWithCard is Initializable {
    address public card;

    function __TranferEthOfCard_init(address _card) internal onlyInitializing {
        card = _card;
    }

    function tranferEthTo(address cardAddr, uint256 amount) internal {
        address owner = ICard(card).ownerOfAddr(cardAddr);
        payable(owner).transfer(amount);
    }
}
