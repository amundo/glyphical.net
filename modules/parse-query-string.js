// parse-query.js

import { hieroglyphDb as db } from "../data/hieroglyphical-db.js";

let abbreviations = [
  { shortCut: 'd', term: 'description' },
  { shortCut: 'c', term: 'category' },
  { shortCut: 'g', term: 'gardiner' },
  { shortCut: 'm', term: 'mdc' },
  { shortCut: 'h', term: 'hieroglyph' },
  { shortCut: 'u', term: 'unicode' },
  { shortCut: 'l', term: 'literal' },
];

let isGardinerCode = (token) => {
  return token.match(/^[A-Z]\d{1,3}[A-Z]*$/);
};

let isMdcCode = (token) => {
  return false;
};

let isUnicodeCode = (token) => {
  return token.match(/^U\+[0-9A-F]{4,5}$/);
};

let isCategory = (token) => {
  return db.categories.includes(token);
};

let isHieroglyph = (token) => {
  let match = token.match(/\p{sc=Egyptian_Hieroglyphs}/u);
  if (match) {
    return true;
  } else {
    return false;
  }
};

let isLiteralType = (token) => {
  return ['uniliteral', 'biliteral', 'triliteral'].includes(token);
};

let guessToken = (token) => {
  switch (true) {
    case isGardinerCode(token):
      return ['gardiner', token];
    case isLiteralType(token):
      return ['literal', token];
    case isHieroglyph(token):
      console.log(token);
      return ['hieroglyph', token];
    case isMdcCode(token):
      return ['mdc', token];
    case isUnicodeCode(token):
      return ['unicode', token];
    case isCategory(token):
      return ['category', token];
    default:
      return ['description', token];
  }
};

let wasguessToken = (token) => {
  if (isGardinerCode(token)) {
    return ['gardiner', token];
  }

  if (isLiteralType(token)) {
    return ['literal', token];
  }

  if (isHieroglyph(token)) {
    console.log(token);
    return ['hieroglyph', token];
  }

  if (isMdcCode(token)) {
    return ['mdc', token];
  }

  if (isUnicodeCode(token)) {
    return ['unicode', token];
  }

  if (isCategory(token)) {
    return ['category', token];
  }

  return ['description', token];
};

let containsTwoSlashes = (token) => {
  return token.split('/').length == 3;
};

let isRegexpNotation = (token) => {};

let parseRegexpNotation = (token) => {
  let [source, flags] = token.split('/').slice(1);
  return new RegExp(source, flags);
};

let parseToken = (token) => {
  if (token.includes(':')) {
    let [label, value] = token.split(':').map((x) => x.trim());

    label = label.toLowerCase();

    const abbreviation = abbreviations.find((abbr) => abbr.shortCut === label);
    if (abbreviation) {
      label = abbreviation.term;
    }

    if (value.startsWith('/') && value.endsWith('/')) {
      value = parseRegexpNotation(value);
      return [label, value];
    }

    return [label, value];
  } else {
    let guess = guessToken(token);
    if (guess) {
      return guess;
    }
  }

  return ['description', token];
};

let parseQueryString = (queryString) => {
  let tokens = queryString
    .split(/\p{White_Space}+/u)
    .map((x) => x.trim())
    .filter(Boolean);

    let entries = tokens.map(parseToken);
    console.table(entries)

  return entries;
};

export { parseQueryString };
