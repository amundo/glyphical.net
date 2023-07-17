import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { parseQueryString } from "./parse-query-string.js"
let db = await import("../data/hieroglyphical-db.js")


Deno.test("jackal ['description', 'jackal']", () => {
  let input = "jackal"
  let expected = [["description", "jackal"]]

  let actual = parseQueryString(input)
  assertEquals(actual, expected)
})


Deno.test("gardiner:Y3 ['gardiner', 'Y3']", () => {
  let input = "gardiner:Y3"
  let expected = [["gardiner", "Y3"]]

  let actual = parseQueryString(input)
  assertEquals(actual, expected)
})

Deno.test("g:Y3 => ['gardiner', 'Y3']", () => {
  let input = "gardiner:Y3"
  let expected = [["gardiner", "Y3"]]

  let actual = parseQueryString(input)
  assertEquals(actual, expected)
})

Deno.test("description:/house/i ['description', /house/i]", () => {
  let input = "description:/house/i"
  let expected = [["description", /house/i]]

  let actual = parseQueryString(input)
  assertEquals(actual, expected)
})