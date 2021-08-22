<script>
  import { onMount } from "svelte"

  import { supabaseImages, getSupabaseImage } from "./stores/supabaseImages"

  export let supabase
  export let from
  export let key

  let src
  let loadingInitiated = false

  let element

  onMount(lazyLoad)

  function lazyLoad() {
    if (!key || loadingInitiated) return
    if (element.getBoundingClientRect().top - window.innerHeight > window.innerHeight / 2) return

    getImage()
  }

  async function getImage() {
    loadingInitiated = true

    if ($supabaseImages[key]) {
      src = $supabaseImages[key]
      return
    }

    try {
      const data = await getSupabaseImage(supabase, from, key)

      src = URL.createObjectURL(data)
      $supabaseImages[key] = src
    } catch (error) {
      console.error(error)
    }
  }

  // Fallback for parsers to prevent errors. This doesn't do anything in modern browsers.
  function noOp () { }
  if (typeof URL.createObjectURL === "undefined") { 
    Object.defineProperty(URL, "createObjectURL", { value: noOp })
  }
</script>



<svelte:window on:scroll={ lazyLoad } />



<!-- svelte-ignore a11y-missing-attribute -->
<img
  bind:this={ element }
  { src }
  { ...$$restProps } />
