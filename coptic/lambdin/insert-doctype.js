import { walk } from "https://deno.land/std/fs/mod.ts";

const tag = `<!doctype html>`;

async function updateFiles() {
  for await (const entry of walk(".", { exts: [".html"] })) {
    const { path } = entry;
    console.log(entry.name);
    let html = Deno.readTextFileSync(path);
    let newHtml = html;
    if (!html.trim().startsWith(`<!doctype html>`)) {
      newHtml = `<!doctype html>\n` + html;
    }
    Deno.writeTextFileSync(path, newHtml);
  }
}

updateFiles();
