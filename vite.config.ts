import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import laravel from "vite-plugin-laravel";
import { resolve } from 'path'

const production = process.env.NODE_ENV === 'production'

console.log('out dir',resolve(__dirname, 'public/dist'))

export default defineConfig({
    plugins: [svelte(), laravel()],

    root: '',

    // https://github.com/iammati/vite-ddev
    base: '/dist/',


    // https://sebastiandedeyne.com/vite-with-laravel/

    // publicDir: 'fake_dir_so_nothing_gets_copied',
    build: {
        bundle: production,
        minify: production,
        outDir: resolve(__dirname, 'public/dist'),

        target: 'esnext',

        emptyOutDir: true,
        manifest: true,
        sourcemap: true,

        rollupOptions: {
            input: './resources/js/app.ts',
        },

        watch: {
            include: './resources/**'
        },
    },

    // https://github.com/iammati/vite-ddev/blob/master/app/frontend/vite.config.ts
    // HMR server-port which is exposed by DDEV-Local in .ddev/docker-compose.hmr.yaml
   server: {
       host: '0.0.0.0', // listen to all adresses https://vitejs.dev/config/#server-host
        port: 3000,
        /*watch: {
            usePolling: true // https://github.com/vitejs/vite/issues/1153#issuecomment-785467271
        }*/
    },

    resolve: {
        alias: {
          '@': resolve('./resources/js'),
        },
      },
});

