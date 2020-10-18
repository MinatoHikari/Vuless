<template>
    <button :class="viewClasses" :type="type" class="vl-button" @click="onClick">
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';

export default defineComponent({
    name: "vl-button",
    props: {
        shape: String,
        disabled: Boolean,
        color: String,
        type: String
    },
    setup(props) {
        const ComputedClass = computed(() => {
            let result: string[] = []
            result.push(props.shape ? `vl-button-${props.shape}` : '')

            if (props.disabled) {
                result.push('vl-button-disabled')
            } else if (props.color) {
                result.push(`vl-button-${props.color}`)
            }
            return result
        })

        const viewClasses = reactive([...ComputedClass.value])

        const onClick = () => {
            if (props.disabled || props.shape === "link") {
                return
            }
            viewClasses.push('vl-button-active')
            const index = viewClasses.length - 1
            setTimeout(() => {
                viewClasses.splice(index, 1)
            }, 200)
        }

        return {
            ComputedClass,
            viewClasses,
            onClick
        }
    }
})
</script>

<style lang="stylus" src="./button.styl" />

