import {
    TakedReward as TakedRewardEvent
} from "../generated/Mine/Mine"

import { RewardIncreased } from "../generated/schema"

export function handleTakedReward(event: TakedRewardEvent): void {
    let entity = new RewardIncreased(event.transaction.hash.toHexString() + '-' + event.logIndex.toString());
    entity.time = event.params.time.toU32()
    entity.owner = event.params.owner
    entity.sender = event.params.owner
    entity.amount = event.params.reward
    entity.rewardType = "Static";
    entity.save();
}