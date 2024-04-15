function analyzeWordForm(lexicon, mysteryWord) {
  // Preprocess the lexicon into separate categories
  const roots = lexicon.filter(item => item.type === 'root');
  const affixes = lexicon.filter(item => item.type === 'affix' || item.type === 'prefix');

  // Initialize an object to store the analysis result
  let analysis = {
    originalForm: mysteryWord,
    identifiedRoots: [],
    identifiedAffixes: [],
    unidentified: mysteryWord,
  };

  // Function to try and find a match for a segment in the word
  const findAndRemoveSegment = (word, segment) => {
    if (word.indexOf(segment) === 0) { // prefix or root at the beginning
      return word.slice(segment.length);
    } else if (word.endsWith(segment)) { // affix at the end
      return word.slice(0, -segment.length);
    }
    return word; // No match found
  };

  // Try to identify roots and affixes
  roots.forEach(root => {
    if (analysis.unidentified.includes(root.form)) {
      analysis.identifiedRoots.push(root);
      analysis.unidentified = findAndRemoveSegment(analysis.unidentified, root.form);
    }
  });

  affixes.forEach(affix => {
    if (analysis.unidentified.includes(affix.form)) {
      analysis.identifiedAffixes.push(affix);
      analysis.unidentified = findAndRemoveSegment(analysis.unidentified, affix.form);
    }
  });

  return analysis;
}

// Example usage
const lexicon = [
  { form: "un", gloss: "not", features: {}, type: "prefix" },
  { form: "happy", gloss: "joyful", features: {}, type: "root" },
  { form: "ness", gloss: "state of", features: {}, type: "affix" },
];

const mysteryWord = "unhappiness";

console.log(analyzeWordForm(lexicon, mysteryWord));


export {analyzeWordForm}