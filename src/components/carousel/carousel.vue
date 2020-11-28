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
            <slot v-if="sliderList.length > 0" name="prev" :classes="['vl-carousel-btn-position']" :prev="prev">
                <button class="vl-carousel-prev vl-carousel-btn-position"
                        :class="{'vl-carousel-btn-active':btnActive === 'prev'}" @click="prev">
                    <vl-icon name="angle-left-solid" color="white"></vl-icon>
                </button>
            </slot>
            <slot v-if="sliderList.length > 0" name="next" :classes="['vl-carousel-btn-position']" :next="next">
                <button class="vl-carousel-next vl-carousel-btn-position"
                        :class="{'vl-carousel-btn-active':btnActive === 'next'}" @click="next">
                    <vl-icon name="angle-right-solid" color="white"></vl-icon>
                </button>
            </slot>
            <slot v-if="sliderList.length > 0" name="controller" :classes="['vl-carousel-controller']">
                <div class="vl-carousel-controller">
                    <slot name="controller-btn" v-for="(item,index) in data" :key="item.key">
                        <button class="vl-carousel-controller-btn" @click="slideTo(index)"
                                :class="{active:controllerIndex === index}"></button>
                    </slot>
                </div>
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
    getCurrentInstance,
    watchEffect,
    isVNode
} from "vue";
import Icon from "@/components/icon/icon.vue";
import { throttle, Debounce } from "@/utils/tools";
import { version } from "@typescript-eslint/parser";

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

        let currentIndex = ref(1);

        const instance = getCurrentInstance();

        const sliderList = computed(() => {
            if (props.data.length === 0) return [];
            let arr = [...props.data];
            arr.unshift(props.data[props.data.length - 1 < 0 ? 0 : props.data.length - 1]);
            arr.push(props.data[0]);
            const newArr: any[] = [];
            for (let i = 0; i < arr.length; i++) {
                newArr.push({ ...arr[i], key: i });
            }
            return newArr;
        });

        const controllerIndex = computed(() => {
            let result = currentIndex.value - 1;
            if (currentIndex.value === sliderList.value.length - 1) {
                result = 0;
            }
            if (currentIndex.value === 0) {
                result = sliderList.value.length == 0 ? 0 : sliderList.value.length - 2;
            }
            return result;
        });

        const sliderGroupStyle: SliderGroupStyle = reactive({});
        const sliderStyle: SliderStyle = reactive({});
        let intervalCleared = false;
        let totalDistance = 0;
        const inner: Ref<HTMLElement | undefined> = ref();

        const resetStatus = (distance: Ref<number>, isAnti: boolean = false) => {
            totalDistance = isAnti ? -props.data.length * distance.value : -distance.value;
            sliderGroupStyle.transform = `translate3d(${totalDistance}px, 0px, 0px)`;
            currentIndex.value = isAnti ? props.data.length : 1;
        };

        const slide = (distance: Ref<number>, isAnti: boolean = false) => {
            sliderGroupStyle.transition = "all .5s";
            totalDistance = isAnti ? totalDistance + distance.value : totalDistance - distance.value;
            console.log(totalDistance);
            sliderGroupStyle.transform = `translate3d(${totalDistance}px, 0px, 0px)`;
            isAnti ? currentIndex.value-- : currentIndex.value++;
            setTimeout(() => {
                delete sliderGroupStyle.transition;
                // isAnti ? currentIndex.value-- : currentIndex.value++;
                if (!isAnti && currentIndex.value === sliderList.value.length - 1) {
                    resetStatus(distance, isAnti);
                }
                if (isAnti && currentIndex.value === 0) {
                    resetStatus(distance, isAnti);
                }
                if (props.interval && intervalCleared) {
                    startInterval();
                    intervalCleared = false;
                }
            }, props.duration);
        };

        const useDistance = () => {
            return inner.value?.offsetWidth ? inner.value?.offsetWidth : 0
        }

        const slideTo = (index: number) => {
            sliderGroupStyle.transition = "all .5s";
            distance.value = useDistance();
            currentIndex.value = ++index;
            totalDistance = -distance.value * currentIndex.value;
            sliderGroupStyle.transform = `translate3d(${totalDistance}px, 0px, 0px)`;
        };

        const btnActive: Ref<'prev' | 'next' | ""> = ref("");
        const activeBtn = (type: 'prev' | 'next') => {
            btnActive.value = type;
            setTimeout(() => {
                btnActive.value = "";
            }, 300);
        };

        const distance = ref(0);
        let slideInterval = 0;

        const prev = () => {
            activeBtn('prev');
            if (props.interval) {
                clearInterval(slideInterval);
                intervalCleared = true;
            }
            if (inner.value) throttle(slide.bind(null, distance, true), props.duration);
        };

        const next = () => {
            activeBtn('next');
            if (props.interval) {
                clearInterval(slideInterval);
                intervalCleared = true;
            }
            if (inner.value) throttle(slide.bind(null, distance), props.duration);
        };

        const startInterval = () => {
            slideInterval = setInterval(() => {
                inner.value ? slide(distance) : () => {
                    return;
                };
            }, 2000);
        };

        const debounceFn = new Debounce();

        const innerOffsetResize = debounceFn.debounce.bind(debounceFn, () => {
            console.log(2);
            distance.value = useDistance();
            sliderGroupStyle.width = `${distance.value * (props.data.length + 2)}px`;
            sliderStyle.width = `${distance.value}px`;
            totalDistance = -distance.value * currentIndex.value;
            sliderGroupStyle.transform = `translate3d(${totalDistance}px, 0px, 0px)`;
        }, 100);

        watchEffect(() => {
            distance.value = useDistance();
            sliderGroupStyle.width = `${distance.value * (props.data.length + 2)}px`;
            if (props.interval) {
                if (slideInterval === 0 && props.data.length > 0) {
                    startInterval();
                }
            }
            // resetStatus(distance);
        });

        onMounted(() => {
            window.addEventListener('resize', innerOffsetResize);
            console.dir(inner.value);
            nextTick(() => {
                if (inner.value) {
                    distance.value = inner.value.offsetWidth;
                    sliderGroupStyle.width = `${distance.value * (props.data.length + 2)}px`;
                    resetStatus(distance);
                    sliderStyle.width = `${distance.value}px`;
                    if (props.interval && props.data.length > 0) startInterval();
                }
            });
        });

        onUnmounted(() => {
            clearInterval(slideInterval);
            window.removeEventListener('resize', innerOffsetResize);
        });

        return {
            inner,
            controllerIndex,
            sliderGroupStyle,
            sliderStyle,
            sliderList,
            btnActive,
            prev,
            next,
            slideTo
        };
    },
});
</script>

<style src="./carousel.styl" lang="stylus"/>

