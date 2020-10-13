<script lang="tsx">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'vl-tag',
    props: {
        color: String
    },
    setup(props,{slots}) {
        console.log(props)

        const classes = computed(() => {
            const result: string[] = []
            result.push(`vl-tag`)
            if (props.color) {
                result.push(`vl-tag-${props.color}`)
            }
            return result
        })

        return () => (
            <div class={classes.value}>
                <span>{slots.default ? slots.default() : ''}</span>
            </div>
        )
    }
})
</script>

<style lang="stylus" src="./tag.styl" />

