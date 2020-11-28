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

let prevTime: number = Date.now();

export function throttle(func: (...args: any) => any, time: number) {
    const nowTime = Date.now();
    if (nowTime - prevTime > time) {
        func();
        prevTime = nowTime;
    }
}

export class Debounce {
    public timeout: number = 0;

    debounce(func: (...args: any) => any | void, duration: number) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(func, duration);
        } else {
            this.timeout = setTimeout(func, duration);
        }
    }
}
