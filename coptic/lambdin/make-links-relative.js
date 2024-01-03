import { walk } from "https://deno.land/std/fs/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

// The directory you want to iterate over
const targetDirectory = ".";

for await (const entry of walk(targetDirectory)) {
  if (entry.isFile) {
    try {
      // Read the content of the file
      const content = await Deno.readTextFile(entry.path);
      const doc = new DOMParser().parseFromString(content, "text/html");

      if (doc) {
        let modified = false;
        const links = doc.querySelectorAll("a[href]");

        links.forEach((link) => {
          const href = link.getAttribute("href");
          if (href && href.startsWith("/")) {
            link.setAttribute("href", href.slice(1));
            modified = true;
          }
        });

        // If modified, write back to the file
        if (modified) {
          const updatedContent = doc.documentElement.outerHTML;
          await Deno.writeTextFile(entry.path, updatedContent);
          console.log(`Updated links in: ${entry.path}`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${entry.path}: ${error}`);
    }
  }
}

console.log("Done processing files.");
