import {transliterate} from './transliterate.js'
import { 
  equal,
  assert,
  assertEquals,
  assertNotEquals,
  assertStrictEquals,
  assertStringIncludes,
  assertMatch,
  assertNotMatch,
  assertArrayIncludes,
  assertObjectMatch,
  assertThrows,
  assertThrowsAsync } from "https://deno.land/std@0.95.0/testing/asserts.ts"


Deno.test("transliterate aaa AAA", () => 
  assertEquals(
    transliterate(
      'aaa', 
      [{lower: "a", upper: "A"}],
      "lower",
      "upper"
    ),
    "AAA"
  )
)

 
Deno.test("transliterate cha qa", () => 
assertEquals(
  transliterate(
    'cha', 
    [{from: "ch", to: "q"}],
    "from",
    "to"
  ),
  "qa"
)
)