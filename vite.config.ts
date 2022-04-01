import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import laravel from "vite-plugin-laravel";

export default defineConfig({
    plugins: [svelte(), laravel()],
    // https://github.com/iammati/vite-ddev/blob/master/app/frontend/vite.config.ts
    // HMR server-port which is exposed by DDEV-Local in .ddev/docker-compose.hmr.yaml
    server: {
       //  host: 'experimental-inertia-svelte-vite.ddev.site', // https://laravel-vite.dev/guide/essentials/development.html#changing-the-host
        port: 3000,

        watch: {
            usePolling: true
        }
    }
});

