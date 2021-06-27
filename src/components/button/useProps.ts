import { PropType, ExtractPropTypes, computed, reactive } from 'vue';

export type Props = ExtractPropTypes<typeof propsConfig>

export const propsConfig = {
    shape: String,
    disabled: Boolean,
    color: String,
    type: String as PropType<'submit' | 'reset' | 'button' | undefined>
};

export const useClasses = (propsObj: ExtractPropTypes<typeof propsConfig>) => {
    const computedClass = computed(() => {
        let result: string[] = [];
        result.push(propsObj.shape ? `vl-button-${propsObj.shape}` : '');

        if (propsObj.disabled) {
            result.push('vl-button-disabled');
        } else if (propsObj.color) {
            result.push(`vl-button-${propsObj.color}`);
        }
        return result;
    });

    const viewClasses = reactive([...computedClass.value]);

    return { viewClasses, computedClass };
};
