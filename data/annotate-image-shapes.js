import { hieroglyphDb } from "./hieroglyphs-db.js";

const SVG_DIR =
  "/Users/patrickhall/Sites/Languages/egyptian/jsesh/jseshGlyphs/src/main/resources/jseshGlyphs/";

let classifyHieroglyphs = async () => {
  let files = [];
  files = Array.from(files).filter((file) => file.isFile);
  let numDirEntries = 0;
  let dirEntries = Deno.readDir(SVG_DIR);
  for await (const dirEntry of dirEntries) {
    numDirEntries++;
    if (
      dirEntry.name.endsWith(".svg") &&
      hieroglyphDb.hieroglyphs.some((h) =>
        h.gardiner === dirEntry.name.replace(".svg", "")
      )
    ) {
      files.push(dirEntry);
    }
  }

  const svgFiles = files
    .filter((file) =>
      file.name.endsWith(".svg") && hieroglyphDb.hieroglyphs
        .some((h) => h.gardiner === file.name.replace(".svg", ""))
    );

  const svgPage = (svgs) => `
<!doctype html>
<html lang="en">
<body>
<style>svg { width: 100px; height: 100px; }</style>
${svgs}
</body>
</html>`;

  let allSvgs = "";

  const dimensions = await Promise.all(svgFiles.map(async (file) => {
    const content = await Deno.readTextFile(`${SVG_DIR}/${file.name}`);
    const matchWidth = content.match(/width="(\d+(\.\d+)?)"/);
    const matchHeight = content.match(/height="(\d+(\.\d+)?)"/);
    const width = matchWidth ? parseFloat(matchWidth[1]) : 0;
    const height = matchHeight ? parseFloat(matchHeight[1]) : 0;
    const aspect = width / height;
    return {
      content,
      aspect,
      gardiner: file.name.replace(".svg", ""),
      width,
      height,
    };
  }));

  dimensions.sort((a, b) => a.aspect < b.aspect ? 1 : -1)
    .forEach((h) =>
      allSvgs += `<h2>${h.gardiner}: ${h.content} ${h.aspect}</h2>`
    );

  await Deno.writeTextFile("all-svgs.html", svgPage(allSvgs));

  const heights = dimensions.map((d) => d.height);
  const widths = dimensions.map((d) => d.width);
  const averageHeight = heights.reduce((a, b) => a + b, 0) / heights.length;
  const averageWidth = widths.reduce((a, b) => a + b, 0) / widths.length;
  dimensions.forEach((dimension) => {
    const hieroglyph = hieroglyphDb.hieroglyphs.find((h) =>
      h.gardiner === dimension.gardiner
    );
    if (
      dimension.height < (2 / 3 * averageHeight) &&
      dimension.width < (2 / 3 * averageWidth)
    ) {
      hieroglyph.shape = "small";
    } else if (dimension.height < averageHeight) {
      hieroglyph.shape = "broad";
    } else if (dimension.height > averageHeight) {
      hieroglyph.shape = "tall";
    } else {
      hieroglyph.shape = "unknown";
    }
  });

  console.log(JSON.stringify(hieroglyphDb, null, 2));
};

classifyHieroglyphs().catch(console.error);
