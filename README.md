# Svelte Supabase Lazy Image

Downloading images is expensive. Especially on mobile devices where data limits might be tight. Regular lazy loading does not work with Supabase as images are downloaded differently from usual. This package adds lazy loading to Supabase images and stores them in a Svelte store so any re-requests do not need to be re-downloaded. Images are lazy-loaded if they are half a viewport height away, resulting in minimal pop-in.

### Installation

Install using Yarn or NPM.
```
yarn add svelte-supabase-lazy-images
```
```
npm install --save svelte-supabase-lazy-images
```

Include in your app.
```
import { SupabaseLazyImage, supabaseImages, getSupabaseImage } from "svelte-supabase-lazy-images"
```

### Usage

The main component `SupabaseLazyImage` needs a couple of props to function correctly.

```
<SupbaseLazyImage
  { supabase }
  { from }
  { key } />
```

`supabase` Is your Supabase object that you have imported in the component (e.g `import supabase from "$lib/db"`).
`from` Is the bucket the file is from.
`key` Is the key or path to your image that you may have saved. You may need to manually remove the bucket from the key using something like (`key.split(from + "/")[1]`), but that depends on how you saved the image.

You can add any additional props you like to this image as if it was a regular HTML element.

```
<SupbaseLazyImage
  { supabase }
  { from }
  { key }
  height=50
  width=100
  alt="Alt text"
  class="some class" />
```

The result is saved to a store using the key, this store is used to later requests. If the same image is requested multiple times it's gotten from the store instead of redownloading the image. This store can be access using `supabaseImages`. You may access the urls to the image using `$supabaseImages[key]`.

You can also manually trigger an upload using `await getSupabaseImage(supabase, from, key)`
