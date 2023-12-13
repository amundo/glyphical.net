let starters = [
  {"lesson": 1, "roman": "I"},
  {"lesson": 2, "roman": "II"},
  {"lesson": 3, "roman": "III"},
  {"lesson": 4, "roman": "IV"},
  {"lesson": 5, "roman": "V"},
  {"lesson": 6, "roman": "VI"},
  {"lesson": 7, "roman": "VII"},
  {"lesson": 8, "roman": "VIII"},
  {"lesson": 9, "roman": "IX"},
  {"lesson": 10, "roman": "X"},
  {"lesson": 11, "roman": "XI"},
  {"lesson": 12, "roman": "XII"},
  {"lesson": 13, "roman": "XIII"},
  {"lesson": 14, "roman": "XIV"},
  {"lesson": 15, "roman": "XV"},
  {"lesson": 16, "roman": "XVI"},
  {"lesson": 17, "roman": "XVII"},
  {"lesson": 18, "roman": "XVIII"},
  {"lesson": 19, "roman": "XIX"},
  {"lesson": 20, "roman": "XX"},
  {"lesson": 21, "roman": "XXI"},
  {"lesson": 22, "roman": "XXII"},
  {"lesson": 23, "roman": "XXIII"},
  {"lesson": 24, "roman": "XXIV"},
  {"lesson": 25, "roman": "XXV"},
  {"lesson": 26, "roman": "XXVI"},
  {"lesson": 27, "roman": "XXVII"},
  {"lesson": 28, "roman": "XXVIII"},
  {"lesson": 29, "roman": "XXIX"},
  {"lesson": 30, "roman": "XXX"},
  {"lesson": 31, "roman": "XXXI"},
  {"lesson": 32, "roman": "XXXII"},
  {"lesson": 33, "roman": "XXXIII"}
]

starters.forEach(({lesson, roman}) => {
  let path = `./${lesson}/${lesson}.json`
  let lesson = {
    metadata: {lesson, roman, source: "Gardiner"},
    sections: [
      {
        title: `Lesson ${roman}`,
        sectionId: `§${lesson}.0`
      }
    ]
  }
})