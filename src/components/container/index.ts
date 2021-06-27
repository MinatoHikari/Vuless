import { Plugin } from 'vue';
import Container from './container.vue';
import ContainerItem from './container-item/container-item.vue';
import Fower from '@fower/vue';

export default {
    install: (app, options) => {
        app.use(Fower as unknown as Plugin);
        app.component(Container.name, Container);
        app.component(ContainerItem.name, ContainerItem);
    }
} as Plugin;
