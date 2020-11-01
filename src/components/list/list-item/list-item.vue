<script lang="tsx">
import { defineComponent } from 'vue';
import { getSlot } from "@/utils/tools";

export default defineComponent({
    name: "vl-list-item",
    setup(props, { slots }) {
        // jsx.Elements of slots
        const Title = () => (
            slots.title
                ? <div class="vl-list-item-title">{getSlot(slots, 'title')}</div>
                : false
        );
        const Extra = () => (
            slots.extra
                ? <div>{getSlot(slots, 'extra')}</div>
                : false
        );
        return () => (
            <div class="vl-list-item">
                <div>
                    {Title()}
                    <div>
                        {getSlot(slots)}
                    </div>
                </div>
                {Extra()}
            </div>
        );
    }
});
</script>

<style lang="stylus" src="../list.styl"/>


