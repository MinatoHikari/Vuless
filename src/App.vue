<template>
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
        <sd-button @click="onclick" style="margin-right: 10px">button</sd-button>
        <sd-button color="primary" @click="onclick" style="margin-right: 10px">button</sd-button>
        <sd-button @click="onclick" style="margin-right: 10px" shape="round">button</sd-button>
        <sd-button @click="onclick" style="margin-right: 10px" shape="circle">A</sd-button>
        <sd-button color="primary" @click="onclick" style="margin-right: 10px" shape="circle">A</sd-button>
        <sd-button @click="onclick" disabled style="margin-right: 10px">button</sd-button>
        <sd-button color="primary" @click="onclick" disabled style="margin-right: 10px">button</sd-button>
        <sd-button @click="onclick" style="margin-right: 10px" shape="outline">button</sd-button>
        <sd-button color="primary" @click="onclick" style="margin-right: 10px" shape="outline">button</sd-button>
        <sd-button @click="onclick" style="margin-right: 10px" shape="link">button</sd-button>
        <sd-button color="primary" @click="onclick" style="margin-right: 10px" shape="link">button</sd-button>
        <sd-button color="primary" @click="onclick" disabled style="margin-right: 10px" shape="link">button</sd-button>
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
