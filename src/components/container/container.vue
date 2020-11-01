<script lang="tsx">
import { defineComponent, reactive, PropType, computed } from "vue";
import { getSlot, getStrOrCssStr } from '@/utils/tools';

type LayoutType = "flex" | "grid"
type TwinCssArray = [(string | number), (string | number)]
type GridDense = "row" | "column" | "row dense" | "column dense"
type PlaceItems = "start" | "end" | "center" | "stretch"
type PlaceContent = PlaceItems | "space-around" | "space-between" | "space-evenly";

export interface Grid {
    columns?: ColumnsAndRows
    rows?: ColumnsAndRows
    area?: (string | false)[][]
    flow?: GridDense
    gap?: TwinCssArray | [(string | number)]
    placeItems?: [PlaceItems, PlaceItems] | [PlaceItems]
    placeContent?: [PlaceContent, PlaceContent] | [PlaceContent]
}

interface ColumnsAndRows {
    repeat?: number | "auto-fill",
    template: (string | number | TwinCssArray)[],
    gap?: string | number
}

const defaultGrid = {
    gridTemplateColumns: "repeat(1,100%)",
    gridTemplateRows: "",
    gridTemplateAreas: "",
    gap: ""
};

export default defineComponent({
    name: "vl-container",
    props: {
        type: {
            type: String as PropType<LayoutType>,
            default: "flex"
        },
        grid: {
            type: Object as PropType<Grid>,
        }
    },
    setup(props, { slots }) {

        const classes: string[] = reactive([]);

        classes.push(`vl-container-${props.type}`);
        let gridStyle = reactive({ ...defaultGrid });

        const getGridColumnsAndRows: (param: ColumnsAndRows) => string
            = (param) => {
            let repeat = param.repeat ? param.repeat : "auto-fill";
            let template = "";
            for (let item of param.template) {
                if (["number", "string"].indexOf(typeof item) !== -1) {
                    template += getStrOrCssStr(item as string | number) + " ";
                } else {
                    const placeHolder1 = getStrOrCssStr((item as TwinCssArray)[0]);
                    const placeHolder2 = getStrOrCssStr((item as TwinCssArray)[1]);
                    template += `minmax(${placeHolder1}, ${placeHolder2})`;
                }
            }
            return `repeat(${repeat},${template})`;
        };

        const getGridArea: (p: (string | false)[][]) => string = (param) => {
            let result = "";
            for (let item of param) {
                result = result + `'${item.join(" ")}'`;
            }
            return result;
        };

        const getGridFlowClassName = (param: GridDense) => {
            if (param === "row" || param === "column") {
                return param;
            } else {
                return param.split(" ").join("-");
            }
        };

        const getGap = (gap: TwinCssArray | [(string | number)]) => {
            let result = "";
            for (let item of gap) {
                result = result + (typeof item === 'number' ? `${item}px` : item) + " ";
            }
            return result;
        };

        if (props.type === 'grid' && props.grid) {
            gridStyle.gridTemplateColumns = props.grid.columns ? getGridColumnsAndRows(props.grid.columns) : gridStyle.gridTemplateColumns;
            gridStyle.gridTemplateRows = props.grid.rows ? getGridColumnsAndRows(props.grid.rows) : "";
            gridStyle.gridTemplateAreas = props.grid.area ? getGridArea(props.grid.area) : "";
            if (props.grid.flow) classes.push(`vl-container-grid-flow-${getGridFlowClassName(props.grid.flow)}`);
            gridStyle.gap = props.grid.gap ? getGap(props.grid.gap) : "";
        }

        return () => (
            <div class={classes} style={{ ...gridStyle }}>
                {getSlot(slots)}
            </div>
        );
    }
});
</script>

<style lang="stylus" src="./container.styl"/>
