<template>
    <img alt="Vue logo" src="./assets/logo.png">
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
        </vl-card>
        <vl-card style="margin-right: 10px" hoverable :header-class="['test3','test4']" :body-class="['test1','test2']" title="card title">
            <div>card content</div>
            <div>card content</div>
            <div>card content</div>
        </vl-card>
        <vl-card style="margin-right: 10px" hoverable :header-class="['test3','test4']" :body-class="['test1','test2']" title="card title">
            <div>card content</div>
            <vl-card title="card title">
                <div>card content</div>
                <div>card content</div>
                <div>card content</div>
            </vl-card>
        </vl-card>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    components: {},
    setup() {
        const onclick = (e: MouseEvent) => {
            console.log(e)
        }
        return {
            onclick
        }
    }
});
</script>

<style>
</style>
