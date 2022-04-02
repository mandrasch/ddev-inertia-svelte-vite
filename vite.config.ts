import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import laravel from "vite-plugin-laravel";

export default defineConfig({
    plugins: [svelte(), laravel()],

    // https://github.com/iammati/vite-ddev
    base: '/dist/',

    // https://github.com/iammati/vite-ddev/blob/master/app/frontend/vite.config.ts
    // HMR server-port which is exposed by DDEV-Local in .ddev/docker-compose.hmr.yaml
   server: {
       host: '0.0.0.0', // listen to all adresses https://vitejs.dev/config/#server-host
        port: 3000,
        watch: {
            usePolling: true
        }
    }
});

