import {
  Deposited as DepositedEvent,
  TakedReward as TakedRewardEvent,
  RewardIncreased as RewardIncreasedEvent
} from "../generated/Home/Home"

import { Deposited, TakedReward, RewardIncreased } from "../generated/schema"

export function handleDeposited(event: DepositedEvent): void {
  let entity = new Deposited(event.transaction.hash.toHexString() + '-' + event.logIndex.toString());
  entity.time = event.params.time.toU32()
  entity.account = event.params.owner
  entity.amount = event.params.amount
  entity.save();
}

export function handleRewardIncreased(event: RewardIncreasedEvent): void {
  let entity = new RewardIncreased(event.transaction.hash.toHexString() + '-' + event.logIndex.toString());
  entity.time = event.params.time.toU32()
  entity.owner = event.params.owner
  entity.sender = event.params.sender
  entity.amount = event.params.reward
  entity.rewardType = [
    "Static",
    "Parent",
    "Levels",
    "Layers"
  ][event.params.rewardType];
  entity.save();
}

export function handleTakedReward(event: TakedRewardEvent): void {
  let entity = new TakedReward(event.transaction.hash.toHexString() + '-' + event.logIndex.toString());
  entity.time = event.params.time.toU32();
  entity.account = event.params.owner
  entity.amount = event.params.reward
  entity.save();
}