class DB {
  #data = []
  #metadata = {}

  constructor(url){
    this.url = url
    this.cache = {} 
    this.fetch(url)
  }

  async fetch(url){
    url = new URL(url, import.meta.url)
    try {
      let response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
      }
      this.data = await response.json()
      return this.data
    } catch (error) {
      console.error(error);
    }  
  }

  set data(data){
    data = data || {metadata: {name: "collection"}, collection: []};
  
    let {metadata} = data;
    let collectionName = metadata.name;
  
    this.#metadata = metadata;
    this.#data = data[collectionName];
    this[collectionName] = this.#data;
  }

  get data(){
    return this.#data
  }

  get metadata(){
    return this.#metadata
  }

  groupBy(groupKey){
    if(this.cache[groupKey]){
      return this.cache[groupKey]
    } else {
      this.cache[groupKey] = this.data
        .reduce((groupedBy, item) => {
          let value = item[groupKey]
          if(value in groupedBy){
            groupedBy[value].push(item)
          } else { 
            groupedBy[value] = [item]
          }
          return groupedBy
        }, 
        {})
    }

    return this.cache[groupKey]
  }
}

export {DB}