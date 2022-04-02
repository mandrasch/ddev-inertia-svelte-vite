
/*import '../css/app.css';

import { createInertiaApp } from '@inertiajs/inertia-svelte'

createInertiaApp({
    resolve: async name => await import(`./Pages/${name}.svelte`),
    setup({ el, App, props }) {
        new App({ target: el, props })
    },
})

// Test - watch doesn get triggered by vite?
alert('hello vite 12345678910?!');*/

import { createInertiaApp } from '@inertiajs/inertia-svelte'

// https://laravel-vite.dev/guide/extra-topics/inertia.html#example-implementation
/**
 * Imports the given page component from the page record.
 */
 function resolvePageComponent(name: string, pages: Record<string, any>) {
    for (const path in pages) {
      if (path.endsWith(`${name.replace('.', '/')}.svelte`)) {
        return typeof pages[path] === 'function'
          ? pages[path]()
          : pages[path]
      }
    }

    throw new Error(`Page not found: ${name}`)
  }

  // Creates the Inertia app, nothing fancy.
  createInertiaApp({
    resolve: (name) => resolvePageComponent(name, import.meta.glob('Pages/**/*.svelte')),
    setup({ el, app, props, plugin }) {
      createApp({ render: () => h(app, props) })
        .use(plugin)
        .mount(el)
    },
  })
