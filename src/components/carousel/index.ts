import { Plugin } from 'vue';
import Carousel from './carousel.vue';
import Fower from '@fower/vue';

export default {
    install: (app, options) => {
        app.use(Fower as unknown as Plugin);
        app.component(Carousel.name, Carousel);
    }
} as Plugin;
