import { ComponentPublicInstance } from "vue";

interface TeleportElementPosition {
    top: number
    left: number
    height: number
}

export const useTeleportElementPosition: (trigger: ComponentPublicInstance, el: HTMLElement) => TeleportElementPosition
    = (trigger, el) => {

    let top: number, left: number, height: number = 0;

    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;
    const triggerHeight = trigger.$el.clientHeight;
    // const triggerWidth = trigger.$el.clientWidth;
    let dropDownHeight: number = 0, dropDownWidth: number = 0;
    let triggerX: number = 0, triggerY: number = 0;
    // let dropDownX: number = 0, dropDownY: number = 0;
    if (el) {
        dropDownHeight = el.clientHeight;
        dropDownWidth = el.clientWidth;
        // console.log(trigger.$el.getBoundingClientRect());
        // console.log(el.getBoundingClientRect());
        const { x, y } = trigger.$el.getBoundingClientRect();
        const { x: dx, y: dy } = el.getBoundingClientRect();
        triggerX = x;
        triggerY = y;
        // dropDownX = dx;
        // dropDownY = dy;
    }

    if (scrollTop + triggerY + dropDownHeight >= document.documentElement.scrollHeight) {
        top = top = scrollTop + triggerY - dropDownHeight;
        if (top < 0) {
            top = 0;
            height = scrollTop + triggerY - triggerHeight;
        }
    } else {
        top = scrollTop + triggerY + triggerHeight;
    }

    if (scrollLeft + triggerX + dropDownWidth >= document.documentElement.scrollWidth) {
        left = document.documentElement.scrollWidth - dropDownWidth;
    } else {
        left = scrollLeft + triggerX;
    }

    return {
        top,
        left,
        height
    };
};
