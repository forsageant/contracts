import {
    NoderPowerChanged as NoderPowerChangedEvent
} from "../generated/Nodes/Nodes"

import { Noder } from "../generated/schema"

export function handleNoderPowerChanged(event: NoderPowerChangedEvent): void {
    let entity = Noder.load(event.params.account.toHex());
    if (!entity) {
        entity = new Noder(event.params.account.toHex());
        entity.account = event.params.account;
    }
    entity.power = event.params.power;
    entity.save()
}