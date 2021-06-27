import { Props } from './useProps';
import { getCurrentInstance } from 'vue';

export const useEvents = (props: Props, viewClasses: string[]) => {
    const vm = getCurrentInstance();

    const onClick = (e: MouseEvent) => {
        if (props.disabled || props.shape === 'link') {
            return;
        }
        viewClasses.push('vl-button-active');
        const index = viewClasses.length - 1;
        setTimeout(() => {
            viewClasses.splice(index, 1);
        }, 200);
        vm && vm.emit('click', e);
    };

    return {
        onClick
    };
};
