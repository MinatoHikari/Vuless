<template>
    <span class="vl-icon-container" :style="{ width: `${size}px`, height: `${size}px` }">
        <inline-svg
            :width="size"
            :height="size"
            :src="getSrc(name)"
            :fill="color"
            :stroke-width="10"
        />
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InlineSvg from 'vue-inline-svg';

const images = import.meta.globEager('../../assets/svg/*.svg');
const imgMap = new Map();
const keys = Object.keys(imgMap);
for (let key of keys) {
    console.log(key);
    const arr = key.split('\/');
    imgMap.set(arr[arr.length - 1].split('\.')[0], images[key]);
}

export default defineComponent({
    name: 'vl-icon',
    components: {
        'inline-svg': InlineSvg
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
            default: 'rgba(0, 0, 0, 0.65)'
        }
    },
    methods: {
        getSrc(name: string) {
            return imgMap.get(name);
        }
    }
});
</script>

<style src="./icon.scss" lang="scss" />
