<template>
    <button :class="viewClasses" v-bind="$attrs" class="vl-button" @click="onClick">
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { propsConfig, useClasses } from './useProps';
import { useEvents } from '@/components/button/useEvents';

export default defineComponent({
    name: 'vl-button',
    props: propsConfig,
    emits: {
        click: null
    },
    setup(props, { emit }) {
        const { viewClasses } = useClasses(props);

        const { onClick } = useEvents(props, viewClasses);

        return {
            viewClasses,
            onClick
        };
    }
});
</script>

<style lang="scss" src="./button.scss" />
