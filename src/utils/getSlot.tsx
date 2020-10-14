import { Slots } from 'vue'

export default function getSlot(slots: Slots, slotName?: string) {
    if (slotName) {
        return slots[slotName] ? slots[slotName]!() : ''
    } else {
        return slots.default ? slots.default() : ''
    }
}
