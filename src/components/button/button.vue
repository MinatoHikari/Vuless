<template>
    <button :class="[viewClasses]" :type="type" class="sd-button" @click="onClick">
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';

export default defineComponent({
    name: "sd-button",
    props: {
        shape: String,
        disabled: Boolean,
        color: String,
        type: String
    },
    setup(props) {
        console.log(props)

        const ComputedClass = computed(() => {
            let result: string[] = []
            switch (props.shape) {
                case 'round': {
                    result.push('sd-button-round')
                    break
                }
                case 'circle': {
                    result.push('sd-button-circle')
                    break
                }
                case 'outline': {
                    result.push('sd-button-outline')
                    break
                }
                case 'link': {
                    result.push('sd-button-link')
                    break
                }
            }

            console.log(props.disabled)
            if (props.disabled) {
                result.push('sd-button-disabled')
            } else {
                switch (props.color) {
                    case 'primary': {
                        result.push('sd-button-primary')
                        break
                    }
                }
            }
            return result
        })

        const viewClasses = reactive([...ComputedClass.value])

        const onClick = () => {
            if (props.disabled || props.shape === "link") {
                return
            }
            viewClasses.push('sd-button-active')
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

<style lang="stylus" src="./button.styl" scoped/>

