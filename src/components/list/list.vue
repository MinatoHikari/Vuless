<script lang="tsx">
import { defineComponent } from 'vue';
import { getSlot } from "@/utils/tools";

export default defineComponent({
    name: "vl-list",
    setup(props, { slots }) {
        return () => (
            <div class="vl-list">
                {getSlot(slots)}
            </div>
        )
    }
})
</script>

<style lang="stylus" src="./list.scss"/>
