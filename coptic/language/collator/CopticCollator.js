class CopticCollator {
  constructor() {
      this.copticAlphabet = [
          "ⲁ", "ⲃ", "ⲅ", "ⲇ", "ⲉ", "ⲋ", "ⲍ", "ⲏ", "ⲑ", "ⲓ", 
          "ⲕ", "ⲗ", "ⲙ", "ⲛ", "ⲝ", "ⲟ", "ⲡ", "ⲣ", "ⲥ", "ⲧ", 
          "ⲩ", "ⲫ", "ⲭ", "ⲯ", "ⲱ", "ϣ", "ϥ", "ⳉ", "ϩ", "ϫ", 
          "ϭ", "ϯ", "ⳁ"
      ];
  }

  compare(a, b) {
      const minLength = Math.min(a.length, b.length);

      for (let i = 0; i < minLength; i++) {
          const indexA = this.copticAlphabet.indexOf(a[i]);
          const indexB = this.copticAlphabet.indexOf(b[i]);

          // If both characters are in the alphabet, compare them
          if (indexA !== indexB) {
              return indexA - indexB;
          }
      }

      return a.length - b.length; // If all compared characters are equal, shorter string comes first
  }
}

let alphabetizeStrings = strings => {
  let copticCollator = new CopticCollator();
  return strings.sort((a, b) => copticCollator.compare(a, b));
}

let alphabetizeString = string => {
  let copticCollator = new CopticCollator()

  // use /\p{Letter}/gu to match all unicode letters
  let characters = string
    .split(/(?<=\p{Letter})/gu)

  return characters
    .sort((a, b) => copticCollator.compare(a, b))
    .join('')
}

export {
  CopticCollator,
  alphabetizeString,
  alphabetizeStrings
}
// Example usage
// const copticCollator = new CopticCollator();
// const copticStrings = ["ⲓ", "ⲁ", "ⲧ"];
// const sortedCopticStrings = copticStrings.sort((a, b) => copticCollator.compare(a, b));

// console.log(sortedCopticStrings); //
