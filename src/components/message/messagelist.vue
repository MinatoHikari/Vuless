<template>
    <div>
        <transition-group name="message" move-class="message-move">
            <div :style="{top:`${(refList[i]?refList[i].offsetHeight:0)*i-1}px`}" v-for="(item,i) in dataList"
                 :key="item.key" style="transition: all 0.8s ease;position: fixed"
                 :ref="el=>{if (el) refList[i] = el}">
                <message @close="onMessageClose" :keyIndex="item.key" :duration="item.duration" :content="item.message"
                ></message>
            </div>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, getCurrentInstance, onMounted, reactive, ref, Ref, watchEffect } from 'vue';
import Message from "./message.vue";
import { Configs } from "./message";

export default defineComponent({
    name: "vl-message-list",
    components: {
        message: Message
    },
    props: {
        source: {
            type: Array as PropType<Configs[]>,
            default: () => []
        },
        onMessageStatesChange: {
            type: Function
        }
    },
    setup(props) {
        const instance = getCurrentInstance();

        const onMessageClose = (index: number) => {
            props.onMessageStatesChange ? props.onMessageStatesChange(index) : "";
            for (let i = 0; i < dataList.value.length; i++) {
                if (dataList.value[i].key === index) {
                    dataList.value.splice(i, 1);
                }
            }
        };

        const refList = ref([]);

        let dataList: Ref<Configs[]> = ref([]);

        watch(props.source, (val) => {
            dataList.value = val;
            for (let item of dataList.value) {
                console.log(item.key);
            }
        }, { deep: true });

        // watchEffect(() => {
        //     console.log(dataList.value);
        //     console.log(refList);
        // });

        return {
            onMessageClose,
            dataList,
            refList
        };
    }
});
</script>

<style scoped>

</style>
