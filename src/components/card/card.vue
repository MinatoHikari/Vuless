<template>
    <div :class="cardContainerClass" class="vl-card">
        <div v-if="showHeader" :class="headerClass" class="vl-card-header">
            <span>
                <slot name="header">
                    {{ title }}
                </slot>
            </span>
        </div>
        <div :class="bodyClass" class="vl-card-body">
            <slot></slot>
        </div>
        <div class="vl-card-actions">
            <slot name="actions">
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
    name: "vl-card",
    props: {
        title: String,
        bodyClass: Array,
        headerClass: Array,
        showBorder: {
            type: Boolean,
            default: true
        },
        shadow: {
            type: String,
            default: 'never'
        }
    },
    setup(props, { slots }) {
        console.log(props.bodyClass)
        console.log(slots)

        const showHeader = computed(() => {
            return 'header' in slots || props.title
        })

        const cardContainerClass = reactive({
            'vl-card-border': props.showBorder,
            'vl-card-hover': props.shadow === 'hover',
            'vl-card-shadow': props.shadow === 'always'
        })

        return {
            cardContainerClass,
            showHeader
        }
    },
})
</script>

<style lang="stylus" src="./card.styl"/>
