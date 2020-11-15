<template>
    <div class="vl-carousel-container">
        <div ref="inner" class="vl-carousel-inner">
            <div class="vl-carousel-slider-group" :style="sliderGroupStyle">
                <template v-for="item in sliderList" :key="item.key">
                    <div :style="{...sliderStyle}" class="vl-carousel-slider">
                        <slot name="item-template" :item="item"></slot>
                    </div>
                </template>
            </div>
            <slot name="prev" :classes="['vl-carousel-btn-position']" :prev="prev">
                <button class="vl-carousel-prev vl-carousel-btn-position"
                        :class="{'vl-carousel-btn-active':btnActive === 'prev'}" @click="prev">
                    <vl-icon name="angle-left-solid" color="white"></vl-icon>
                </button>
            </slot>
            <slot name="next" :classes="['vl-carousel-btn-position']" :next="next">
                <button class="vl-carousel-next vl-carousel-btn-position"
                        :class="{'vl-carousel-btn-active':btnActive === 'next'}" @click="next">
                    <vl-icon name="angle-right-solid" color="white"></vl-icon>
                </button>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    PropType,
    nextTick,
    onMounted,
    ref,
    Ref,
    reactive,
    computed,
    onUnmounted,
    isVNode
} from "vue";
import Icon from "@/components/icon/icon.vue";
import { throttle } from "@/utils/tools";

export type DataArray<T> = Array<T>

export interface SliderGroupStyle {
    width?: string
    transform?: string
    transition?: string
}

export interface SliderStyle {
    width?: string
    left?: string
}

export default defineComponent({
    name: "vl-carousel",
    components: {
        "vl-icon": Icon
    },
    props: {
        data: {
            type: Array as PropType<DataArray<Record<string, any>>>,
            default: []
        },
        interval: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 500
        }
    },
    setup(props, { slots }) {
        const inner: Ref<HTMLElement | undefined> = ref();

        const sliderGroupStyle: SliderGroupStyle = reactive({});
        const sliderStyle: SliderStyle = reactive({});
        const firstLeft = ref(0);
        let slideInterval = 0;
        let totalDistance = 0;
        let currentIndex = 1;
        let intervalCleared = false

        const sliderList = computed(() => {
            let arr = ([] as Record<string, any>[]).concat(props.data);
            arr.unshift(props.data[props.data.length - 1 < 0 ? 0 : props.data.length - 1]);
            arr.push(props.data[0]);
            return arr.map((item, index) => {
                item.key = index;
                return item;
            });
        });

        const resetStatus = (distance: number, isAnti: boolean = false) => {
            totalDistance = isAnti ? -props.data.length * distance : -distance;
            sliderGroupStyle.transform = `translate3d(${totalDistance}px, 0px, 0px)`;
            currentIndex = isAnti ? props.data.length : 1;
        };

        const slide = (distance: number, isAnti: boolean = false) => {
            sliderGroupStyle.transition = "all .5s";
            totalDistance = isAnti ? totalDistance + distance : totalDistance - distance;
            sliderGroupStyle.transform = `translate3d(${totalDistance}px, 0px, 0px)`;
            setTimeout(() => {
                delete sliderGroupStyle.transition;
                isAnti ? currentIndex-- : currentIndex++;
                if (!isAnti && currentIndex === sliderList.value.length - 1) {
                    resetStatus(distance, isAnti);
                }
                if (isAnti && currentIndex === 0) {
                    resetStatus(distance, isAnti);
                }
                if (props.interval && intervalCleared) {
                    startInterval();
                    intervalCleared = false
                }
            }, props.duration);
        };

        const btnActive: Ref<'prev' | 'next' | ""> = ref("");
        const activeBtn = (type: 'prev' | 'next') => {
            btnActive.value = type;
            setTimeout(() => {
                btnActive.value = "";
            }, 300);
        };

        const prev = () => {
            activeBtn('prev');
            if (props.interval) {
                clearInterval(slideInterval);
                intervalCleared = true
            }
            if (inner.value) throttle(slide.bind(null, inner.value.offsetWidth, true), props.duration);
        };

        const next = () => {
            activeBtn('next');
            if (props.interval) {
                clearInterval(slideInterval);
                intervalCleared = true
            }
            if (inner.value) throttle(slide.bind(null, inner.value.offsetWidth), props.duration);
        };

        const startInterval = () => {
            slideInterval = setInterval(() => {
                inner.value ? slide(inner.value.offsetWidth) : () => {
                    return;
                };
            }, 2000);
        };

        onMounted(() => {
            nextTick(() => {
                if (inner.value) {
                    console.dir(inner.value.offsetWidth);
                    sliderGroupStyle.width = `${inner.value.offsetWidth * (props.data.length + 2)}px`;
                    resetStatus(inner.value.offsetWidth);
                    sliderStyle.width = `${inner.value.offsetWidth}px`;
                    if (props.interval) startInterval();
                }
            });
        });

        onUnmounted(() => {
            clearInterval(slideInterval);
        });

        return {
            inner,
            firstLeft,
            sliderGroupStyle,
            sliderStyle,
            sliderList,
            btnActive,
            prev,
            next
        };
    },
});
</script>

<style src="./carousel.styl" lang="stylus"/>

