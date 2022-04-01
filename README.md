## How was this created?

**DDEV Laravel Composer Quickstart**

```
mkdir my-laravel-app
cd my-laravel-app
ddev config --project-type=laravel --docroot=public --create-docroot
ddev start
ddev composer create --prefer-dist laravel/laravel
ddev exec "cat .env.example | sed  -E 's/DB_(HOST|DATABASE|USERNAME|PASSWORD)=(.*)/DB_\1=db/g' > .env"
ddev exec "php artisan key:generate"
ddev launch
```

See: https://ddev.readthedocs.io/en/stable/users/cli-usage/#laravel-composer-setup-example

**Inertia**

```
ddev composer require inertiajs/inertia-laravel
```

Add root template (create `resources/views/app.blade.php` and paste code from https://inertiajs.com/server-side-setup. Create middleware:

```
ddev artisan inertia:middleware
```

and add this as last item to `app/Http/Kernel.php`:

```
'web' => [
    // ...
    \App\Http\Middleware\HandleInertiaRequests::class,
],
```

Next - client side setup (https://inertiajs.com/client-side-setup):

```
ddev exec npm install @inertiajs/inertia @inertiajs/inertia-svelte
ddev exec npm install laravel-mix-svelte
```

Add _laravel-mix-svelte_ to `webpack.mix.js`:

```javascript
const mix = require("laravel-mix");
require("laravel-mix-svelte");

mix.js("resources/js/app.js", "public/js")
    .postCss("resources/css/app.css", "public/css", [
        //
    ])
    .svelte({
        dev: !mix.inProduction(),
    })
    .webpackConfig({
        output: { chunkFilename: "js/[name]. js? id = [chunkhash]" },
    })
    .version(); // cache busting
```

Overwrite `resources/js/app.js` with

```javascript
import { createInertiaApp } from "@inertiajs/inertia-svelte";

createInertiaApp({
    resolve: (name) => require(`./Pages/${name}.svelte`),
    setup({ el, App, props }) {
        new App({ target: el, props });
    },
});
```

Create a page, e.g. `resources/js/Pages/Welcome.svelte`

```
<script>
  let user = 'Svelte Testperson';
</script>

<svelte:head>
   <title>Welcome</title>
</svelte:head>

<h1>Welcome</h1>
<p>Hello {user}, welcome to your first Inertia app!</p>

```
