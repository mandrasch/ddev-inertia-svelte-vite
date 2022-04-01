import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import laravel from "vite-plugin-laravel";

export default defineConfig({
    plugins: [svelte(), laravel()],
});
