<script lang="tsx">
import { defineComponent, computed } from 'vue';
import { getSlot } from "@/utils/tools";

export default defineComponent({
    name: 'vl-tag',
    props: {
        color: String,
        type: String
    },
    setup(props, { slots }) {
        // console.log(props)
        
        const classes = computed(() => {
            const result: string[] = []
            result.push(`vl-tag`)
            if (props.color) {
                result.push(`vl-tag-${props.color}`)
            }
            if (props.type) {
                result.push(`vl-tag-${props.type}`)
            }
            return result
        })

        return () => (
            <div class={classes.value}>
                <span>{getSlot(slots)}</span>
            </div>
        )
    }
})
</script>

<style lang="stylus" src="./tag.styl"/>

