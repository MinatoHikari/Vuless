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
    maxWidth: string | number,
    opacity: number,
}

interface Data {
    parent: null | HTMLElement
}

type Event = 'click' | 'rClick' | 'hover'

export default defineComponent({
    name: "vl-dropdown",
    props: {
        trigger: {
            type: Object as PropType<ComponentPublicInstance>
        },
        event: {
            type: String as PropType<Event>,
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
            maxHeight: "100%",
            maxWidth: "100%"
        }) as DefaultStyle;

        const { trigger } = toRefs(props);

        const isShow = ref(false);

        const vlDropdown = ref();

        const events = useEvents();

        let isFirstShow = true;
        let originWidth = 0;

        const getOriginWidth = () => {
            if (isFirstShow) {
                isFirstShow = false;
                console.log("origin:", vlDropdown.value.offsetWidth);
                return vlDropdown.value.offsetWidth;
            }
        };

        const setOffset = async (trigger: HTMLElement, dropdown: HTMLElement, event?: MouseEvent) => {
            originWidth = getOriginWidth();
            const { top, left, height, width } = useTeleportElementPosition(trigger, dropdown, event, originWidth);
            // const { top, left, height } = useTeleportElementPosition(trigger, vlDropdown.value as HTMLElement);
            defaultStyle.top = `${top}px`;
            defaultStyle.left = `${left}px`;
            if (height !== 0) {
                defaultStyle.maxHeight = `${height}px`;
            }
            if (width !== 0) {
                defaultStyle.maxWidth = `${width}px`;
            }
        };

        const showEl = (trigger: HTMLElement, dropdown?: HTMLElement, event?: MouseEvent) => {
            isShow.value = true;
            nextTick(() => {
                let dropdownEl = dropdown ? dropdown : vlDropdown.value;
                setOffset(trigger, dropdownEl, event).then(() => {
                    defaultStyle.opacity = 1;
                });
            });
        };

        const hideEl = () => {
            defaultStyle.opacity = 0;
            setTimeout(() => {
                defaultStyle.maxWidth = "100%";
                isShow.value = false;
            }, 300);
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
                if (props.event !== 'rClick') {
                    // 如果点击的地方在 trigger 内部
                    if (triggerEl && triggerEl.contains(e.target as Node | null)) {
                        showEl(triggerEl);
                    }
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

        const handleRightClick = (paramTrigger: HTMLElement | null, e: MouseEvent) => {
            let triggerEl = getTriggerEl(paramTrigger);
            if (isShow.value) {
                // 如果点击的地方不在下拉内部 隐藏控件
                if (vlDropdown.value && !vlDropdown.value.contains(e.target)) {
                    hideEl();
                }
                // 如果点击的地方在 trigger 内部 屏蔽右键默认事件并且动画结束后显示控件
                if (triggerEl && triggerEl.contains(e.target as Node | null)) {
                    e.preventDefault();
                }
                setTimeout(() => {
                    if (triggerEl && triggerEl.contains(e.target as Node | null)) {
                        showEl(triggerEl, undefined, e);
                    }
                }, 300);

            } else {
                if (triggerEl && triggerEl.contains(e.target as Node | null)) {
                    e.preventDefault();
                    showEl(triggerEl, undefined, e);
                }
            }
        };

        const documentEventSetupClick = handleClick.bind(document, null);
        const documentEventSetupMouseEnter = handleMouseEnter.bind(document, null);
        const documentEventSetupMouseLeave = handleMouseLeave.bind(document, null);
        const documentEventSetupRightClick = handleRightClick.bind(document, null);

        onMounted(() => {
            nextTick(() => {
                if (props.trigger) {
                    switch (props.event) {
                        case 'click': {
                            document.addEventListener(events.clickE, documentEventSetupClick);
                            break;
                        }
                        case 'hover': {
                            if (props.trigger) {
                                props.trigger.$el.addEventListener(events.mouseEnterE, documentEventSetupMouseEnter);
                                props.trigger.$el.addEventListener(events.mouseLeaveE, documentEventSetupMouseLeave);
                            }
                            break;
                        }
                        case 'rClick': {
                            document.addEventListener(events.rightClickE, documentEventSetupRightClick);
                            document.addEventListener(events.clickE, documentEventSetupClick);
                            break;
                        }
                    }
                }
            });
        });

        onUnmounted(() => {
            switch (props.event) {
                case 'click': {
                    document.removeEventListener('click', documentEventSetupClick);
                    break;
                }
                case 'hover': {
                    if (props.trigger) {
                        props.trigger.$el.removeEventListener(events.mouseEnterE, documentEventSetupMouseEnter);
                        props.trigger.$el.removeEventListener(events.mouseLeaveE, documentEventSetupMouseLeave);
                    }
                    break;
                }
                case 'rClick': {
                    document.removeEventListener(events.rightClickE, documentEventSetupRightClick);
                    document.removeEventListener(events.clickE, documentEventSetupClick);
                    break;
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
            handleRightClick
        };
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.$props.trigger) {
                this.parent = (this.$parent && this.$parent.$el.nodeType !== 3)
                    ? this.$parent.$el : this.$el.parentElement;
                switch (this.$props.event) {
                    case 'click': {
                        document.addEventListener(this.events.clickE, this.handleClickAsChildren);
                        break;
                    }
                    case 'hover': {
                        if (this.parent) {
                            this.parent.addEventListener(this.events.mouseEnterE, this.handleMouseEnterAsChildren);
                            this.parent.addEventListener(this.events.mouseLeaveE, this.handleMouseLeaveAsChildren);
                        }
                        break;
                    }
                    case 'rClick': {
                        document.addEventListener(this.events.rightClickE, this.handleRightClickAsChildren);
                        document.addEventListener(this.events.clickE, this.handleClickAsChildren);
                        break;
                    }
                }
            }
        });
    },
    unmounted() {
        if (this.$parent && this.$parent.$parent && !this.$props.trigger) {
            switch (this.$props.event) {
                case 'click': {
                    document.removeEventListener(this.events.clickE, this.handleClickAsChildren);
                    break;
                }
                case 'hover': {
                    if (this.parent) {
                        this.parent.removeEventListener(this.events.mouseEnterE, this.handleMouseEnterAsChildren);
                        this.parent.removeEventListener(this.events.mouseLeaveE, this.handleMouseLeaveAsChildren);
                    }
                    break;
                }
                case 'rClick': {
                    document.removeEventListener(this.events.rightClickE, this.handleRightClickAsChildren);
                    document.removeEventListener(this.events.clickE, this.handleClickAsChildren);
                    break;
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
        handleRightClickAsChildren(e: MouseEvent) {
            this.handleRightClick(this.parent, e);
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

<style lang="scss" src="./dropdown.scss"/>

