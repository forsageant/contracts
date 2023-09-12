/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  PoolFomo,
  PoolFomoInterface,
} from "../../../contracts/Fomo.sol/PoolFomo";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "beforTotalAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "afterTotalAmount",
        type: "uint256",
      },
    ],
    name: "Distrubtioned",
    type: "event",
  },
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
        name: "cardAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "depositedAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sentAmount",
        type: "uint256",
      },
    ],
    name: "depositedDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "distrubtionPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "distrubutedTime",
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
        name: "rewardToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "unownedAssetReceiptor_",
        type: "address",
      },
      {
        internalType: "address",
        name: "card_",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "investHistoryAt",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "investHistoryLen",
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
    inputs: [],
    name: "restartTick",
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
    name: "rewardToken",
    outputs: [
      {
        internalType: "contract IERC20Upgradeable",
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
    name: "unownedAssetReceiptor",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611dd3806100206000396000f3fe6080604052600436106101485760003560e01c80639ec8f8aa116100c0578063d547741f11610074578063ec87621c11610059578063ec87621c14610410578063ed39be3814610444578063f7c618c11461045957600080fd5b8063d547741f146103db578063dc80a19b146103fb57600080fd5b8063c0ba241b116100a5578063c0ba241b1461035a578063c0c53b8b1461038e578063c56f5e50146103ae57600080fd5b80639ec8f8aa146102f3578063a217fddf1461034557600080fd5b80632f2ff15d1161011757806359138b5e116100fc57806359138b5e1461023457806367e3633d1461025457806391d14854146102a057600080fd5b80632f2ff15d146101f457806336568abe1461021457600080fd5b806301ffc9a71461015457806308026f0b146101895780631b073377146101a0578063248a9ca3146101c457600080fd5b3661014f57005b600080fd5b34801561016057600080fd5b5061017461016f3660046119d3565b610486565b60405190151581526020015b60405180910390f35b34801561019557600080fd5b5061019e61051f565b005b3480156101ac57600080fd5b506101b660ca5481565b604051908152602001610180565b3480156101d057600080fd5b506101b66101df366004611a15565b60009081526065602052604090206001015490565b34801561020057600080fd5b5061019e61020f366004611a50565b610a93565b34801561022057600080fd5b5061019e61022f366004611a50565b610abd565b34801561024057600080fd5b5061019e61024f366004611a80565b610b70565b34801561026057600080fd5b5061027461026f366004611a15565b610cd0565b6040805173ffffffffffffffffffffffffffffffffffffffff9093168352602083019190915201610180565b3480156102ac57600080fd5b506101746102bb366004611a50565b600091825260656020908152604080842073ffffffffffffffffffffffffffffffffffffffff93909316845291905290205460ff1690565b3480156102ff57600080fd5b5060c9546103209073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610180565b34801561035157600080fd5b506101b6600081565b34801561036657600080fd5b506101b67f59eafab5ad7c55c947e14067db3cd76cda28a71cbc05441818210132c6871ab981565b34801561039a57600080fd5b5061019e6103a9366004611ab5565b610d15565b3480156103ba57600080fd5b5060cd546103209073ffffffffffffffffffffffffffffffffffffffff1681565b3480156103e757600080fd5b5061019e6103f6366004611a50565b610e3c565b34801561040757600080fd5b5061019e610e61565b34801561041c57600080fd5b506101b67f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b0881565b34801561045057600080fd5b5060cc546101b6565b34801561046557600080fd5b5060cb546103209073ffffffffffffffffffffffffffffffffffffffff1681565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b00000000000000000000000000000000000000000000000000000000148061051957507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60026097541415610591576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b60026097557f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b086105c081610f08565b60ca54421161062b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f6e6f7420796574000000000000000000000000000000000000000000000000006044820152606401610588565b60cc5480610695576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f656d70747920696e7665737420686973746f72790000000000000000000000006044820152606401610588565b60cb546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009173ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa158015610704573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107289190611b00565b9050806000610738600185611b48565b905060008084116107a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f6e6f2072657761726400000000000000000000000000000000000000000000006044820152606401610588565b60cb546040517f2e1a7d4d0000000000000000000000000000000000000000000000000000000081526004810186905273ffffffffffffffffffffffffffffffffffffffff90911690632e1a7d4d90602401600060405180830381600087803b15801561081157600080fd5b505af1158015610825573d6000803e3d6000fd5b505050505b81610836600187611b48565b6108409190611b48565b905060008161086f5764e8d4a5100061085e8664746a528800611b5f565b6108689190611b9c565b90506108a3565b60cc838154811061088257610882611bd7565b90600052602060002090600202016001015460026108a09190611b5f565b90505b808510156108ae5750835b6108b88186611b48565b9450600073ffffffffffffffffffffffffffffffffffffffff1660cc84815481106108e5576108e5611bd7565b600091825260209091206002909102015473ffffffffffffffffffffffffffffffffffffffff16146109c65761095460cc848154811061092757610927611bd7565b600091825260209091206002909102015473ffffffffffffffffffffffffffffffffffffffff1682610f15565b60cc838154811061096757610967611bd7565b60009182526020918290206002909102015460405183815273ffffffffffffffffffffffffffffffffffffffff9091169130917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35b826109d157506109f4565b826109db81611c06565b935050506000841180156109ef5750603281105b61082a575b478015610a445760cd5460405173ffffffffffffffffffffffffffffffffffffffff9091169082156108fc029083906000818181858888f19350505050158015610a42573d6000803e3d6000fd5b505b60408051428152602081018690529081018290527f52578f140c70a72408fcf5bd57834f7394c1262707bc53ae93d9daece287fda19060600160405180910390a1505060016097555050505050565b600082815260656020526040902060010154610aae81610f08565b610ab88383610ff0565b505050565b73ffffffffffffffffffffffffffffffffffffffff81163314610b62576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c6600000000000000000000000000000000006064820152608401610588565b610b6c82826110e4565b5050565b7f59eafab5ad7c55c947e14067db3cd76cda28a71cbc05441818210132c6871ab9610b9a81610f08565b60ca544210610c05576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f74696d65277320757000000000000000000000000000000000000000000000006044820152606401610588565b610c114261a8c0611c3b565b60ca5550506040805180820190915273ffffffffffffffffffffffffffffffffffffffff92831681526020810191825260cc805460018101825560009190915290517f47197230e1e4b29fc0bd84d7d78966c0925452aff72a2a121538b102457e9ebe600290920291820180547fffffffffffffffffffffffff0000000000000000000000000000000000000000169190941617909255517f47197230e1e4b29fc0bd84d7d78966c0925452aff72a2a121538b102457e9ebf90910155565b60cc8181548110610ce057600080fd5b60009182526020909120600290910201805460019091015473ffffffffffffffffffffffffffffffffffffffff909116915082565b6000610d21600161119f565b90508015610d5657600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff166101001790555b610d5e611325565b610d666113fb565b610d6f8261149a565b60cb805473ffffffffffffffffffffffffffffffffffffffff8087167fffffffffffffffffffffffff00000000000000000000000000000000000000009283161790925560cd805492861692909116919091179055610dd04261a8c0611c3b565b60ca558015610e3657600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b600082815260656020526040902060010154610e5781610f08565b610ab883836110e4565b7f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08610e8b81610f08565b60ca544211610ef6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600b60248201527f74696d65206e6f742075700000000000000000000000000000000000000000006044820152606401610588565b610f024261a8c0611c3b565b60ca5550565b610f128133611578565b50565b60c9546040517f5597593500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84811660048301526000921690635597593590602401602060405180830381865afa158015610f86573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610faa9190611c53565b60405190915073ffffffffffffffffffffffffffffffffffffffff82169083156108fc029084906000818181858888f19350505050158015610e36573d6000803e3d6000fd5b600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff16610b6c57600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff85168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790556110863390565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff1615610b6c57600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516808552925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60008054610100900460ff1615611256578160ff1660011480156111c25750303b155b61124e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152608401610588565b506000919050565b60005460ff8084169116106112ed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152608401610588565b50600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660ff92909216919091179055600190565b600054610100900460ff166113bc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610588565b6113c461164a565b6113cf6000336116e1565b6113f97f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08336116e1565b565b600054610100900460ff16611492576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610588565b6113f96116eb565b600054610100900460ff16611531576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610588565b60c980547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600082815260656020908152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff16610b6c576115d08173ffffffffffffffffffffffffffffffffffffffff166014611789565b6115db836020611789565b6040516020016115ec929190611c9c565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290527f08c379a000000000000000000000000000000000000000000000000000000000825261058891600401611d1d565b600054610100900460ff166113f9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610588565b610b6c8282610ff0565b600054610100900460ff16611782576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610588565b6001609755565b60606000611798836002611b5f565b6117a3906002611c3b565b67ffffffffffffffff8111156117bb576117bb611d6e565b6040519080825280601f01601f1916602001820160405280156117e5576020820181803683370190505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061181c5761181c611bd7565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f78000000000000000000000000000000000000000000000000000000000000008160018151811061187f5761187f611bd7565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060006118bb846002611b5f565b6118c6906001611c3b565b90505b6001811115611963577f303132333435363738396162636465660000000000000000000000000000000085600f166010811061190757611907611bd7565b1a60f81b82828151811061191d5761191d611bd7565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c9361195c81611c06565b90506118c9565b5083156119cc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610588565b9392505050565b6000602082840312156119e557600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146119cc57600080fd5b600060208284031215611a2757600080fd5b5035919050565b73ffffffffffffffffffffffffffffffffffffffff81168114610f1257600080fd5b60008060408385031215611a6357600080fd5b823591506020830135611a7581611a2e565b809150509250929050565b600080600060608486031215611a9557600080fd5b8335611aa081611a2e565b95602085013595506040909401359392505050565b600080600060608486031215611aca57600080fd5b8335611ad581611a2e565b92506020840135611ae581611a2e565b91506040840135611af581611a2e565b809150509250925092565b600060208284031215611b1257600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082821015611b5a57611b5a611b19565b500390565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611b9757611b97611b19565b500290565b600082611bd2577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600081611c1557611c15611b19565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b60008219821115611c4e57611c4e611b19565b500190565b600060208284031215611c6557600080fd5b81516119cc81611a2e565b60005b83811015611c8b578181015183820152602001611c73565b83811115610e365750506000910152565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611cd4816017850160208801611c70565b7f206973206d697373696e6720726f6c65200000000000000000000000000000006017918401918201528351611d11816028840160208801611c70565b01602801949350505050565b6020815260008251806020840152611d3c816040850160208701611c70565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fdfea264697066735822122060229acb5a940aae555302056d626349e86ee4b62c4249f0ad36ae699088599264736f6c634300080a0033";

type PoolFomoConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PoolFomoConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PoolFomo__factory extends ContractFactory {
  constructor(...args: PoolFomoConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PoolFomo> {
    return super.deploy(overrides || {}) as Promise<PoolFomo>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PoolFomo {
    return super.attach(address) as PoolFomo;
  }
  override connect(signer: Signer): PoolFomo__factory {
    return super.connect(signer) as PoolFomo__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PoolFomoInterface {
    return new utils.Interface(_abi) as PoolFomoInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PoolFomo {
    return new Contract(address, _abi, signerOrProvider) as PoolFomo;
  }
}
