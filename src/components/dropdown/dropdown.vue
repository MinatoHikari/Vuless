<template>
    <teleport to="body">
        <div ref="vlDropdown" @mouseleave="handleMouseLeaveDropdown"
             :style="defaultStyle" v-if="isShow" class="vl-dropdown">
            <slot></slot>
        </div>
    </teleport>
</template>

<script lang="ts">
import {
    defineComponent,
    toRefs,
    onUnmounted,
    reactive,
    ref,
    onMounted,
    nextTick,
    ComponentPublicInstance,
    PropType,
    Teleport,
} from "vue";
import { useTeleportElementPosition } from "@/utils/useTeleportElementOffset";
import { useEvents } from '@/utils/useEvents';

interface DefaultStyle {
    top?: string | number,
    left?: string | number,
    maxHeight: string | number,
    opacity: number,
}

interface Data {
    parent: null | HTMLElement
}

export default defineComponent({
    name: "vl-dropdown",
    props: {
        trigger: {
            type: Object as PropType<ComponentPublicInstance>
        },
        event: {
            type: String,
            default: 'click'
        }
    },
    data() {
        return {
            parent: null
        } as Data;
    },
    setup(props) {

        const defaultStyle = reactive({
            opacity: 0,
            maxHeight: "100%"
        }) as DefaultStyle;

        const { trigger } = toRefs(props);

        const isShow = ref(false);

        const vlDropdown = ref();

        const events = useEvents();

        const setOffsetTop = async (trigger: HTMLElement, dropdown: HTMLElement) => {
            const { top, left, height } = useTeleportElementPosition(trigger, dropdown);
            // const { top, left, height } = useTeleportElementPosition(trigger, vlDropdown.value as HTMLElement);
            defaultStyle.top = `${top}px`;
            defaultStyle.left = `${left}px`;
            if (height !== 0) {
                defaultStyle.maxHeight = `${height}px`;
            }
        };

        const showEl = (trigger: HTMLElement, dropdown?: HTMLElement) => {
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

        const getTriggerEl = (paramTrigger: HTMLElement | null) => {
            let defaultTriggerEl: HTMLElement | null = null;
            if (trigger && trigger.value) {
                defaultTriggerEl = trigger.value.$el;
            }
            return paramTrigger ? paramTrigger : defaultTriggerEl;
        };

        const handleClick = (paramTrigger: HTMLElement | null, e: MouseEvent) => {
            let triggerEl = getTriggerEl(paramTrigger);
            if (isShow.value) {
                // 如果点击的地方不在下拉内部
                if (vlDropdown.value && !vlDropdown.value.contains(e.target)) {
                    hideEl();
                }
            } else {
                // 如果点击的地方在 trigger 内部
                if (triggerEl && triggerEl.contains(e.target as Node | null)) {
                    showEl(triggerEl);
                }
            }
        };

        const handleMouseEnter = (paramTrigger: HTMLElement | null, e: MouseEvent) => {
            let triggerEl = getTriggerEl(paramTrigger);
            if (triggerEl)
                showEl(triggerEl);
        };

        const handleMouseLeave = (paramTrigger: HTMLElement | null, e: MouseEvent) => {
            // let triggerEl = getTriggerEl(paramTrigger);
            // 如果鼠标离开 trigger 时目标元素不是下拉控件则关闭
            if (vlDropdown.value && !vlDropdown.value.contains(e.relatedTarget)) {
                hideEl();
            }
        };

        const documentEventSetupClick = handleClick.bind(document, null);
        const documentEventSetupMouseEnter = handleMouseEnter.bind(document, null);
        const documentEventSetupMouseLeave = handleMouseLeave.bind(document, null);

        onMounted(() => {
            nextTick(() => {
                if (props.trigger) {
                    if (props.event === 'click') {
                        document.addEventListener(events.clickE, documentEventSetupClick);
                    }
                    if (props.event === 'hover') {
                        props.trigger.$el.addEventListener(events.mouseEnterE, documentEventSetupMouseEnter);
                        props.trigger.$el.addEventListener(events.mouseLeaveE, documentEventSetupMouseLeave);
                    }
                }
            });
        });

        onUnmounted(() => {
            if (props.event === 'click') {
                document.removeEventListener('click', documentEventSetupClick);
            }
            if (props.event === 'hover') {
                if (props.trigger) {
                    props.trigger.$el.removeEventListener(events.mouseEnterE, documentEventSetupMouseEnter);
                    props.trigger.$el.removeEventListener(events.mouseLeaveE, documentEventSetupMouseLeave);
                }
            }
        });

        return {
            defaultStyle,
            vlDropdown,
            isShow,
            events,
            getTriggerEl,
            showEl,
            hideEl,
            handleClick,
            handleMouseEnter,
            handleMouseLeave,
        };
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.$props.trigger) {
                this.parent = (this.$parent && this.$parent.$el.nodeType !== 3)
                    ? this.$parent.$el : this.$el.parentElement;
                if (this.$props.event === 'click') {
                    document.addEventListener(this.events.clickE, this.handleClickAsChildren);
                }
                if (this.$props.event === 'hover') {
                    if (this.parent) {
                        this.parent.addEventListener(this.events.mouseEnterE, this.handleMouseEnterAsChildren);
                        this.parent.addEventListener(this.events.mouseLeaveE, this.handleMouseLeaveAsChildren);
                    }
                }
            }
        });

    },
    unmounted() {
        if (this.$parent && this.$parent.$parent && !this.$props.trigger) {
            if (this.$props.event === 'click') {
                document.removeEventListener(this.events.clickE, this.handleClickAsChildren);
            }
            if (this.$props.event === 'hover') {
                if (this.parent) {
                    this.parent.removeEventListener(this.events.mouseEnterE, this.handleMouseEnterAsChildren);
                    this.parent.removeEventListener(this.events.mouseLeaveE, this.handleMouseLeaveAsChildren);
                }
            }
        }
    },
    methods: {
        handleClickAsChildren(e: MouseEvent) {
            this.handleClick(this.parent, e);
        },
        handleMouseEnterAsChildren(e: MouseEvent) {
            this.handleMouseEnter(this.parent, e);
        },
        handleMouseLeaveAsChildren(e: MouseEvent) {
            this.handleMouseLeave(this.parent, e);
        },
        handleMouseLeaveDropdown(e: MouseEvent) {
            if (this.$props.event === 'hover') {
                let triggerEl: HTMLElement | null = null;
                if (this.$props.trigger) {
                    triggerEl = this.getTriggerEl(null);
                } else if (this.parent) {
                    triggerEl = this.getTriggerEl(this.parent);
                }
                // 如果移出控件时目标元素不是trigger,隐藏控件
                if (triggerEl && !triggerEl.contains(e.relatedTarget as Node | null))
                    this.hideEl();
            }
        },
    }
});
</script>

<style lang="stylus" src="./dropdown.styl"/>

