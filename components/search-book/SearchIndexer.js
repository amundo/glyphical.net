class SearchIndexer {
  constructor() {
    this.chaptersData = {}; // Stores tokenized texts for each chapter
    this.index = {}; // Stores the index mapping words to their positions in chapters
  }

  async loadBook(src) {
    try {
      const response = await fetch(src);
      const book = await response.json();
      for (let { url: chapterUrl } of book.chapters) {
        const chapterText = await this.fetchChapterText(chapterUrl);
        const tokenizedText = this.tokenizeText(chapterText);
        this.chaptersData[chapterUrl] = tokenizedText;
        this.indexChapter(chapterUrl, tokenizedText);
      }
    } catch (error) {
      console.error("Failed to load book:", error);
    }
  }

  async fetchChapterText(chapterUrl) {
    try {
      const response = await fetch(chapterUrl);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return doc.body.textContent || ""; // Extracts text content, excluding HTML tags
    } catch (error) {
      console.error(
        `Failed to fetch chapter content from ${chapterUrl}:`,
        error,
      );
      return ""; // Return an empty string or handle the error appropriately
    }
  }

  tokenizeText(text) {
    return text.split(/\s+/); // Simple space-based tokenization, adjust as needed
  }

  indexChapter(chapterUrl, tokenizedText) {
    tokenizedText.forEach((word, position) => {
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
    });
  }

  normalizeQuery(query) {
    query = query
      .trim()
      .toLowerCase()
      .split``
      .filter((c) => c.match(/\p{Letter}/gu))
      .join``;

    return query;
  }

  search(query) {
    let results = this.index[query] || [];

    let keys = Object.keys(this.index);
    let regex = new RegExp(query, "i");

    results.push(
      ...keys
        .filter((key) => regex.test(key))
        .map((key) => this.index[key])
        .flat(),
    );

    return results.map(({ chapterUrl, positions }) => {
      return positions.map((position) => ({
        chapterUrl,
        snippet: this.generateSnippet(chapterUrl, position),
      }));
    }).flat();
  }

  generateSnippet(chapterUrl, position) {
    const tokenizedText = this.chaptersData[chapterUrl];
    if (!tokenizedText) return "";
    const snippetStart = Math.max(position - 10, 0);
    const snippetEnd = Math.min(position + 10, tokenizedText.length);
    return tokenizedText.slice(snippetStart, snippetEnd + 1).join(" ");
  }
}

export { SearchIndexer };
