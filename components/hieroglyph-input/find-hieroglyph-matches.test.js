import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import {hieroglyphDb} from '../../data/hieroglyphs-db.js'
import { findHieroglyphMatches } from './find-hieroglyph-matches.js';



// Override your database with mock data for testing
hieroglyphDb.hieroglyphs = mockHieroglyphDb.hieroglyphs;

Deno.test('findHieroglyphMatches returns exact matches', () => {
  const query = 'vulture';
  const expected = [{ hieroglyph: 'A1', description: 'vulture', gardiner: 'G1' }];
  assertEquals(findHieroglyphMatches(query), expected);
});

Deno.test('findHieroglyphMatches returns partial matches', () => {
  const query = 're';
  const expected = [{ hieroglyph: 'B1', description: 'reed', gardiner: 'G2' }];
  assertEquals(findHieroglyphMatches(query), expected);
});

Deno.test('findHieroglyphMatches returns empty array when there are no matches', () => {
  const query = 'unknown';
  assertEquals(findHieroglyphMatches(query), []);
});

Deno.test('findHieroglyphMatches handles queries with white spaces', () => {
  const query = '  reed ';
  const expected = [{ hieroglyph: 'B1', description: 'reed', gardiner: 'G2' }];
  assertEquals(findHieroglyphMatches(query), expected);
});

