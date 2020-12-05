<template>
    <div ref="message" :style="{top:`${msgTop}px`}" class="vl-message">{{ content }}</div>
    <!--        <div ref="message" :style="{top:`${msgTop}px`}" v-show="show" class="vl-message">{{ name }}</div>-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick, onUnmounted, getCurrentInstance, defineEmit } from 'vue';

export default defineComponent({
    name: "vl-message",
    props: {
        duration: Number,
        keyIndex: Number,
        content: String
    },
    emits: {
        close: (index?: number) => {
            if (index || index === 0) {
                // console.log(index);
                return true;
            }
        }
    },
    setup(props, { emit }) {
        const name = "vl-message";

        const message = ref();

        const show = ref(true);

        let msgTop = ref(0);
        // let msgTop = ref(20);

        onMounted(() => {
            nextTick(() => {
                // show.value = true;
                // (message.value as Element).addEventListener('transitionend', onHide);
                setTimeout(() => {
                    emit('close', props.keyIndex);
                    // show.value = false;
                }, props.duration);
            });
        });

        return {
            name,
            show,
            message,
            msgTop
        };
    }
});
</script>

<style src="./message.styl" lang="stylus"/>

