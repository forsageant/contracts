/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { FOLToken, FOLTokenInterface } from "../../contracts/FOLToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "addOrRemove",
        type: "bool",
      },
    ],
    name: "Blocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "addOrRemove",
        type: "bool",
      },
    ],
    name: "Guarded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addBlocked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addGuarded",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pair",
        type: "address",
      },
    ],
    name: "addPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyPreAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "clim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isBlockedOf",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isGuardedOf",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isPairsOf",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "removeBlocked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "removeGuarded",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pair",
        type: "address",
      },
    ],
    name: "removePair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sellFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sellPreAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_buyFee",
        type: "uint256",
      },
    ],
    name: "setBuyFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_buyPreAddress",
        type: "address",
      },
    ],
    name: "setBuyPreAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_sellFee",
        type: "uint256",
      },
    ],
    name: "setSellFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sellPreAddress",
        type: "address",
      },
    ],
    name: "setSellPreAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200236a3803806200236a8339810160408190526200003491620002f6565b604051806040016040528060098152602001682327a6102a37b5b2b760b91b815250604051806040016040528060038152602001621193d360ea1b81525081600390805190602001906200008a92919062000250565b508051620000a090600490602084019062000250565b505050620000bd620000b76200011260201b60201c565b62000116565b620000d4816a115eec47f6cf7e3500000062000168565b6402540be4006007819055600655600880546001600160a01b039092166001600160a01b03199283168117909155600980549092161790556200038c565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216620001c35760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b8060026000828254620001d7919062000328565b90915550506001600160a01b038216600090815260208190526040812080548392906200020690849062000328565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b8280546200025e906200034f565b90600052602060002090601f016020900481019282620002825760008555620002cd565b82601f106200029d57805160ff1916838001178555620002cd565b82800160010185558215620002cd579182015b82811115620002cd578251825591602001919060010190620002b0565b50620002db929150620002df565b5090565b5b80821115620002db5760008155600101620002e0565b6000602082840312156200030957600080fd5b81516001600160a01b03811681146200032157600080fd5b9392505050565b600082198211156200034a57634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200036457607f821691505b602082108114156200038657634e487b7160e01b600052602260045260246000fd5b50919050565b611fce806200039c6000396000f3fe608060405234801561001057600080fd5b50600436106101f05760003560e01c80638b4cee081161010f578063a9059cbb116100a2578063c3522aa311610071578063c3522aa314610494578063dd62ed3e146104a7578063f2fde38b146104ed578063fcacca271461050057600080fd5b8063a9059cbb14610448578063af6c9c1d1461045b578063b3f6dc181461046e578063c2b7bbb61461048157600080fd5b8063a0c3c9e7116100de578063a0c3c9e7146103df578063a3d1d03f146103f2578063a457c2d714610415578063a8a329051461042857600080fd5b80638b4cee08146103935780638da5cb5b146103a657806395d89b41146103c4578063983de405146103cc57600080fd5b8063313ce567116101875780634706240211610156578063470624021461032957806370a08231146103325780637133e9cd14610368578063715018a61461038b57600080fd5b8063313ce567146102af57806339509351146102be578063433be493146102d15780634522248c146102e457600080fd5b806318160ddd116101c357806318160ddd1461026e57806323b872dd146102805780632aa42c39146102935780632b14ca56146102a657600080fd5b806306fdde03146101f5578063095ea7b3146102135780630cc835a3146102365780631256554d1461024b575b600080fd5b6101fd610513565b60405161020a9190611cc3565b60405180910390f35b610226610221366004611d5f565b6105a5565b604051901515815260200161020a565b610249610244366004611d89565b6105bd565b005b610226610259366004611da2565b600a6020526000908152604090205460ff1681565b6002545b60405190815260200161020a565b61022661028e366004611dc4565b610683565b6102496102a1366004611da2565b6106a7565b61027260075481565b6040516012815260200161020a565b6102266102cc366004611d5f565b610807565b6102496102df366004611da2565b610853565b6009546103049073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161020a565b61027260065481565b610272610340366004611da2565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b610226610376366004611da2565b600b6020526000908152604090205460ff1681565b6102496109b5565b6102496103a1366004611d89565b610a28565b60055473ffffffffffffffffffffffffffffffffffffffff16610304565b6101fd610ae9565b6102496103da366004611da2565b610af8565b6102496103ed366004611da2565b610c09565b610226610400366004611da2565b600c6020526000908152604090205460ff1681565b610226610423366004611d5f565b610d6b565b6008546103049073ffffffffffffffffffffffffffffffffffffffff1681565b610226610456366004611d5f565b610e22565b610249610469366004611da2565b610e30565b61024961047c366004611da2565b610f58565b61024961048f366004611da2565b6110b1565b6102496104a2366004611e00565b6111dd565b6102726104b5366004611e00565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b6102496104fb366004611da2565b611351565b61024961050e366004611da2565b61144d565b60606003805461052290611e33565b80601f016020809104026020016040519081016040528092919081815260200182805461054e90611e33565b801561059b5780601f106105705761010080835404028352916020019161059b565b820191906000526020600020905b81548152906001019060200180831161057e57829003601f168201915b5050505050905090565b6000336105b381858561155e565b5060019392505050565b60055473ffffffffffffffffffffffffffffffffffffffff1633146106295760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b64e8d4a5100081111561067e5760405162461bcd60e51b815260206004820152601460248201527f627579466565206d757374206c657120316531320000000000000000000000006044820152606401610620565b600655565b6000336106918582856116dd565b61069c85858561179a565b506001949350505050565b60055473ffffffffffffffffffffffffffffffffffffffff16331461070e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600a602052604090205460ff166107835760405162461bcd60e51b815260206004820152601160248201527f6163636f756e74206e6f742065786973740000000000000000000000000000006044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166000818152600a6020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055519182524292917f34701ce3d853a7480763a6d9abff19d00f949a1164bd4a009cfcca8f9e3e87ca91015b60405180910390a350565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff871684529091528120549091906105b3908290869061084e908790611eb6565b61155e565b60055473ffffffffffffffffffffffffffffffffffffffff1633146108ba5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600b602052604090205460ff16156109305760405162461bcd60e51b815260206004820152601560248201527f6163636f756e7420616c726561647920657869737400000000000000000000006044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166000818152600b602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600190811790915591519182524292917f9142490f612564f62dc2349ba33daba38798f412500a2c981eb24d08a30aee5091016107fc565b60055473ffffffffffffffffffffffffffffffffffffffff163314610a1c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b610a2660006119d6565b565b60055473ffffffffffffffffffffffffffffffffffffffff163314610a8f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b64e8d4a51000811115610ae45760405162461bcd60e51b815260206004820152601560248201527f73656c6c466565206d757374206c6571203165313200000000000000000000006044820152606401610620565b600755565b60606004805461052290611e33565b60055473ffffffffffffffffffffffffffffffffffffffff163314610b5f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff8116610bc25760405162461bcd60e51b815260206004820152600860248201527f6e6f74207a65726f0000000000000000000000000000000000000000000000006044820152606401610620565b600980547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60055473ffffffffffffffffffffffffffffffffffffffff163314610c705760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600a602052604090205460ff1615610ce65760405162461bcd60e51b815260206004820152601560248201527f6163636f756e7420616c726561647920657869737400000000000000000000006044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166000818152600a602090815260409182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600190811790915591519182524292917f34701ce3d853a7480763a6d9abff19d00f949a1164bd4a009cfcca8f9e3e87ca91016107fc565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490919083811015610e155760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610620565b61069c828686840361155e565b6000336105b381858561179a565b60055473ffffffffffffffffffffffffffffffffffffffff163314610e975760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600c602052604090205460ff16610f0c5760405162461bcd60e51b815260206004820152600e60248201527f70616972206e6f7420666f756e640000000000000000000000000000000000006044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff166000908152600c6020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b60055473ffffffffffffffffffffffffffffffffffffffff163314610fbf5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600b602052604090205460ff166110345760405162461bcd60e51b815260206004820152601160248201527f6163636f756e74206e6f742065786973740000000000000000000000000000006044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166000818152600b6020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055519182524292917f9142490f612564f62dc2349ba33daba38798f412500a2c981eb24d08a30aee5091016107fc565b60055473ffffffffffffffffffffffffffffffffffffffff1633146111185760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166000908152600c602052604090205460ff161561118e5760405162461bcd60e51b815260206004820152601260248201527f7061697220616c726561647920657869737400000000000000000000000000006044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff166000908152600c6020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b60085473ffffffffffffffffffffffffffffffffffffffff1633148061121a575060095473ffffffffffffffffffffffffffffffffffffffff1633145b1561134d576040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff83169063a9059cbb90839083906370a0823190602401602060405180830381865afa158015611293573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112b79190611ece565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815273ffffffffffffffffffffffffffffffffffffffff909216600483015260248201526044016020604051808303816000875af1158015611327573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061134b9190611ee7565b505b5050565b60055473ffffffffffffffffffffffffffffffffffffffff1633146113b85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166114415760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610620565b61144a816119d6565b50565b60055473ffffffffffffffffffffffffffffffffffffffff1633146114b45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff81166115175760405162461bcd60e51b815260206004820152600860248201527f6e6f74207a65726f0000000000000000000000000000000000000000000000006044820152606401610620565b600880547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b73ffffffffffffffffffffffffffffffffffffffff83166115e65760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610620565b73ffffffffffffffffffffffffffffffffffffffff821661166f5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610620565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8381166000908152600160209081526040808320938616835292905220547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461179457818110156117875760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610620565b611794848484840361155e565b50505050565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600a602052604090205460ff161580156117f6575073ffffffffffffffffffffffffffffffffffffffff82166000908152600a602052604090205460ff16155b6118425760405162461bcd60e51b815260206004820152600860248201527f626c6f636b6564210000000000000000000000000000000000000000000000006044820152606401610620565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600b602052604090205460ff1615801561189e575073ffffffffffffffffffffffffffffffffffffffff82166000908152600b602052604090205460ff16155b156119cb5760006006541180156118da575073ffffffffffffffffffffffffffffffffffffffff83166000908152600c602052604090205460ff165b1561193957600064e8d4a51000600654836118f59190611f09565b6118ff9190611f46565b60085490915061192790859073ffffffffffffffffffffffffffffffffffffffff1683611a4d565b6119318183611f81565b9150506119cb565b6000600754118015611970575073ffffffffffffffffffffffffffffffffffffffff82166000908152600c602052604090205460ff165b156119cb57600064e8d4a510006007548361198b9190611f09565b6119959190611f46565b6009549091506119bd90859073ffffffffffffffffffffffffffffffffffffffff1683611a4d565b6119c78183611f81565b9150505b61134b838383611a4d565b6005805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b73ffffffffffffffffffffffffffffffffffffffff8316611ad65760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610620565b73ffffffffffffffffffffffffffffffffffffffff8216611b5f5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610620565b611b6a83838361134b565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205481811015611c065760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610620565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260208190526040808220858503905591851681529081208054849290611c4a908490611eb6565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051611cb091815260200190565b60405180910390a361179484848461134b565b600060208083528351808285015260005b81811015611cf057858101830151858201604001528201611cd4565b81811115611d02576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611d5a57600080fd5b919050565b60008060408385031215611d7257600080fd5b611d7b83611d36565b946020939093013593505050565b600060208284031215611d9b57600080fd5b5035919050565b600060208284031215611db457600080fd5b611dbd82611d36565b9392505050565b600080600060608486031215611dd957600080fd5b611de284611d36565b9250611df060208501611d36565b9150604084013590509250925092565b60008060408385031215611e1357600080fd5b611e1c83611d36565b9150611e2a60208401611d36565b90509250929050565b600181811c90821680611e4757607f821691505b60208210811415611e81577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008219821115611ec957611ec9611e87565b500190565b600060208284031215611ee057600080fd5b5051919050565b600060208284031215611ef957600080fd5b81518015158114611dbd57600080fd5b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611f4157611f41611e87565b500290565b600082611f7c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600082821015611f9357611f93611e87565b50039056fea26469706673582212208da97691b163340ac2c6f5f84a6c05b8cee73ce895691cb7e5e966fc569bb66264736f6c634300080a0033";

type FOLTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FOLTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FOLToken__factory extends ContractFactory {
  constructor(...args: FOLTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FOLToken> {
    return super.deploy(_account, overrides || {}) as Promise<FOLToken>;
  }
  override getDeployTransaction(
    _account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_account, overrides || {});
  }
  override attach(address: string): FOLToken {
    return super.attach(address) as FOLToken;
  }
  override connect(signer: Signer): FOLToken__factory {
    return super.connect(signer) as FOLToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FOLTokenInterface {
    return new utils.Interface(_abi) as FOLTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FOLToken {
    return new Contract(address, _abi, signerOrProvider) as FOLToken;
  }
}