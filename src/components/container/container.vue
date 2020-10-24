<script lang="tsx">
import { defineComponent, reactive, PropType, computed } from "vue";
import getSlot from '@/utils/getSlot';

interface PropT {
    type: string,
    grid: Grid
}

export interface Grid {
    columns?: ColumnsAndRows
    rows?: ColumnsAndRows
}

interface ColumnsAndRows {
    repeat?: number | "auto-fill",
    template: (string | number | [(string | number), (string | number)])[],
}

const defaultGrid = {
    gridTemplateColumns: "repeat(1,100%)",
    gridTemplateRows: "",
};

export default defineComponent({
    name: "vl-container",
    props: {
        type: {
            type: String,
            default: "flex"
        },
        grid: {
            type: Object as PropType<Grid>,
        }
    },
    setup(props, { slots }) {

        const classes: string[] = reactive([]);

        classes.push(`vl-container-${props.type}`);
        let style = reactive({ ...defaultGrid });

        const getGridColumnsAndRows: (param: ColumnsAndRows) => string
            = (param) => {
            let repeat = param.repeat ? param.repeat : "auto-fill";
            let template = "";
            for (let item of param.template) {
                if (typeof item === 'number') {
                    template = template + `${item}px` + " ";
                } else if (typeof item === "string") {
                    template = template + item + " ";
                } else {
                    const placeHolder1 = typeof item[0] === "number" ? `${item[0]}px` : item[0];
                    const placeHolder2 = typeof item[1] === "number" ? `${item[1]}px` : item[1];
                    template = template + `minmax(${placeHolder1}, ${placeHolder2})`;
                }
            }
            return `repeat(${repeat},${template})`;
        };

        if (props.type === 'grid' && props.grid) {
            style.gridTemplateColumns = props.grid.columns ? getGridColumnsAndRows(props.grid.columns) : style.gridTemplateColumns;
            style.gridTemplateRows = props.grid.rows ? getGridColumnsAndRows(props.grid.rows) : style.gridTemplateRows;
        }

        return () => (
            <div class={classes} style={style}>
                {getSlot(slots)}
            </div>
        );
    }
});
</script>

<style lang="stylus" src="./container.styl"/>
