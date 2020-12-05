import { createApp } from 'vue';
import 'normalize.css';
import App from './App.vue';
import button from './components/button/button.vue';
import card from './components/card/card.vue';
import tag from './components/tag/tag.vue';
import list from './components/list/list.vue';
import listItem from './components/list/list-item/list-item.vue';
import dropdown from './components/dropdown/dropdown.vue';
import container from './components/container/container.vue';
import containerItem from './components/container/container-item/container-item.vue';
import carousel from './components/carousel/carousel.vue';
import icon from './components/icon/icon.vue';

import Message from "./components/message/message";

const app = createApp(App);

app.component(button.name, button)
    .component(card.name, card)
    .component(tag.name, tag)
    .component(list.name, list)
    .component(dropdown.name, dropdown)
    .component(listItem.name, listItem)
    .component(container.name, container)
    .component(containerItem.name, containerItem)
    .component(carousel.name, carousel)
    .component(icon.name, icon)
    .use(Message)
    .mount('#app');
