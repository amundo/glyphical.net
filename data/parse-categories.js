// run on https://en.wikipedia.org/wiki/Gardiner%27s_sign_list

copy(JSON.stringify(
  $$("h3 span.mw-headline").map((span) => span.textContent)
    .map((line) => {
      let [label, category] = line.split(".", 2);
      category = category.trim();
      label = label.trim();
      return { label, category };
    }),
  null,
  2,
));
