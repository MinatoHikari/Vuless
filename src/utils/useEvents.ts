export const clickE: keyof DocumentEventMap = 'click';
export const mouseEnterE: keyof DocumentEventMap = 'mouseenter';
export const mouseLeaveE: keyof DocumentEventMap = 'mouseleave';
export const mouseOverE: keyof DocumentEventMap = 'mouseover';

export const useEvents = () => {
    return {
        clickE,
        mouseEnterE,
        mouseLeaveE,
        mouseOverE
    };
};
