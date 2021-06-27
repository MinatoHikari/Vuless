import { Plugin } from 'vue';
import Button from './button.vue';
import Fower from '@fower/vue';

export default {
    install: (app, options) => {
        app.use(Fower as unknown as Plugin);
        app.component(Button.name, Button);
    }
} as Plugin;
