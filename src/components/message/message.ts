import { App, createApp, h, nextTick, getCurrentInstance, ComponentPublicInstance } from 'vue';
import Message from "./message.vue";
import MessageList from "./messagelist.vue";

export interface CreateConfigs {
    container?: string | Element,
    duration?: number
    message: string
}

export interface Configs extends CreateConfigs {
    key?: number
}

let isMounted = false;
// let timeout: number = 0;
let index = 0;
let messageContainer: null | App<Element> = null;
let rootComponent: ComponentPublicInstance;

const createMsg = (configs?: CreateConfigs) => {
    // if (timeout) clearTimeout(timeout);
    const time: number = configs && configs.duration ? configs.duration : 2000;
    index++;

    if (!messageContainer) {
        messageContainer = createApp({
            data() {
                return {
                    messageList: []
                } as {
                    messageList: Configs[]
                };
            },
            methods: {
                addMessage() {
                    ((rootComponent as ComponentPublicInstance).$data as {
                        messageList: Configs[]
                    }).messageList.push({
                        duration: time,
                        message: configs?.message || "",
                        ...configs,
                        key: index
                    });
                    console.log(rootComponent.$data);
                }
            },
            render() {
                return h(MessageList, {
                    source: this.$data.messageList, onMessageStatesChange: (index: number) => {
                        console.log("message-close:", index);
                        const arr = this.$data.messageList;
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].key === index) {
                                arr.splice(i, 1);
                            }
                        }
                    }
                }, {});
            }
        }, {});
    }

    let container: string | Element = "#vl-message-box";

    if (!configs || !configs.container) {
        if (!document.getElementById("vl-message-box")) {
            container = document.createElement("div");
            container.id = "vl-message-box";
            document.body.append(container);
        }
    } else {
        container = configs.container;
    }

    if (!isMounted) {
        rootComponent = messageContainer.mount(container);
        rootComponent.$options.methods.addMessage();
        isMounted = true;
    } else {
        // console.log(rootComponent.$options.methods);
        rootComponent.$options.methods.addMessage();
    }

};

export interface Message {
    create: (configs?: CreateConfigs) => void
}

const vlMessage: Message = {
    create: createMsg
};

export default {
    install: (app: App, options: any) => {
        app.config.globalProperties.$vlMessage = vlMessage;
    }
};

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $vlMessage: Message;
    }
}

