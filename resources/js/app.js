
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/inertia-svelte'

createInertiaApp({
    resolve: async name => await import(`./Pages/${name}.svelte`),
    setup({ el, App, props }) {
        new App({ target: el, props })
    },
})
