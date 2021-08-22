import { writable } from "svelte/store"

export const supabaseImages = writable({})

export async function getSupabaseImage(supabase, from, key) {
  const { data, error } = await supabase
  .storage
  .from(from)
  .download(key)

  if (error) throw error
  
  return data
}
