import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import store from './store';

// monaco editor

import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor';

// globally available components


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(store)
            .use(VueMonacoEditorPlugin, {
                paths: {
                    // The recommended CDN config
                    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
                  },
            })
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
