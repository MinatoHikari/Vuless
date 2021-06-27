import { Plugin } from 'vue';
import List from './list.vue';
import ListItem from './list-item/list-item.vue';
import Fower from '@fower/vue';

export default {
    install: (app, options) => {
        app.use(Fower as unknown as Plugin);
        app.component(List.name, List);
        app.component(ListItem.name, ListItem);
    }
} as Plugin;
