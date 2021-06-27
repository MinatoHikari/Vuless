import Button from './button/index';
import Card from './card/index';
import Carousel from './carousel/index';
import Container from './container/index';
import Dropdown from './dropdown/index';
import List from './list/index';
import Message from './message/message';
import Tag from './tag/index';
import { Plugin } from 'vue';
import Fower from '@fower/vue';

export default {
    install: (app) => {
        app.use(Fower as unknown as Plugin)
            .use(Button)
            .use(Card)
            .use(Carousel)
            .use(Container)
            .use(Dropdown)
            .use(List)
            .use(Message)
            .use(Tag);
    }
} as Plugin;
