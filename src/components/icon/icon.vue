<template>
    <span class="vl-icon-container" :style="{width:`${size}px`,height:`${size}px`}">
        <inline-svg :width="size" :height="size" :src="require(`../../assets/svg/${name}.svg`)" :fill="color"
                    :stroke-width="10"/>
    </span>
    <!--    <img :src="require(`../../assets/svg/${name}.svg`)" alt="icon">-->
</template>

<script>
import { defineComponent } from "vue";
import InlineSvg from 'vue-inline-svg';

export default defineComponent({
    name: "vl-icon",
    components: {
        "inline-svg": InlineSvg
    },
    props: {
        name: {
            type: String
        },
        size: {
            type: Number,
            default: 16
        },
        color: {
            type: String,
            default: "rgba(0, 0, 0, 0.65)"
        }
    }
});
</script>

<style src="./icon.styl" lang="stylus"/>
