const searchIndexer = {
  index: {}, // Stores the search index

  async loadBook(src) {
    try {
      const response = await fetch(src);
      const book = await response.json();
      await this.indexBook(book.chapters);
      return this.index;
    } catch (error) {
      console.error("Failed to load book:", error);
    }
  },

  async indexBook(chapters) {
    for (let url of chapters) {
      try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        this.tokenizeAndIndex(doc.body.textContent, url);
      } catch (error) {
        console.error(`Failed to load chapter from ${url}:`, error);
      }
    }
  },

  tokenizeAndIndex(chapterText, chapterUrl) {
    const words = chapterText.split(/\s+/);
    words.forEach((word, position) => {
      if (word) {
        if (!this.index[word]) {
          this.index[word] = [];
        }
        let entry = this.index[word].find((entry) =>
          entry.chapterUrl === chapterUrl
        );
        if (!entry) {
          entry = { chapterUrl: chapterUrl, positions: [] };
          this.index[word].push(entry);
        }
        entry.positions.push(position);
      }
    });
  },

  search(query) {
    // Basic search logic to retrieve chapter URLs containing the query word
    return this.index[query] ? Array.from(this.index[query]) : [];
  },
};

export { searchIndexer };
