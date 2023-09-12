import {
  Distrubtioned as DistrubtionedEvent
} from "../generated/PoolFomo/PoolFomo"

import { FomoDistrubtioned } from "../generated/schema"

export function handleDistrubtioned(event: DistrubtionedEvent): void {
  let entity = new FomoDistrubtioned(event.transaction.hash.toHexString() + '-' + event.logIndex.toString());
  entity.time = event.params.time.toU32();
  entity.beforTotalAmount = event.params.beforTotalAmount;
  entity.afterTotalAmount = event.params.afterTotalAmount;
  entity.distrubtionTxHash = event.transaction.hash;
  entity.save();
}