<template>
    <img alt="Vue logo" src="./assets/logo.png">

    <div style="margin-top: 20px">
        <vl-button ref="dropdown2">dropdown</vl-button>
        <vl-dropdown :trigger="dropdown2">
            <vl-list>
                <vl-list-item>
                    list item description
                </vl-list-item>
                <vl-list-item>
                    <template #title>
                        list item title
                    </template>
                    list item description
                </vl-list-item>
                <vl-list-item>
                    <template #title>
                        list item title
                    </template>
                    list item description
                    <template #extra>
                        list item extra
                    </template>
                </vl-list-item>
                <vl-list-item>
                </vl-list-item>
            </vl-list>
        </vl-dropdown>

        <vl-button shape="outline" ref="dropdown333">dropdown</vl-button>
        <vl-dropdown event="hover" :trigger="dropdown333">
            <vl-list>
                <vl-list-item>
                    list item description
                </vl-list-item>
                <vl-list-item>
                    <template #title>
                        list item title
                    </template>
                    list item description
                </vl-list-item>
                <vl-list-item>
                    <template #title>
                        list item title
                    </template>
                    list item description
                    <template #extra>
                        list item extra
                    </template>
                </vl-list-item>
                <vl-list-item>
                </vl-list-item>
            </vl-list>
        </vl-dropdown>

        <vl-button shape="outline" ref="dropdown3333">dropdown</vl-button>
        <vl-dropdown event="rClick" :trigger="dropdown3333">
            <vl-list>
                <vl-list-item>
                    list item description
                </vl-list-item>
                <vl-list-item>
                    <template #title>
                        list item title
                    </template>
                    list item description
                </vl-list-item>
                <vl-list-item>
                    <template #title>
                        list item title
                    </template>
                    list item description
                    <template #extra>
                        list item extra
                    </template>
                </vl-list-item>
                <vl-list-item>
                </vl-list-item>
            </vl-list>
        </vl-dropdown>

        <button style="display: inline-block">
            sdssssssssssssssss
            <vl-dropdown event="rClick">
                <vl-list>
                    <vl-list-item>
                        list item description
                    </vl-list-item>
                    <vl-list-item>
                        <template #title>
                            list item title
                        </template>
                        list item description
                    </vl-list-item>
                    <vl-list-item>
                        <template #title>
                            list item title
                        </template>
                        list item description
                        <template #extra>
                            list item extra
                        </template>
                    </vl-list-item>
                    <vl-list-item>
                    </vl-list-item>
                </vl-list>
            </vl-dropdown>
        </button>
    </div>

    <div>
        <vl-button @click="onclick" style="margin-right: 10px">button</vl-button>
        <vl-button color="primary" @click="onclick" style="margin-right: 10px">button</vl-button>
        <vl-button color="flamingo" @click="onclick" style="margin-right: 10px">button</vl-button>
        <vl-button @click="onclick" style="margin-right: 10px" shape="round">button</vl-button>
        <vl-button @click="onclick" style="margin-right: 10px" shape="circle">A</vl-button>
        <vl-button color="primary" @click="onclick" style="margin-right: 10px" shape="circle">A</vl-button>
        <vl-button color="flamingo" @click="onclick" style="margin-right: 10px" shape="circle">A</vl-button>
        <vl-button @click="onclick" disabled style="margin-right: 10px">button</vl-button>
        <vl-button @click="onclick" style="margin-right: 10px" shape="outline">button</vl-button>
        <vl-button color="primary" @click="onclick" style="margin-right: 10px" shape="outline">button</vl-button>
        <vl-button color="flamingo" @click="onclick" style="margin-right: 10px" shape="outline">button</vl-button>
        <vl-button @click="onclick" style="margin-right: 10px" shape="link">button</vl-button>
        <vl-button color="primary" @click="onclick" style="margin-right: 10px" shape="link">button</vl-button>
        <vl-button color="flamingo" @click="onclick" style="margin-right: 10px" shape="link">button</vl-button>
        <vl-button color="primary" @click="onclick" disabled style="margin-right: 10px" shape="link">button</vl-button>
    </div>

    <div style="margin-top: 10px">
        <vl-card style="margin-right: 10px">
            <div>card content</div>
            <div>card content</div>
            <div>card content</div>
        </vl-card>
        <vl-card style="margin-right: 10px">
            <template v-slot:header>
                card title
            </template>
            <div>card content</div>
            <div>card content</div>
            <div>card content</div>
            <template #actions>
                <div>action of card</div>
            </template>
        </vl-card>
        <vl-card style="margin-right: 10px" shadow="hover" :header-class="['test3','test4']"
                 :body-class="['test1','test2']" title="card title">
            <div>card content</div>
            <div>card content</div>
            <div>card content</div>
        </vl-card>
        <vl-card style="margin-right: 10px" shadow="always" :header-class="['test3','test4']"
                 :body-class="['test1','test2']" title="card title">
            <p>card content</p>
            <vl-card title="card title">
                <div>card content</div>
                <div>card content</div>
                <div>card content</div>
            </vl-card>
        </vl-card>
    </div>

    <div>
        <vl-tag style="margin-right: 10px">bilibili</vl-tag>
        <vl-tag style="margin-right: 10px" color="primary">测试</vl-tag>
        <vl-tag style="margin-right: 10px" color="flamingo">
            <span>bilibili</span><span>bilibili</span><span>bilibili</span></vl-tag>
        <vl-tag style="margin-right: 10px" type="hollow"><span>bilibili</span></vl-tag>
        <vl-tag style="margin-right: 10px" type="hollow" color="flamingo"><span>bilibili</span></vl-tag>
        <vl-tag style="margin-right: 10px" type="hollow" color="primary"><span>bilibili</span></vl-tag>
    </div>

    <div style="margin-top: 20px">
        <vl-list>
            <vl-list-item>
                list item description
            </vl-list-item>
            <vl-list-item>
                <template #title>
                    list item title
                </template>
                list item description
            </vl-list-item>
            <vl-list-item>
                <template #title>
                    list item title
                </template>
                list item description
                <template #extra>
                    list item extra
                </template>
            </vl-list-item>
            <vl-list-item>
            </vl-list-item>
        </vl-list>
    </div>

    <div style="margin-top: 20px">
        <vl-list>
            <vl-list-item>
                list item description
            </vl-list-item>
            <vl-list-item>
                <template #title>
                    list item title
                </template>
                list item description
            </vl-list-item>
            <vl-list-item>
                <template #title>
                    list item title
                </template>
                list item description
                <template #extra>
                    list item extra
                </template>
            </vl-list-item>
            <vl-list-item>
            </vl-list-item>
        </vl-list>
    </div>

    <div style="margin-top: 20px;display: flex;justify-content: space-between;position: relative">
        <vl-button shape="outline" ref="dropdown">dropdown</vl-button>
        <vl-dropdown event="rClick" :trigger="dropdown">
            <vl-list>
                <vl-list-item>
                    list item description
                </vl-list-item>
                <vl-list-item>
                    <template #title>
                        list item title
                    </template>
                    list item description
                </vl-list-item>
                <vl-list-item>
                    <template #title>
                        list item title
                    </template>
                    list item description
                    <template #extra>
                        list item extra
                    </template>
                </vl-list-item>
                <vl-list-item>
                </vl-list-item>
            </vl-list>
        </vl-dropdown>
        <vl-button ref="dropdown3">
            <span>
                dropdown
            </span>
            <vl-dropdown>
                <vl-list>
                    <vl-list-item>
                        list item description
                    </vl-list-item>
                    <vl-list-item>
                        <template #title>
                            list item title
                        </template>
                        list item description
                    </vl-list-item>
                    <vl-list-item>
                        <template #title>
                            list item title
                        </template>
                        list item description
                        <template #extra>
                            list item extra
                        </template>
                    </vl-list-item>
                    <vl-list-item>
                    </vl-list-item>
                </vl-list>
            </vl-dropdown>
        </vl-button>

        <button style="display: inline-block">
            sdssssssssssssssss
            <vl-dropdown event="rClick">
                <vl-list>
                    <vl-list-item>
                        list item description
                    </vl-list-item>
                    <vl-list-item>
                        <template #title>
                            list item title
                        </template>
                        list item description
                    </vl-list-item>
                    <vl-list-item>
                        <template #title>
                            list item title
                        </template>
                        list item description
                        <template #extra>
                            list item extra
                        </template>
                    </vl-list-item>
                    <vl-list-item>
                    </vl-list-item>
                </vl-list>
            </vl-dropdown>
        </button>


    </div>

    <vl-container type="grid" :grid="gridConfig">
        <div style="grid-column-start: 1;grid-column-end: 2">1</div>
        <div style="grid-column-start: 1;grid-column-end: 2">2</div>
        <div>3</div>
        <div>
            <div>4</div>
            <div>4</div>
            <div>4</div>
        </div>
    </vl-container>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Grid } from "@/components/container/container.vue";

export default defineComponent({
    name: 'App',
    components: {},
    setup() {
        const onclick = (e: MouseEvent) => {
            console.log(e);
        };

        const dropdown = ref();
        const dropdown2 = ref();
        const dropdown3 = ref();
        const dropdown333 = ref();
        const dropdown3333 = ref();

        const gridConfig: Grid = {
            columns: {
                template: [[100, "30%"], [200, "70%"]],
                autoTemplate: [[100, 200], "50%"]
            },
            area: [["a", "a"], ["b", "b"]],
            flow: "row dense",
            gap: [20, 0],
            placeItems: ['end', 'center'],
            placeContent: ['end', 'start']
        };

        return {
            onclick,
            dropdown,
            dropdown2, dropdown3, dropdown333, dropdown3333,
            gridConfig
        };
    },
});
</script>

<style lang="stylus">
#app
    padding 0 100px
</style>
