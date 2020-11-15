<script lang="tsx">
import { defineComponent, PropType, reactive, provide, ref, Ref, watchEffect } from "vue";
import { getSlot, getStrOrCssStr } from '@/utils/tools';

export type LayoutType = "flex" | "grid"
export type TwinCssArray = [(string | number), (string | number)]
export type GridDense = "row" | "column" | "row dense" | "column dense"
export type PlaceItems = "start" | "end" | "center" | "stretch"
export type PlaceContent = PlaceItems | "space-around" | "space-between" | "space-evenly";

export interface Grid {
    columns?: ColumnsAndRows
    rows?: ColumnsAndRows
    area?: (string | false)[][]
    flow?: GridDense
    gap?: TwinCssArray | [(string | number)]
    placeItems?: [PlaceItems, PlaceItems] | [PlaceItems]
    placeContent?: [PlaceContent, PlaceContent] | [PlaceContent]
}

export interface ColumnsAndRows {
    repeat?: number | "auto-fill",
    template: (string | number | TwinCssArray)[],
    autoTemplate?: (string | number | TwinCssArray)[],
    gap?: string | number
}

export interface ContainerGridStyles {
    gridTemplateColumns?: string,
    gridTemplateRows?: string,
    gridTemplateAreas?: string,
    gap?: string,
    gridAutoColumns?: string,
    gridAutoRows?: string
}

const defaultGrid = {
    gridTemplateColumns: "repeat(1,100%)",
    gridTemplateRows: "",
    gridTemplateAreas: "",
    gap: "",
    gridAutoColumns: "",
    gridAutoRows: ""
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

        let classes: string[] = reactive([]);

        const typeRef = ref(props.type);
        provide("layoutType", typeRef);

        let typeClass = `vl-container-${props.type}`;
        let gridStyle: ContainerGridStyles = reactive({});

        const getTemplate = (template: (string | number | TwinCssArray)[],) => {
            let result = "";
            for (let item of template) {
                if (["number", "string"].indexOf(typeof item) !== -1) {
                    result += getStrOrCssStr(item as string | number) + " ";
                } else {
                    const placeHolder1 = getStrOrCssStr((item as TwinCssArray)[0]);
                    const placeHolder2 = getStrOrCssStr((item as TwinCssArray)[1]);
                    result += `minmax(${placeHolder1}, ${placeHolder2})`;
                }
            }
            return result;
        };

        const getGridColumnsAndRows: (param: ColumnsAndRows) => string
            = (param) => {
            let repeat = param.repeat ? param.repeat : "auto-fill";
            const template = getTemplate(param.template);
            return `repeat(${repeat},${template})`;
        };

        const getGridAutoColumnsAndRows: (param: ColumnsAndRows) => string = (param) => {
            return param.autoTemplate ? getTemplate(param.autoTemplate) : "";
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

        const getPlaceItems = (param: [PlaceItems, PlaceItems] | [PlaceItems]) => {
            if (param.length === 2) {
                classes.push(`vl-container-grid-place-items-${param[0]}-${param[1]}`);
            } else {
                classes.push(`vl-container-grid-place-items-${param[0]}`);
            }
        };

        const getPlaceContent = (param: [PlaceContent, PlaceContent] | [PlaceContent]) => {
            if (param.length === 2) {
                classes.push(`vl-container-grid-place-content-${param[0]}-${param[1]}`);
            } else {
                classes.push(`vl-container-grid-place-content-${param[0]}`);
            }
        };

        const getAllStyles = () => {
            classes = [];
            gridStyle = {};
            if (props.type === 'grid' && props.grid) {
                gridStyle = { ...defaultGrid };
                gridStyle.gridTemplateColumns = props.grid.columns ? getGridColumnsAndRows(props.grid.columns) : gridStyle.gridTemplateColumns;
                gridStyle.gridTemplateRows = props.grid.rows ? getGridColumnsAndRows(props.grid.rows) : "";
                gridStyle.gridTemplateAreas = props.grid.area ? getGridArea(props.grid.area) : "";
                gridStyle.gridAutoColumns = props.grid.columns ? getGridAutoColumnsAndRows(props.grid.columns) : "";
                gridStyle.gridAutoRows = props.grid.rows ? getGridAutoColumnsAndRows(props.grid.rows) : "";
                if (props.grid.flow) classes.push(`vl-container-grid-flow-${getGridFlowClassName(props.grid.flow)}`);
                if (props.grid.placeItems) getPlaceItems(props.grid.placeItems);
                if (props.grid.placeContent) getPlaceContent(props.grid.placeContent);
                gridStyle.gap = props.grid.gap ? getGap(props.grid.gap) : "";
            }
        };

        getAllStyles();

        const watchGridProp = watchEffect(() => {
            const type = props.type;
            typeClass = `vl-container-${type}`;
            getAllStyles();
            typeRef.value = type;
        });

        return () => (
            <div class={[typeClass, ...classes]} style={{ ...gridStyle }}>
                {getSlot(slots)}
            </div>
        );
    }
});
</script>

<style lang="stylus" src="./container.styl"/>
