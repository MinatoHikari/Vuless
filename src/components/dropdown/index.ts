import { Plugin } from 'vue';
import Dropdown from './dropdown.vue';
import Fower from '@fower/vue';

export default {
    install: (app, options) => {
        app.use(Fower as unknown as Plugin);
        app.component(Dropdown.name, Dropdown);
    }
} as Plugin;
