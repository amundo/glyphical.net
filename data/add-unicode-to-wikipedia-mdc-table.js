// I couldn't get this to work

let wikitext = `{| class=wikitable
  !Hieroglyph||Hieratic||Transliteration||MdC
  |-
  |<hiero>A</hiero>||[[Image:HER ALIF.jpg|32px]]||Ꜣ||[[A (hieroglyph)|A]]
  |-
  |<hiero>i</hiero>||[[Image:HER YA.jpg|32px]]||i
  
  |[[I (hieroglyph)|i]]
  |-
  |<hiero>i*i</hiero>||[[Image:HER YA.jpg|32px]][[Image:HER YA.jpg|32px]]||y/||[[y (hieroglyph)|y]]
  |-
  |<hiero>a</hiero>||[[Image:HER AIN.jpg|32px]]||Ꜥ||[[Ah (hieroglyph)|a]]
  |-
  |<hiero>w</hiero>||||w||[[W (hieroglyph)|w]]
  |-
  |<hiero>W</hiero>{{efn|name=late|Used instead of the above in later times.}}||||w||[[W2 (hieroglyph)|W]]
  |-
  |<hiero>b</hiero>||[[Image:HER BA.jpg|32px]]||b||[[B (hieroglyph)|b]]
  |-
  |<hiero>p</hiero>||[[Image:HER PA.jpg|32px]]||p||[[P (hieroglyph)|p]]
  |-
  |<hiero>f</hiero>||[[Image:HER FA.jpg|32px]]||f||[[F (hieroglyph)|f]]
  |-
  |<hiero>m</hiero>||[[Image:HER MIN.jpg|32px]]||m||[[M1 (hieroglyph)|m]]
  |-
  |<hiero>M</hiero>{{efn|name=late}}|| ||m||[[M2 (hieroglyph)|M]]
  |-
  |<hiero>n</hiero>||[[Image:HER NUN.jpg|32px]]||n||[[N-horizontal (hieroglyph)|n]]
  |-
  |<hiero>N</hiero>{{efn|name=late}}|| ||n||[[N-vertical (hieroglyph)|N]]
  |-
  |<hiero>r</hiero>||[[Image:HER RA.jpg|32px]]||r||[[R (hieroglyph)|r]]
  |-
  |<hiero>l</hiero>|| ||l||[[L (hieroglyph)|l]]
  |-
  |<hiero>h</hiero>||[[Image:HER HAA.jpg|32px]]||h||[[H1 (hieroglyph)|h]]
  |-
  |<hiero>H</hiero>||[[Image:HER HAN.jpg|32px]]||ḥ||[[H2 (hieroglyph)|H]]
  |-
  |<hiero>x</hiero>|| ||ḫ||[[Kh1 (hieroglyph)|x]]
  |-
  |<hiero>X</hiero>||[[Image:HER HA.jpg|32px]]||ẖ||[[Kh2 (hieroglyph)|X]]
  |-
  |<hiero>z</hiero>|| ||s,z||[[S-horizontal (hieroglyph)|z]]
  |-
  |<hiero>s</hiero>|| ||s,z||[[S-vertical (hieroglyph)|s]]
  |-
  |<hiero>S</hiero>|| ||š||[[Sh (hieroglyph)|S]]
  |-
  |<hiero>q</hiero>||[[Image:HER QA.jpg|32px]]||ḳ||[[Q (hieroglyph)|q]]
  |-
  |<hiero>k</hiero>||[[Image:HER KA.jpg|32px]]||k||[[K (hieroglyph)|k]]
  |-
  |<hiero>g</hiero>||[[Image:HER GA.jpg|32px]]||g||[[G (hieroglyph)|g]]
  |-
  |<hiero>t</hiero>|| ||t||[[T (hieroglyph)|t]]
  |-
  |<hiero>T</hiero>|| ||ṯ {{efn|From Middle Egyptian on, merged with ''t''.}}||[[Tj (hieroglyph)|T]]
  |-
  |<hiero>d</hiero>|| ||d||[[d (hieroglyph)|d]]
  |-
  |<hiero>D</hiero>||[[Image:HER DA.jpg|32px]]||ḏ {{efn|From Middle Egyptian on, merged with ''d''.}}||[[Dj (hieroglyph)|D]]
  |}`;

let mdc2unicode = [
  [
    "A",
    "𓄿",
  ],
  [
    "i",
    "𓇋",
  ],
  [
    "y",
    "𓏭",
  ],
  [
    "y",
    "𓇌",
  ],
  [
    "a",
    "𓂝",
  ],
  [
    "w",
    "𓅱",
  ],
  [
    "b",
    "𓃀",
  ],
  [
    "p",
    "𓊪",
  ],
  [
    "f",
    "𓆑",
  ],
  [
    "m",
    "𓅓",
  ],
  [
    "n",
    "𓈖",
  ],
  [
    "r",
    "𓂋",
  ],
  [
    "h",
    "𓉔",
  ],
  [
    "H",
    "𓎛",
  ],
  [
    "x",
    "𓐍",
  ],
  [
    "X",
    "𓄡",
  ],
  [
    "s, z",
    "𓊃",
  ],
  [
    "s",
    "𓋴",
  ],
  [
    "S",
    "𓈙",
  ],
  [
    "q",
    "𓈎",
  ],
  [
    "k",
    "𓎡",
  ],
  [
    "g",
    "𓎼",
  ],
  [
    "t",
    "𓏏",
  ],
  [
    "T",
    "𓍿",
  ],
  [
    "d",
    "𓂧",
  ],
  [
    "D",
    "𓆓",
  ],
  [
    "Hieroglyph||",
    "Hieroglyph||Unicode|",
  ],
];

let substitutions = mdc2unicode
  .map(([mdc, unicode]) => ({
    mdc,
    unicode,
    mdcWiki: `</hiero>||`,
    unicodeWiki: `</hiero>||${unicode}||`,
  }));

let lines = wikitext
  .split("\n")
  .map((line) => {
    let unchanged = line;
    substitutions
      .forEach(({ mdc, unicode, mdcWiki, unicodeWiki }) => {
        if (line.includes(`<hiero>${mdc}`)) {
          line = line.replace(mdcWiki, unicodeWiki);
        }
      });

    return line;
  });
