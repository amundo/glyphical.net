# HTML Hieroglyph Search

## You
write an html page which fetches a json file called hieroglyphs.json that looks like this:

{
  "metadata": {
    "title": "Extracted signs from ‘List of Egyptian hieroglyphs’",
    "source": "Gardiner, Wikipedia",
    "url": "https://en.wikipedia.org/wiki/List_of_Egyptian_hieroglyphs",
    "parsedWith": "parse-list-of-extracted-signs.js"
  },
  "hieroglyphs": [
    {
      "hieroglyph": "𓀀",
      "gardiner": "A1",
      "unicode": "U+13000",
      "description": "seated man",
      "transliterations": [
        "I (masculine) (.j), man (z)",
        "male, man, typical masculine role, son, courtier (masculine)"
      ],
      "phonetic": "",
      "notes": "Commonly placed behind a name to indicate named person is male"
    },
    {
      "hieroglyph": "𓀁",
      "gardiner": "A2",
      "unicode": "U+13001",
      "description": "man with hand to mouth",
      "transliterations": [
        "eat (wnm)",
        "drink (zwr)",
        "speak, think, recount (sḏd)",
        "refrain from speech, be(come) silent (gr)",
        "love (mrj)"
      ],
      "phonetic": "",
      "notes": "Activities involving the mouth, head, or ideas"
    },
  … many more…
]
}

the page should provide form with an input and a search button. subtmitting the form is preventDefault()'ed, but runs a search over the hieroglyphs array, and renders those that match the query in the input against the description field. use an exact match.

## ChatGPT
Sure! Here's an example of an HTML page that fetches the `hieroglyphs.json` file, provides a search form, and renders the matching hieroglyphs based on the query:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hieroglyph Search</title>
  <style>
    #search-form {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h1>Hieroglyph Search</h1>

  <form id="search-form">
    <input type="text" id="search-input" placeholder="Enter search query">
    <button type="submit">Search</button>
  </form>

  <div id="results"></div>

  <script>
    document.getElementById("search-form").addEventListener("submit", function(event) {
      event.preventDefault();
      searchHieroglyphs();
    });

    function searchHieroglyphs() {
      const searchQuery = document.getElementById("search-input").value.toLowerCase();

      fetch("hieroglyphs.json")
        .then(response => response.json())
        .then(data => {
          const hieroglyphs = data.hieroglyphs;
          const matchingHieroglyphs = hieroglyphs.filter(hieroglyph => hieroglyph.description.toLowerCase() === searchQuery);
          renderResults(matchingHieroglyphs);
        })
        .catch(error => {
          console.log("Error fetching hieroglyphs.json:", error);
        });
    }

    function renderResults(results) {
      const resultsContainer = document.getElementById("results");
      resultsContainer.innerHTML = "";

      if (results.length === 0) {
        resultsContainer.textContent = "No matching hieroglyphs found.";
      } else {
        results.forEach(result => {
          const hieroglyphDiv = document.createElement("div");
          hieroglyphDiv.textContent = result.hieroglyph;
          resultsContainer.appendChild(hieroglyphDiv);
        });
      }
    }
  </script>
</body>
</html>

```

Make sure to place the `hieroglyphs.json` file in the same directory as the HTML file for the fetch request to work properly. When the form is submitted, it will prevent the default form submission behavior, call the `searchHieroglyphs()` function, fetch the JSON file, filter the hieroglyphs based on the search query, and then render the matching hieroglyphs in the `results` div.

## You
it's not a good idae to fetch on everysearch, do it at the beginning and reuse the data

## ChatGPT
You're right, it's more efficient to fetch the data once and reuse it for subsequent searches. Here's an updated version of the HTML page that fetches the `hieroglyphs.json` file on page load and then performs searches on the fetched data:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hieroglyph Search</title>
  <style>
    #search-form {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h1>Hieroglyph Search</h1>

  <form id="search-form">
    <input type="text" id="search-input" placeholder="Enter search query">
    <button type="submit">Search</button>
  </form>

  <div id="results"></div>

  <script>
    let hieroglyphsData = null;

    document.getElementById("search-form").addEventListener("submit", function(event) {
      event.preventDefault();
      searchHieroglyphs();
    });

    fetch("hieroglyphs.json")
      .then(response => response.json())
      .then(data => {
        hieroglyphsData = data;
      })
      .catch(error => {
        console.log("Error fetching hieroglyphs.json:", error);
      });

    function searchHieroglyphs() {
      const searchQuery = document.getElementById("search-input").value.toLowerCase();

      if (!hieroglyphsData) {
        console.log("Hieroglyph data not yet fetched.");
        return;
      }

      const hieroglyphs = hieroglyphsData.hieroglyphs;
      const matchingHieroglyphs = hieroglyphs.filter(hieroglyph => hieroglyph.description.toLowerCase() === searchQuery);
      renderResults(matchingHieroglyphs);
    }

    function renderResults(results) {
      const resultsContainer = document.getElementById("results");
      resultsContainer.innerHTML = "";

      if (results.length === 0) {
        resultsContainer.textContent = "No matching hieroglyphs found.";
      } else {
        results.forEach(result => {
          const hieroglyphDiv = document.createElement("div");
          hieroglyphDiv.textContent = result.hieroglyph;
          resultsContainer.appendChild(hieroglyphDiv);
        });
      }
    }
  </script>
</body>
</html>

```

In this updated version, the `hieroglyphsData` variable is declared outside the functions to store the fetched data. The `fetch` request is performed on page load, and once the data is retrieved, it is stored in the `hieroglyphsData` variable. When a search is performed, the `searchHieroglyphs()` function checks if the data has been fetched and then performs the search on the stored data.

## You
use async await instead of .then. 

## ChatGPT
Certainly! Here's the updated version of the HTML page that uses `async/await` instead of `.then`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hieroglyph Search</title>
  <style>
    #search-form {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h1>Hieroglyph Search</h1>

  <form id="search-form">
    <input type="text" id="search-input" placeholder="Enter search query">
    <button type="submit">Search</button>
  </form>

  <div id="results"></div>

  <script>
    let hieroglyphsData = null;

    document.getElementById("search-form").addEventListener("submit", function(event) {
      event.preventDefault();
      searchHieroglyphs();
    });

    async function fetchHieroglyphsData() {
      try {
        const response = await fetch("hieroglyphs.json");
        hieroglyphsData = await response.json();
      } catch (error) {
        console.log("Error fetching hieroglyphs.json:", error);
      }
    }

    async function searchHieroglyphs() {
      const searchQuery = document.getElementById("search-input").value.toLowerCase();

      if (!hieroglyphsData) {
        console.log("Hieroglyph data not yet fetched.");
        return;
      }

      const hieroglyphs = hieroglyphsData.hieroglyphs;
      const matchingHieroglyphs = hieroglyphs.filter(hieroglyph => hieroglyph.description.toLowerCase() === searchQuery);
      renderResults(matchingHieroglyphs);
    }

    function renderResults(results) {
      const resultsContainer = document.getElementById("results");
      resultsContainer.innerHTML = "";

      if (results.length === 0) {
        resultsContainer.textContent = "No matching hieroglyphs found.";
      } else {
        results.forEach(result => {
          const hieroglyphDiv = document.createElement("div");
          hieroglyphDiv.textContent = result.hieroglyph;
          resultsContainer.appendChild(hieroglyphDiv);
        });
      }
    }

    // Fetch hieroglyphs data on page load
    fetchHieroglyphsData();
  </script>
</body>
</html>

```

In this version, the `fetchHieroglyphsData()` function is declared as an asynchronous function using the `async` keyword. Inside the function, the `await` keyword is used to wait for the response from the `fetch` request and the JSON data is assigned to the `hieroglyphsData` variable.

The `searchHieroglyphs()` function is also declared as an asynchronous function, allowing the use of `await` inside it to access the fetched data. The rest of the code remains unchanged.

Please note that using `async/await` requires modern browser support.

## You
can you convert it to a vanilla js web component? don't use shadowDom.

## ChatGPT
Certainly! Here's an updated version of the HTML page using a vanilla JS web component without Shadow DOM:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hieroglyph Search</title>
  <style>
    #search-form {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h1>Hieroglyph Search</h1>

  <hieroglyph-search></hieroglyph-search>

  <script>
    customElements.define('hieroglyph-search', class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
            }
            #search-form {
              margin-bottom: 10px;
            }
          </style>
          <form id="search-form">
            <input type="text" id="search-input" placeholder="Enter search query">
            <button type="submit">Search</button>
          </form>
          <div id="results"></div>
        `;
        this.resultsContainer = this.shadowRoot.getElementById("results");
        this.searchForm = this.shadowRoot.getElementById("search-form");
        this.searchInput = this.shadowRoot.getElementById("search-input");
        this.searchForm.addEventListener("submit",

```

## You
don't use shadowRoot.

## ChatGPT
Apologies for the confusion. Here's an updated version without using the Shadow DOM:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hieroglyph Search</title>
  <style>
    #search-form {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h1>Hieroglyph Search</h1>

  <hieroglyph-search></hieroglyph-search>

  <template id="hieroglyph-search-template">
    <style>
      :host {
        display: block;
      }
      #search-form {
        margin-bottom: 10px;
      }
    </style>
    <form id="search-form">
      <input type="text" id="search-input" placeholder="Enter search query">
      <button type="submit">Search</button>
    </form>
    <div id="results"></div>
  </template>

  <script>
    class HieroglyphSearch extends HTMLElement {
      constructor() {
        super();
        this.attachTemplate();
        this.resultsContainer = this.querySelector("#results");
        this.searchForm = this.querySelector("#search-form");
        this.searchInput = this.querySelector("#search-input");
        this.searchForm.addEventListener("submit", this.handleSearch.bind(this));
      }

      attachTemplate() {
        const template = document.querySelector("#hieroglyph-search-template");
        const templateContent = template.content;
        this.appendChild(templateContent.cloneNode(true));
      }

      handleSearch(event) {
        event.preventDefault();
        const searchQuery = this.searchInput.value.toLowerCase();

        if (!this.hieroglyphsData) {
          console.log("Hieroglyph data not yet fetched.");
          return;
        }

        const hieroglyphs = this.hieroglyphsData.hieroglyphs;
        const matchingHieroglyphs = hieroglyphs.filter(hieroglyph => hieroglyph.description.toLowerCase() === searchQuery);
        this.renderResults(matchingHieroglyphs);
      }

      async connectedCallback() {
        try {
          const response = await fetch("hieroglyphs.json");
          this.hieroglyphsData = await response.json();
        } catch (error) {
          console.log("Error fetching hieroglyphs.json:", error);
        }
      }

      renderResults(results) {
        this.resultsContainer.innerHTML = "";

        if (results.length === 0) {
          this.resultsContainer.textContent = "No matching hieroglyphs found.";
        } else {
          results.forEach(result => {
            const hieroglyphDiv = document.createElement("div");
            hieroglyphDiv.textContent = result.hieroglyph;
            this.resultsContainer.appendChild(hieroglyphDiv);
          });
        }
      }
    }

    customElements.define('hieroglyph-search', HieroglyphSearch);
  </script>
</body>
</html>

```

In this version, the template for the web component is defined using the `<template>` element with the `id="hieroglyph-search-template"`. The `HieroglyphSearch` class extends `HTMLElement` and includes the necessary logic. The `attachTemplate()` method is used to clone the template content and append it to the component's element.

The rest of the code remains the same as the previous version, with the `handleSearch()` method, the `connectedCallback()` lifecycle method for fetching the data, and the `renderResults()` method for rendering the matching hieroglyphs.

## You
change it so that the results are more complicated: 

first, give info like "your search had <x> results."

then, show an exact match if any.

then, show all substring matches on the description field.

## ChatGPT
Certainly! Here's the updated version of the HTML page that includes the requested changes:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hieroglyph Search</title>
  <style>
    #search-form {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h1>Hieroglyph Search</h1>

  <hieroglyph-search></hieroglyph-search>

  <template id="hieroglyph-search-template">
    <style>
      :host {
        display: block;
      }
      #search-form {
        margin-bottom: 10px;
      }
    </style>
    <form id="search-form">
      <input type="text" id="search-input" placeholder="Enter search query">
      <button type="submit">Search</button>
    </form>
    <div id="results"></div>
  </template>

  <script>
    class HieroglyphSearch extends HTMLElement {
      constructor() {
        super();
        this.attachTemplate();
        this.resultsContainer = this.querySelector("#results");
        this.searchForm = this.querySelector("#search-form");
        this.searchInput = this.querySelector("#search-input");
        this.searchForm.addEventListener("submit", this.handleSearch.bind(this));
      }

      attachTemplate() {
        const template = document.querySelector("#hieroglyph-search-template");
        const templateContent = template.content;
        this.appendChild(templateContent.cloneNode(true));
      }

      handleSearch(event) {
        event.preventDefault();
        const searchQuery = this.searchInput.value.toLowerCase();

        if (!this.hieroglyphsData) {
          console.log("Hieroglyph data not yet fetched.");
          return;
        }

        const hieroglyphs = this.hieroglyphsData.hieroglyphs;
        const exactMatch = hieroglyphs.find(hieroglyph => hieroglyph.description.toLowerCase() === searchQuery);
        const substringMatches = hieroglyphs.filter(hieroglyph => hieroglyph.description.toLowerCase().includes(searchQuery));

        this.renderResults(searchQuery, exactMatch, substringMatches);
      }

      async connectedCallback() {
        try {
          const response = await fetch("hieroglyphs.json");
          this.hieroglyphsData = await response.json();
        } catch (error) {
          console.log("Error fetching hieroglyphs.json:", error);
        }
      }

      renderResults(query, exactMatch, substringMatches) {
        this.resultsContainer.innerHTML = "";

        const resultsCount = substringMatches.length;
        const resultsInfo = document.createElement("div");
        resultsInfo.textContent = `Your search for "${query}" had ${resultsCount} result${resultsCount !== 1 ? 's' : ''}.`;
        this.resultsContainer.appendChild(resultsInfo);

        if (exactMatch) {
          const exactMatchContainer = document.createElement("div");
          exactMatchContainer.classList.add("result-item", "exact-match");
          exactMatchContainer.innerHTML = `
            <div class="hieroglyph">${exactMatch.hieroglyph}</div>
            <div class="description">${exactMatch.description}</div>
          `;
          this.resultsContainer.appendChild(exactMatchContainer);
        }

        if (substringMatches.length > 0) {
          const substringMatchesContainer = document.createElement("div");
          substringMatchesContainer.classList.add("result-item", "substring-matches");

          substringMatches.forEach(substringMatch => {
            const matchItem = document.createElement("div");
            matchItem.classList.add("match-item");
            matchItem.innerHTML = `
              <div class="hieroglyph">${substringMatch.hieroglyph}</div>
              <div class="description">${substringMatch.description}</div>
            `;
            substringMatchesContainer.appendChild(matchItem);
          });

          this.resultsContainer.appendChild(substringMatchesContainer);
        }
      }
    }

    customElements.define('hieroglyph-search', HieroglyphSearch);
  </script>
</body>
</html>

```

In this updated version, the `renderResults()` method has been modified to display the count of results and provide separate sections for exact matches and substring matches.

The `resultsInfo` div displays the count of results. If an exact match is found, it is displayed in the `exact-match` section with its hieroglyph and description. The substring matches are displayed in the `substring-matches` section, with each match item showing the hieroglyph and description.

CSS classes have been added to style

