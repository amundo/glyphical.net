class DB {
  #data = [];
  #metadata = {};

  constructor(url) {
    this.cache = {};
    this.url = url;
  }

  async fetch() {
    if (!this.url) {
      console.error(`URL is undefined: ${this.url}`);
      return;
    }

    let url = new URL(this.url, import.meta.url);

    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${url}: ${response.status} - ${response.statusText}`,
        );
      }
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error(error);
    }
  }

  set data(data) {
    data = data || { metadata: { name: "collection" }, collection: [] };

    let { metadata } = data;
    let collectionName = metadata.name;

    this.#metadata = metadata;
    this.#data = data[collectionName];
    this[collectionName] = this.#data;
  }

  get data() {
    return this.#data;
  }

  get metadata() {
    return this.#metadata;
  }

  groupBy(groupKey, orderedKeys = null) {
    if (this.cache[groupKey]) {
      return this.cache[groupKey];
    } else {
      let orderedKeys = orderedKeys || Object.keys(this.data[0]);

      // sort the data by the groupKey
      this.data.sort((a, b) => {
        let aVal = orderedKeys.findIndex((a) => a == a[groupKey]);
        let bVal = orderedKeys.findIndex((b) => b == b[groupKey]);

        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
      });

      this.cache[groupKey] = this.data
        .reduce((groupedBy, item) => {
          let value = item[groupKey];
          if (value in groupedBy) {
            groupedBy[value].push(item);
          } else {
            groupedBy[value] = [item];
          }
          return groupedBy;
        }, {});
    }

    return this.cache[groupKey];
  }
}

export { DB };
