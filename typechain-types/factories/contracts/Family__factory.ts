/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Family, FamilyInterface } from "../../contracts/Family";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DELEGATE_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MANAGER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "card",
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
        name: "owner",
        type: "address",
      },
    ],
    name: "childrenOf",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
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
    name: "depthOf",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "depth",
        type: "uint256",
      },
    ],
    name: "getForefathers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
        name: "_rootAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_card",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "parentCardAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "cardAddr",
        type: "address",
      },
    ],
    name: "makeRelation",
    outputs: [],
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
    name: "parentOf",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rootAddress",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    name: "totalAddresses",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506118b0806100206000396000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c80639ec8f8aa116100b2578063cfad527711610081578063e87449f911610066578063e87449f914610318578063ec87621c1461032b578063ee08388e1461035257600080fd5b8063cfad5277146102fc578063d547741f1461030557600080fd5b80639ec8f8aa14610268578063a217fddf146102ad578063aaa2b8c8146102b5578063c0ba241b146102d557600080fd5b806336568abe11610109578063485cc955116100ee578063485cc955146101ef5780637c3165b11461020257806391d148541461022257600080fd5b806336568abe146101c957806342c4c0d0146101dc57600080fd5b806301ffc9a71461013b5780631d1af84214610163578063248a9ca3146101835780632f2ff15d146101b4575b600080fd5b61014e61014936600461148d565b610388565b60405190151581526020015b60405180910390f35b6101766101713660046114f1565b610421565b60405161015a919061151d565b6101a6610191366004611577565b60009081526065602052604090206001015490565b60405190815260200161015a565b6101c76101c2366004611590565b61053f565b005b6101c76101d7366004611590565b610569565b6101766101ea3660046115c0565b610621565b6101c76101fd3660046115dd565b6106b1565b6101a66102103660046115c0565b609a6020526000908152604090205481565b61014e610230366004611590565b600091825260656020908152604080842073ffffffffffffffffffffffffffffffffffffffff93909316845291905290205460ff1690565b609c546102889073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161015a565b6101a6600081565b6097546102889073ffffffffffffffffffffffffffffffffffffffff1681565b6101a67f59eafab5ad7c55c947e14067db3cd76cda28a71cbc05441818210132c6871ab981565b6101a660985481565b6101c7610313366004611590565b6108b7565b6101c76103263660046115dd565b6108dc565b6101a67f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b0881565b6102886103603660046115c0565b60996020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b00000000000000000000000000000000000000000000000000000000148061041b57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b606060008267ffffffffffffffff81111561043e5761043e61160b565b604051908082528060200260200182016040528015610467578160200160208202803683370190505b5073ffffffffffffffffffffffffffffffffffffffff8086166000908152609960205260408120549293509116905b84811080156104ba575073ffffffffffffffffffffffffffffffffffffffff821615155b1561053557818382815181106104d2576104d261163a565b73ffffffffffffffffffffffffffffffffffffffff909216602092830291909101909101528061050181611698565b73ffffffffffffffffffffffffffffffffffffffff9384166000908152609960205260409020549093169291506104969050565b5090949350505050565b60008281526065602052604090206001015461055a81610aaa565b6105648383610ab7565b505050565b73ffffffffffffffffffffffffffffffffffffffff81163314610613576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084015b60405180910390fd5b61061d8282610bab565b5050565b73ffffffffffffffffffffffffffffffffffffffff81166000908152609b60209081526040918290208054835181840281018401909452808452606093928301828280156106a557602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff16815260019091019060200180831161067a575b50505050509050919050565b60006106bd6001610c66565b905080156106f257600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff166101001790555b6106fa610dec565b73ffffffffffffffffffffffffffffffffffffffff8316610777576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f696e76616c6964205f726f6f7441646472657373000000000000000000000000604482015260640161060a565b609c805473ffffffffffffffffffffffffffffffffffffffff8085167fffffffffffffffffffffffff00000000000000000000000000000000000000009283161790925560978054868416908316811782556000908152609a6020908152604080832060019081905560998352908320805486169055609b90915291547f10afac9233b4ccc54d6404ffc1cf3b47515a2b8edbf675d15eddce05a027dcbd805493840181559091527fa7883a97d7b13f10f51b9029e5e2bd241e2bd2b5227e6c5deb074f73d9e9aab390910180549092169216919091179055801561056457600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b6000828152606560205260409020600101546108d281610aaa565b6105648383610bab565b8073ffffffffffffffffffffffffffffffffffffffff811661098f57609c546040517f40d097c300000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff909116906340d097c3906024016020604051808303816000875af1158015610968573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098c91906116d1565b90505b609c546040517f5597593500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff838116600483015233921690635597593590602401602060405180830381865afa1580156109ff573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2391906116d1565b73ffffffffffffffffffffffffffffffffffffffff1614610aa0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f696e76616c696420636172644164647200000000000000000000000000000000604482015260640161060a565b6105648382610ec2565b610ab481336110d0565b50565b600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff1661061d57600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff85168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055610b4d3390565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff161561061d57600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516808552925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60008054610100900460ff1615610d1d578160ff166001148015610c895750303b155b610d15576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a6564000000000000000000000000000000000000606482015260840161060a565b506000919050565b60005460ff808416911610610db4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a6564000000000000000000000000000000000000606482015260840161060a565b50600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660ff92909216919091179055600190565b600054610100900460ff16610e83576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e67000000000000000000000000000000000000000000606482015260840161060a565b610e8b6111a2565b610e96600033611239565b610ec07f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b0833611239565b565b73ffffffffffffffffffffffffffffffffffffffff82166000908152609a6020526040902054610f4e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f696e76616c696420706172656e74000000000000000000000000000000000000604482015260640161060a565b73ffffffffffffffffffffffffffffffffffffffff81166000908152609a602052604090205415610fdb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f696e76616c6964206368696c6400000000000000000000000000000000000000604482015260640161060a565b60988054906000610feb83611698565b909155505073ffffffffffffffffffffffffffffffffffffffff818116600090815260996020908152604080832080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169487169485179055928252609a905220546110599060016116ee565b73ffffffffffffffffffffffffffffffffffffffff9182166000818152609a6020908152604080832094909455949093168352609b845290822080546001810182559083529290912090910180547fffffffffffffffffffffffff0000000000000000000000000000000000000000169091179055565b600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff1661061d576111288173ffffffffffffffffffffffffffffffffffffffff166014611243565b611133836020611243565b604051602001611144929190611736565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290527f08c379a000000000000000000000000000000000000000000000000000000000825261060a916004016117b7565b600054610100900460ff16610ec0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e67000000000000000000000000000000000000000000606482015260840161060a565b61061d8282610ab7565b60606000611252836002611808565b61125d9060026116ee565b67ffffffffffffffff8111156112755761127561160b565b6040519080825280601f01601f19166020018201604052801561129f576020820181803683370190505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106112d6576112d661163a565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106113395761133961163a565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506000611375846002611808565b6113809060016116ee565b90505b600181111561141d577f303132333435363738396162636465660000000000000000000000000000000085600f16601081106113c1576113c161163a565b1a60f81b8282815181106113d7576113d761163a565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c9361141681611845565b9050611383565b508315611486576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161060a565b9392505050565b60006020828403121561149f57600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461148657600080fd5b73ffffffffffffffffffffffffffffffffffffffff81168114610ab457600080fd5b6000806040838503121561150457600080fd5b823561150f816114cf565b946020939093013593505050565b6020808252825182820181905260009190848201906040850190845b8181101561156b57835173ffffffffffffffffffffffffffffffffffffffff1683529284019291840191600101611539565b50909695505050505050565b60006020828403121561158957600080fd5b5035919050565b600080604083850312156115a357600080fd5b8235915060208301356115b5816114cf565b809150509250929050565b6000602082840312156115d257600080fd5b8135611486816114cf565b600080604083850312156115f057600080fd5b82356115fb816114cf565b915060208301356115b5816114cf565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156116ca576116ca611669565b5060010190565b6000602082840312156116e357600080fd5b8151611486816114cf565b6000821982111561170157611701611669565b500190565b60005b83811015611721578181015183820152602001611709565b83811115611730576000848401525b50505050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161176e816017850160208801611706565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516117ab816028840160208801611706565b01602801949350505050565b60208152600082518060208401526117d6816040850160208701611706565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561184057611840611669565b500290565b60008161185457611854611669565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019056fea264697066735822122060aa18a94bc0ab4d635ea1d4c1f0aee2fbff801cd692a93a6c2e42f11d34c45364736f6c634300080a0033";

type FamilyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FamilyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Family__factory extends ContractFactory {
  constructor(...args: FamilyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Family> {
    return super.deploy(overrides || {}) as Promise<Family>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Family {
    return super.attach(address) as Family;
  }
  override connect(signer: Signer): Family__factory {
    return super.connect(signer) as Family__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FamilyInterface {
    return new utils.Interface(_abi) as FamilyInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Family {
    return new Contract(address, _abi, signerOrProvider) as Family;
  }
}