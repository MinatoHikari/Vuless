import { Slots } from 'vue';

export function getSlot(slots: Slots, slotName?: string) {
    if (slotName) {
        return slots[slotName] ? slots[slotName]!() : '';
    } else {
        return slots.default ? slots.default() : '';
    }
}

export function getStrOrCssStr(obj: string | number, unit?: "px" | "em" | "rem" | "%") {
    unit = unit ? unit : "px";
    return typeof obj === "number" ? `${obj}${unit}` : obj;
}