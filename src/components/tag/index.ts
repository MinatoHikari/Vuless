import { Plugin } from 'vue';
import Tag from './tag.vue';
import Fower from '@fower/vue';

export default {
    install: (app, options) => {
        app.use(Fower as unknown as Plugin);
        app.component(Tag.name, Tag);
    }
} as Plugin;
