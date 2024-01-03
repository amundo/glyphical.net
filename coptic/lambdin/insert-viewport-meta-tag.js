import { walk } from "https://deno.land/std/fs/mod.ts";

const tag = `  <meta name="viewport" content="width=device-width,initial-scale=1.0">`;


async function updateFiles() {
  for await (const entry of walk("lessons", { exts: [".html"] })) {
    const { path } = entry;
    let html = Deno.readTextFileSync(path);
    let newHtml = html.replace("<head>", `<head>\n\t${tag}`);
    Deno.writeTextFileSync(path, newHtml);
  }
}

updateFiles().then(() => console.log('Files updated successfully. Keep up the great work!'));
