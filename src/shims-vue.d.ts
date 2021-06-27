declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'vue-inline-svg' {
    import InlineSvg from 'vue-inline-svg';

    const vueInlineSvg: any;

    export default vueInlineSvg;
}
