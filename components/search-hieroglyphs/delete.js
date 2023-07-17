function findHieroglyphsForPercentageThreshold(frequencyIndex, threshold) {
  const sortedHieroglyphs = Object.entries(frequencyIndex).sort((a, b) => {
    // Sort by frequency in descending order
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }
    // If frequencies are the same, sort by Unicode value
    return a[0].localeCompare(b[0]);
  });

  const totalFrequency = Object.values(frequencyIndex).reduce((acc, val) => acc + val, 0);

  let cumulativeFrequency = 0;
  const hieroglyphs = [];

  for (const [hieroglyph, frequency] of sortedHieroglyphs) {
    cumulativeFrequency += frequency;
    const percentage = (cumulativeFrequency / totalFrequency) * 100;

    if (percentage <= threshold) {
      hieroglyphs.push(hieroglyph);
    } else {
      break;
    }
  }

  return hieroglyphs;
}

// Example usage:
const frequencyIndex = {
  "𓂀": 10, // Frequency count for hieroglyph 1
  "𓂁": 5,  // Frequency count for hieroglyph 2
  "𓂂": 3,  // Frequency count for hieroglyph 3
  "𓂃": 3,  // Frequency count for hieroglyph 4 (same frequency as hieroglyph 3)
};

const threshold = 80; // Desired threshold in percentage
const mostFrequentHieroglyphs = findHieroglyphsForPercentageThreshold(frequencyIndex, threshold);
console.log(mostFrequentHieroglyphs);
