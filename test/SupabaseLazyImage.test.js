import "jsdom-global/register"
import { render } from "@testing-library/svelte"

import SupabaseLazyImage from "../src/SupabaseLazyImage.svelte"

jest.mock("../src/stores/supabaseImages.js", () => ({
  getSupabaseImage: () => ({ data: "test" })
}))

test("Image should be rendered and have all given attributes", async() => {
  render(SupabaseLazyImage, { key: "test", from: "group", supabase: {}, alt: "Alt value", class: "test-class" })

  const element = document.querySelector("img")

  expect(element).toBeInTheDocument()
  expect(element).toHaveAttribute("alt", "Alt value")
  expect(element).toHaveAttribute("class", "test-class")
})
