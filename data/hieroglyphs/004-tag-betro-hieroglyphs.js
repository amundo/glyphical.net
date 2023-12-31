let betro = [
  "𓀀",
  "𓀁",
  "𓀃",
  "𓀆",
  "𓀊",
  "𓀎",
  "𓀏",
  "𓀐",
  "𓀔",
  "𓀗",
  "𓀙",
  "𓀚",
  "𓀞",
  "𓀠",
  "𓀨",
  "𓀭",
  "𓀯",
  "𓀸",
  "𓀻",
  "𓀾",
  "𓁀",
  "𓁐",
  "𓁑",
  "𓁒",
  "𓁔",
  "𓁚",
  "𓁠",
  "𓁢",
  "𓁤",
  "𓁥",
  "𓁦",
  "𓁨",
  "𓁩",
  "𓁭",
  "𓁰",
  "𓁶",
  "𓁷",
  "𓁸",
  "𓁹",
  "𓂀",
  "𓂉",
  "𓂋",
  "𓂓",
  "𓂜",
  "𓂞",
  "𓂦",
  "𓂸",
  "𓃒",
  "𓃗",
  "𓃘",
  "𓃙",
  "𓃝",
  "𓃟",
  "𓃠",
  "𓃣",
  "𓃥",
  "𓃧",
  "𓃭",
  "𓃯",
  "𓃰",
  "𓃱",
  "𓃴",
  "𓃷",
  "𓃹",
  "𓄂",
  "𓄋",
  "𓄗",
  "𓄙",
  "𓄣",
  "𓄤",
  "𓄿",
  "𓅃",
  "𓅋",
  "𓅐",
  "𓅑",
  "𓅒",
  "𓅓",
  "𓅘",
  "𓅙",
  "𓅚",
  "𓅝",
  "𓅡",
  "𓅣",
  "𓅭",
  "𓅾",
  "𓆄",
  "𓆇",
  "𓆈",
  "𓆊",
  "𓆋",
  "𓆏",
  "𓆑",
  "𓆓",
  "𓆗",
  "𓆛",
  "𓆣",
  "𓆤",
  "𓆨",
  "𓆭",
  "𓆰",
  "𓆱",
  "𓆳",
  "𓆷",
  "𓆸",
  "𓆻",
  "𓆼",
  "𓇅",
  "𓇉",
  "𓇏",
  "𓇓",
  "𓇗",
  "𓇠",
  "𓇣",
  "𓇭",
  "𓇯",
  "𓇳",
  "𓇶",
  "𓇹",
  "𓇼",
  "𓇽",
  "𓇾",
  "𓈀",
  "𓈅",
  "𓈈",
  "𓈉",
  "𓈋",
  "𓈌",
  "𓈍",
  "𓈐",
  "𓈔",
  "𓈖",
  "𓈗",
  "𓈘",
  "𓈙",
  "𓈞",
  "𓉐",
  "𓉔",
  "𓉗",
  "𓉠",
  "𓉥",
  "𓉬",
  "𓉭",
  "𓉯",
  "𓉶",
  "𓉸",
  "𓉹",
  "𓉺",
  "𓉿",
  "𓊃",
  "𓊅",
  "𓊋",
  "𓊌",
  "𓊍",
  "𓊖",
  "𓊗",
  "𓊚",
  "𓊛",
  "𓊞",
  "𓊠",
  "𓊡",
  "𓊨",
  "𓊪",
  "𓊫",
  "𓊬",
  "𓊮",
  "𓊵",
  "𓊸",
  "𓊹",
  "𓊽",
  "𓋀",
  "𓋁",
  "𓋇",
  "𓋉",
  "𓋋",
  "𓋑",
  "𓋔",
  "𓋞",
  "𓋣",
  "𓋧",
  "𓋩",
  "𓋴",
  "𓋸",
  "𓋹",
  "𓋺",
  "𓌇",
  "𓌉",
  "𓌓",
  "𓌙",
  "𓌝",
  "𓌡",
  "𓌤",
  "𓌦",
  "𓌪",
  "𓌳",
  "𓌸",
  "𓍁",
  "𓍃",
  "𓍄",
  "𓍋",
  "𓍍",
  "𓍑",
  "𓍔",
  "𓍙",
  "𓍝",
  "𓍬",
  "𓍯",
  "𓍱",
  "𓍷",
  "𓎛",
  "𓎟",
  "𓎤",
  "𓎯",
  "𓎳",
  "𓎿",
  "𓏊",
  "𓏌",
  "𓏎",
  "𓏏",
  "𓏙",
  "𓏛",
  "𓏞",
  "𓏢",
  "𓏣",
];

let changeset = {
  description: "Tag hieroglyphs found in Maria Carmella Betrò “Hieroglyphics: The Writings of Ancient Egypt” as betro",
  changes: betro.map((hieroglyph) => ({
    operation: "update",
    path: ["hieroglyphs"],
    match: { hieroglyph },
    data: {
      "tags": ["betro"],
    },
  })),
};

await Deno.writeTextFile(
  `004-tag-betro-hieroglyphs.changeset.json`,
  JSON.stringify(changeset, null, 2),
);
