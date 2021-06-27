import { Plugin } from 'vue';
import Card from './card.vue';
import Fower from '@fower/vue';

export default {
    install: (app, options) => {
        app.use(Fower as unknown as Plugin);
        app.component(Card.name, Card);
    }
} as Plugin;
