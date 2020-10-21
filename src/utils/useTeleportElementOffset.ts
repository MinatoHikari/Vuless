import { ComponentPublicInstance } from "vue";

interface TeleportElementPosition {
    top: number
    left: number
    height: number
    width: number
}

export const useTeleportElementPosition:
    (trigger: HTMLElement, el: HTMLElement, contextEvent?: MouseEvent, originWidth?: number) => TeleportElementPosition
    = (trigger, el, contextEvent, originWidth) => {

    let top: number, left: number, height: number = 0, width: number = 0;

    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;
    const triggerHeight = trigger.offsetHeight;
    const triggerWidth = trigger.offsetWidth;
    let dropDownHeight: number = 0, dropDownWidth: number = 0;
    let triggerX: number = 0, triggerY: number = 0;
    let mouseX: number = 0, mouseY: number = 0;
    // let dropDownX: number = 0, dropDownY: number = 0;
    if (el) {
        dropDownHeight = el.offsetHeight;
        dropDownWidth = el.offsetWidth;
        if (originWidth) {
            dropDownWidth = originWidth;
        }
    }
    if (contextEvent) {
        mouseX = contextEvent.pageX;
        mouseY = contextEvent.pageY;
        // console.log(mouseY);
        // console.log(mouseX);
        console.log(mouseY + dropDownHeight);
        console.log(document.body.offsetHeight);
        if (mouseY + dropDownHeight >= document.body.offsetHeight) {
            top = mouseY - dropDownHeight;
            if (top < 0) {
                top = 0;
                height = mouseY - scrollTop;
            }
        } else {
            top = mouseY;
        }

        if (mouseX + dropDownWidth >= document.documentElement.offsetWidth) {
            left = mouseX - dropDownWidth;
            if (left < 0) {
                left = 0;
                width = mouseX;
            }
        } else {
            left = mouseX;
        }
    } else {
        // console.log(window.getComputedStyle(trigger).border);

        // console.log(trigger.getBoundingClientRect());
        // console.log(el.getBoundingClientRect());
        const { x, y } = trigger.getBoundingClientRect();
        const { x: dx, y: dy } = el.getBoundingClientRect();
        triggerX = x;
        triggerY = y;
        // dropDownX = dx;
        // dropDownY = dy;

        // console.log(scrollTop + triggerY + dropDownHeight);
        // console.log(document.body.scrollHeight);
        if (scrollTop + triggerY + dropDownHeight >= document.body.offsetHeight) {
            top = scrollTop + triggerY - dropDownHeight;
            if (top < 0) {
                top = 0;
                height = scrollTop + triggerY - triggerHeight;
            }
        } else {
            top = scrollTop + triggerY + triggerHeight;
        }

        if (scrollLeft + triggerX + dropDownWidth >= document.documentElement.offsetWidth) {
            left = document.documentElement.scrollWidth - dropDownWidth;
        } else {
            left = scrollLeft + triggerX;
        }
    }

    return {
        top,
        left,
        height,
        width
    };
};
