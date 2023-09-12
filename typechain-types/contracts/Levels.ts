/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export type AchievementResponseStruct = {
  child: PromiseOrValue<string>;
  level: PromiseOrValue<BigNumberish>;
  selfValue: PromiseOrValue<BigNumberish>;
  childrenTotalValue: PromiseOrValue<BigNumberish>;
};

export type AchievementResponseStructOutput = [
  string,
  number,
  BigNumber,
  BigNumber
] & {
  child: string;
  level: number;
  selfValue: BigNumber;
  childrenTotalValue: BigNumber;
};

export type AchievementRewardInfoStruct = {
  rewardType: PromiseOrValue<BigNumberish>;
  account: PromiseOrValue<string>;
  amount: PromiseOrValue<BigNumberish>;
};

export type AchievementRewardInfoStructOutput = [number, string, BigNumber] & {
  rewardType: number;
  account: string;
  amount: BigNumber;
};

export interface LevelsInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "DELEGATE_ROLE()": FunctionFragment;
    "MANAGER_ROLE()": FunctionFragment;
    "beforActivityValue(address)": FunctionFragment;
    "card()": FunctionFragment;
    "childrenAchievementsOf(address)": FunctionFragment;
    "distrubutionsForefathers(address,uint256,uint256)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "increaseDelegate(address,uint256)": FunctionFragment;
    "initialize(address,address,address,address)": FunctionFragment;
    "inodes()": FunctionFragment;
    "layerRewardDepths(uint256)": FunctionFragment;
    "layerRewardRatios(uint256)": FunctionFragment;
    "levelOf(address)": FunctionFragment;
    "levelRewardRatios(uint256)": FunctionFragment;
    "levelUpgrade(address[],address)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "setLayerRewardDepths(uint8[])": FunctionFragment;
    "setLayerRewardRatios(uint40[])": FunctionFragment;
    "setLevelRewardRatios(uint40[])": FunctionFragment;
    "settlementDeepMaxLimit()": FunctionFragment;
    "startOf(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "updateStartDelegate(address,uint8)": FunctionFragment;
    "upgradeToLevel3(address)": FunctionFragment;
    "userInfoOf(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_ADMIN_ROLE"
      | "DELEGATE_ROLE"
      | "MANAGER_ROLE"
      | "beforActivityValue"
      | "card"
      | "childrenAchievementsOf"
      | "distrubutionsForefathers"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "increaseDelegate"
      | "initialize"
      | "inodes"
      | "layerRewardDepths"
      | "layerRewardRatios"
      | "levelOf"
      | "levelRewardRatios"
      | "levelUpgrade"
      | "renounceRole"
      | "revokeRole"
      | "setLayerRewardDepths"
      | "setLayerRewardRatios"
      | "setLevelRewardRatios"
      | "settlementDeepMaxLimit"
      | "startOf"
      | "supportsInterface"
      | "updateStartDelegate"
      | "upgradeToLevel3"
      | "userInfoOf"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DELEGATE_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MANAGER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "beforActivityValue",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "card", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "childrenAchievementsOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "distrubutionsForefathers",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseDelegate",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "inodes", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "layerRewardDepths",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "layerRewardRatios",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "levelOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "levelRewardRatios",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "levelUpgrade",
    values: [PromiseOrValue<string>[], PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setLayerRewardDepths",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setLayerRewardRatios",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setLevelRewardRatios",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "settlementDeepMaxLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "startOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateStartDelegate",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToLevel3",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "userInfoOf",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DELEGATE_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MANAGER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "beforActivityValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "card", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "childrenAchievementsOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "distrubutionsForefathers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "increaseDelegate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "inodes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "layerRewardDepths",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "layerRewardRatios",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "levelOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "levelRewardRatios",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "levelUpgrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setLayerRewardDepths",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLayerRewardRatios",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLevelRewardRatios",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settlementDeepMaxLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "startOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateStartDelegate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToLevel3",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userInfoOf", data: BytesLike): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "TakedReward(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TakedReward"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface TakedRewardEventObject {
  owner: string;
  reward: BigNumber;
  time: BigNumber;
}
export type TakedRewardEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  TakedRewardEventObject
>;

export type TakedRewardEventFilter = TypedEventFilter<TakedRewardEvent>;

export interface Levels extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LevelsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    DELEGATE_ROLE(overrides?: CallOverrides): Promise<[string]>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    beforActivityValue(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    card(overrides?: CallOverrides): Promise<[string]>;

    childrenAchievementsOf(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[AchievementResponseStructOutput[]]>;

    distrubutionsForefathers(
      owner: PromiseOrValue<string>,
      amountValue: PromiseOrValue<BigNumberish>,
      searchDeepMaxLimit: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [AchievementRewardInfoStructOutput[]] & {
        rewards: AchievementRewardInfoStructOutput[];
      }
    >;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    increaseDelegate(
      cardAddr: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    initialize(
      family_: PromiseOrValue<string>,
      nodes_: PromiseOrValue<string>,
      amountReceiptor_: PromiseOrValue<string>,
      card_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    inodes(overrides?: CallOverrides): Promise<[string]>;

    layerRewardDepths(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    layerRewardRatios(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    levelOf(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    levelRewardRatios(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    levelUpgrade(
      useChildren: PromiseOrValue<string>[],
      cardAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setLayerRewardDepths(
      layerDepths_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setLayerRewardRatios(
      layerRatios_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setLevelRewardRatios(
      levelRatios_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    settlementDeepMaxLimit(overrides?: CallOverrides): Promise<[BigNumber]>;

    startOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    updateStartDelegate(
      cardAddr: PromiseOrValue<string>,
      start: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeToLevel3(
      cardAddr: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    userInfoOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, number] & {
        selfValue: BigNumber;
        childrenTotalValue: BigNumber;
        level: number;
      }
    >;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  DELEGATE_ROLE(overrides?: CallOverrides): Promise<string>;

  MANAGER_ROLE(overrides?: CallOverrides): Promise<string>;

  beforActivityValue(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  card(overrides?: CallOverrides): Promise<string>;

  childrenAchievementsOf(
    owner: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<AchievementResponseStructOutput[]>;

  distrubutionsForefathers(
    owner: PromiseOrValue<string>,
    amountValue: PromiseOrValue<BigNumberish>,
    searchDeepMaxLimit: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<AchievementRewardInfoStructOutput[]>;

  getRoleAdmin(
    role: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  grantRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  increaseDelegate(
    cardAddr: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  initialize(
    family_: PromiseOrValue<string>,
    nodes_: PromiseOrValue<string>,
    amountReceiptor_: PromiseOrValue<string>,
    card_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  inodes(overrides?: CallOverrides): Promise<string>;

  layerRewardDepths(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  layerRewardRatios(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  levelOf(
    owner: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<number>;

  levelRewardRatios(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  levelUpgrade(
    useChildren: PromiseOrValue<string>[],
    cardAddr: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setLayerRewardDepths(
    layerDepths_: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setLayerRewardRatios(
    layerRatios_: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setLevelRewardRatios(
    levelRatios_: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  settlementDeepMaxLimit(overrides?: CallOverrides): Promise<BigNumber>;

  startOf(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<number>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  updateStartDelegate(
    cardAddr: PromiseOrValue<string>,
    start: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeToLevel3(
    cardAddr: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  userInfoOf(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, number] & {
      selfValue: BigNumber;
      childrenTotalValue: BigNumber;
      level: number;
    }
  >;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    DELEGATE_ROLE(overrides?: CallOverrides): Promise<string>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<string>;

    beforActivityValue(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    card(overrides?: CallOverrides): Promise<string>;

    childrenAchievementsOf(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<AchievementResponseStructOutput[]>;

    distrubutionsForefathers(
      owner: PromiseOrValue<string>,
      amountValue: PromiseOrValue<BigNumberish>,
      searchDeepMaxLimit: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<AchievementRewardInfoStructOutput[]>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    increaseDelegate(
      cardAddr: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      family_: PromiseOrValue<string>,
      nodes_: PromiseOrValue<string>,
      amountReceiptor_: PromiseOrValue<string>,
      card_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    inodes(overrides?: CallOverrides): Promise<string>;

    layerRewardDepths(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    layerRewardRatios(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    levelOf(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<number>;

    levelRewardRatios(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    levelUpgrade(
      useChildren: PromiseOrValue<string>[],
      cardAddr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number, number] & { origin: number; current: number }>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setLayerRewardDepths(
      layerDepths_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setLayerRewardRatios(
      layerRatios_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setLevelRewardRatios(
      levelRatios_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    settlementDeepMaxLimit(overrides?: CallOverrides): Promise<BigNumber>;

    startOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<number>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateStartDelegate(
      cardAddr: PromiseOrValue<string>,
      start: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToLevel3(
      cardAddr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    userInfoOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, number] & {
        selfValue: BigNumber;
        childrenTotalValue: BigNumber;
        level: number;
      }
    >;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;

    "TakedReward(address,uint256,uint256)"(
      owner?: PromiseOrValue<string> | null,
      reward?: null,
      time?: null
    ): TakedRewardEventFilter;
    TakedReward(
      owner?: PromiseOrValue<string> | null,
      reward?: null,
      time?: null
    ): TakedRewardEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    DELEGATE_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    beforActivityValue(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    card(overrides?: CallOverrides): Promise<BigNumber>;

    childrenAchievementsOf(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    distrubutionsForefathers(
      owner: PromiseOrValue<string>,
      amountValue: PromiseOrValue<BigNumberish>,
      searchDeepMaxLimit: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseDelegate(
      cardAddr: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    initialize(
      family_: PromiseOrValue<string>,
      nodes_: PromiseOrValue<string>,
      amountReceiptor_: PromiseOrValue<string>,
      card_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    inodes(overrides?: CallOverrides): Promise<BigNumber>;

    layerRewardDepths(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    layerRewardRatios(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    levelOf(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    levelRewardRatios(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    levelUpgrade(
      useChildren: PromiseOrValue<string>[],
      cardAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setLayerRewardDepths(
      layerDepths_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setLayerRewardRatios(
      layerRatios_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setLevelRewardRatios(
      levelRatios_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    settlementDeepMaxLimit(overrides?: CallOverrides): Promise<BigNumber>;

    startOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateStartDelegate(
      cardAddr: PromiseOrValue<string>,
      start: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeToLevel3(
      cardAddr: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    userInfoOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    DELEGATE_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    beforActivityValue(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    card(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    childrenAchievementsOf(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    distrubutionsForefathers(
      owner: PromiseOrValue<string>,
      amountValue: PromiseOrValue<BigNumberish>,
      searchDeepMaxLimit: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    increaseDelegate(
      cardAddr: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      family_: PromiseOrValue<string>,
      nodes_: PromiseOrValue<string>,
      amountReceiptor_: PromiseOrValue<string>,
      card_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    inodes(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    layerRewardDepths(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    layerRewardRatios(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    levelOf(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    levelRewardRatios(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    levelUpgrade(
      useChildren: PromiseOrValue<string>[],
      cardAddr: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setLayerRewardDepths(
      layerDepths_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setLayerRewardRatios(
      layerRatios_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setLevelRewardRatios(
      levelRatios_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    settlementDeepMaxLimit(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    startOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateStartDelegate(
      cardAddr: PromiseOrValue<string>,
      start: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeToLevel3(
      cardAddr: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    userInfoOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
