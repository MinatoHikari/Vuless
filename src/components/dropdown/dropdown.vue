<template>
    <teleport to="body">
        <div ref="vlDropdown" :style="defaultStyle" v-if="isShow" class="vl-dropdown">
            <slot></slot>
        </div>
    </teleport>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    watchEffect,
    toRefs,
    watch,
    onUnmounted,
    reactive,
    ref,
    onMounted,
    nextTick,
    ComponentPublicInstance,
    PropType
} from "vue";
import { useTeleportElementPosition } from "@/utils/useTeleportElementOffset";

interface DefaultStyle {
    top?: string | number,
    left?: string | number,
    maxHeight: string | number,
    opacity: number,
}

interface Data {
    parent: null | ComponentPublicInstance
}

export default defineComponent({
    name: "vl-dropdown",
    props: {
        trigger: {
            type: Object as PropType<ComponentPublicInstance>
        },
    },
    data() {
        return {
            parent: null
        } as Data;
    },
    setup(props, context) {

        const defaultStyle = reactive({
            opacity: 0,
            maxHeight: "100%"
        }) as DefaultStyle;

        const { trigger } = toRefs(props);

        const isShow = ref(false);

        const vlDropdown = ref();

        const setOffsetTop = async (trigger: ComponentPublicInstance, dropdown: HTMLElement) => {
            const { top, left, height } = useTeleportElementPosition(trigger, dropdown);
            // const { top, left, height } = useTeleportElementPosition(trigger, vlDropdown.value as HTMLElement);
            defaultStyle.top = `${top}px`;
            defaultStyle.left = `${left}px`;
            if (height !== 0) {
                defaultStyle.maxHeight = `${height}px`;
            }
        };

        const showEl = (trigger: ComponentPublicInstance, dropdown?: HTMLElement) => {
            isShow.value = true;
            nextTick(() => {
                let dropdownEl = dropdown ? dropdown : vlDropdown.value;
                setOffsetTop(trigger, dropdownEl).then(() => {
                    defaultStyle.opacity = 1;
                });
            });
        };

        const hideEl = () => {
            defaultStyle.opacity = 0;
            setTimeout(() => {
                isShow.value = false;
            }, 500);
        };

        const documentEvent = (paramTrigger: ComponentPublicInstance | null, e: MouseEvent,) => {
            let defaultTriggerEl = trigger ? trigger.value : false;
            let triggerInstance = paramTrigger ? paramTrigger : defaultTriggerEl;
            if (isShow.value) {
                // 如果点击的地方不在下拉内部
                if (vlDropdown.value && !vlDropdown.value.contains(e.target)) {
                    hideEl();
                }
            } else {
                // 如果点击的地方在 trigger 内部
                if (triggerInstance && triggerInstance.$el.contains(e.target)) {
                    console.log(e);
                    console.log(paramTrigger);
                    showEl(triggerInstance);
                }
            }
        };

        const documentEventSetup = documentEvent.bind(document, null);

        onMounted(() => {
            console.log(context);
            nextTick(() => {
                if (props.trigger) {
                    document.addEventListener('click', documentEventSetup);
                }
            });
        });

        onUnmounted(() => {
            document.removeEventListener('click', documentEventSetup);
        });

        return {
            defaultStyle,
            vlDropdown,
            isShow,
            showEl,
            hideEl,
            documentEvent,
        };
    },
    mounted() {
        if (this.$parent && this.$parent.$parent && !this.$props.trigger) {
            this.parent = this.$parent;
            document.addEventListener('click', this.documentEventAsChildren);
        }
    },
    unmounted() {
        if (this.$parent && this.$parent.$parent && !this.$props.trigger) {
            document.removeEventListener('click', this.documentEventAsChildren);
        }
    },
    methods: {
        documentEventAsChildren(e: MouseEvent) {
            this.documentEvent(this.parent, e);
        },
    }
});
</script>

<style lang="stylus" src="./dropdown.styl"/>

