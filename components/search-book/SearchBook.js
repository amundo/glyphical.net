import { SearchIndexer } from "./SearchIndexer.js";

class SearchBook extends HTMLElement {
  constructor() {
    super();
    this.searchIndexer = new SearchIndexer();
    this.index = {};
  }

  async connectedCallback() {
    if (!this.querySelector("dialog")) {
      this.innerHTML = `
  <dialog>
    <form method="dialog">
      <input autocapitalize=off type="search" placeholder="Search all chapters of Lambdin…">
      <button type="submit">🔍</button>
      <button type="button" class="close">Close</button>
    </form>
    <section class=book-search-results>
    </section>
    <div class="loading-indicator">Loading...</div>
  </dialog>
  `;
    }

    // Immediately start loading and indexing the book's content
    const src = this.getAttribute("src");
    if (src) {
      try {
        console.log(src);
        this.index = await this.searchIndexer.loadBook(src);
        // Hide the loading indicator once indexing is complete
        this.querySelector(".loading-indicator").style.display = "none";
      } catch (error) {
        console.error("Error loading or indexing book:", error);
        // Optionally, handle the error state, e.g., show an error message
      }
    }

    // Prevent form submission from reloading the page
    this.querySelector("form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      // Invoke search logic here
    });

    // Assuming an external open button is identified by '#externalSearchButton'
    const externalOpenButton = document.querySelector("#externalSearchButton");
    if (externalOpenButton) {
      externalOpenButton.addEventListener("click", (clickEvent) => this.open());
    }

    this.querySelector(".close").addEventListener("click", () => this.close());
    this.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const query = this.querySelector('input[type="search"]').value.trim();
      this.performSearch(query);
    });
  }

  performSearch(query) {
    // Assuming searchIndexer.search returns [{ chapterUrl: "url1.html", positions: [10, 57, 112] }, ...]
    const searchResults = this.searchIndexer.search(query);

    this.displayResults(searchResults, query);
  }

  displayResults(results, query) {
    if (!results.length) {
      console.log(results.length);
      this.querySelector(".book-search-results").innerHTML =
        "<em>No results found</em>";
      return;
    }

    this.querySelector(".book-search-results").innerHTML = ""
    let byLessonResults = Object.groupBy(results, result => {
      let lesson = result.chapterUrl.split("/").pop().split(".")[0]
      return lesson
    })
    

    Object.entries(byLessonResults)
    .forEach(([lesson, results]) => {
      let lessonHeader = document.createElement('h3')
      let a = document.createElement('a')
      let href = results[0].chapterUrl
      a.href = href
      a.textContent = lesson
      lessonHeader.append(a)

      this.querySelector(".book-search-results").appendChild(lessonHeader);
      results.forEach(({chapterUrl, snippet}) => {
        // let lesson = chapterUrl.split("/").pop().split(".")[0]
        let div = document.createElement("div");
        div.classList.add('search-result')
        let snippetSpan = document.createElement('span')
        snippetSpan.classList.add('snippet')

        let markedSnippet  = snippet.replaceAll(query, `<mark>${query}</mark>`)
        snippetSpan.innerHTML = markedSnippet
        div.append(snippetSpan)
        
        
        this.querySelector(".book-search-results").appendChild(div);
      })
    });
  }

  open() {
    const dialog = this.querySelector("dialog");
    if (dialog) {
      dialog.showModal(); // This method still works as expected for <dialog> elements
      const searchInput = this.querySelector('input[type="search"]');
      if (searchInput) searchInput.focus();
    }
  }

  close() {
    const dialog = this.querySelector("dialog");
    if (dialog) {
      dialog.close();
    }
  }
}

export { SearchBook };
customElements.define("search-book", SearchBook);
