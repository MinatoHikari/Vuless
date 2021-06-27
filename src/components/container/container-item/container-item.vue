<script lang="tsx">
import { defineComponent, PropType, reactive, inject, ref, Ref, watch } from "vue";
import { getSlot } from "@/utils/tools";
import { TwinCssArray, LayoutType, PlaceItems, PlaceContent } from "@/components/container/container.vue";

export type GridColumnAndRow = [(string | number)] | TwinCssArray
export type GridPlaces = [PlaceItems, PlaceItems] | [PlaceItems]

export interface ContainerItemGridStyles {
    gridColumn?: string,
    gridRow?: string,
    gridArea?: string,
}

const defaultGrid = {
    gridColumn: "",
    gridRow: "",
};

export default defineComponent({
    name: "vl-container-item",
    props: {
        gridColumn: {
            type: Object as PropType<GridColumnAndRow>
        },
        gridRow: {
            type: Object as PropType<GridColumnAndRow>
        },
        area: {
            type: String
        },
        place: {
            type: Object as PropType<GridPlaces>
        }
    },
    inject: ["layoutType"],
    setup(props, { slots }) {

        let classes: string[] = reactive([]);
        let gridStyle: ContainerItemGridStyles = reactive({});

        const typeRef: Ref<LayoutType> = ref("flex");
        const type: Ref<LayoutType> = inject("layoutType", typeRef);

        watch(type, () => {
            console.log(type.value);
            getAllStyles();
        });

        const getString = (param: string | number) => {
            return typeof param === "number" ? param.toString() : param;
        };

        const getColumnAndRow = (param: GridColumnAndRow) => {
            let result: string = "";
            if (param.length === 1) {
                result = getString(param[0]);
            } else {
                result = `${getString(param[0])} / ${getString(param[1])}`;
            }
            return result;
        };

        const getPlaceItem = (param: GridPlaces) => {
            if (param.length === 2) {
                classes.push(`vl-container-item-grid-place-${param[0]}-${param[1]}`);
            } else {
                classes.push(`vl-container-item-grid-place-${param[0]}`);
            }
        };

        const getAllStyles = () => {
            classes = [];
            gridStyle = {};
            if (type.value === "grid") {
                gridStyle = { ...defaultGrid };
                gridStyle.gridColumn = props.gridColumn ? getColumnAndRow(props.gridColumn) : "";
                gridStyle.gridRow = props.gridRow ? getColumnAndRow(props.gridRow) : "";
                if (props.area) gridStyle.gridArea = props.area;
                if (props.place) getPlaceItem(props.place);
                console.log(gridStyle);
            }
        };

        getAllStyles();

        return () => (
            // <div class={classes} style={{ ...gridStyle }}>
            //     {getSlot(slots)}
            // </div>
            <div class={classes}>
                {getSlot(slots)}
            </div>
        );
    }
});
</script>

<style src="./container-item.scss" lang="scss"/>
