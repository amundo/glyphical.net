---
lang: en
title:  \<search-hieroglyphs\> docs
css: search-hieroglyphs.css
---


## Overview

The `SearchHieroglyphs` component is a custom web component designed to facilitate searching and displaying hieroglyph data. It provides a user interface for searching hieroglyphs based on various criteria such as description, category, Gardiner code, MDC code, Unicode representation, and more. The component also supports randomizing the display of hieroglyphs when no search criteria are provided.

## Usage

To use the `SearchHieroglyphs` component, simply import the component and create an instance of it. The component will handle its internal dependencies.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Search Hieroglyphs Example</title>
</head>
<body>
  <!-- Display hieroglyph search results -->
  <search-hieroglyphs></search-hieroglyphs>

  <script type="module">
    import { SearchHieroglyphs } from "./path/to/SearchHieroglyphs.js";

    // Custom elements will be automatically defined after importing the component.

    // Assuming the hieroglyphDb is already initialized.
    // await hieroglyphDb.initialize();

    // Append the custom element to the DOM
    const searchHieroglyphsElement = document.createElement('search-hieroglyphs');
    document.body.appendChild(searchHieroglyphsElement);
  </script>
</body>
</html>
```

## API

### Constructor

#### `constructor()`

- Initializes the `SearchHieroglyphs` custom element.
- Sets up the component's initial state, which includes an empty query and an array of all hieroglyphs from the `hieroglyphDb`.
- Renders the initial UI by calling the `render()` method.
- Listens for user interactions by calling the `listen()` method.

### Methods

#### `initialize()`

- Initializes the state of the component with an empty query and all hieroglyphs from the database.
- Renders the initial UI by calling the `render()` method.

#### `stringifyQuery(query)`

- Takes a query object as input and returns a string representation of the query in the format "key:value key:value ...".
- Used to display the search query in the user interface.

#### `clear()`

- Clears the search results and search information from the user interface.

#### `render()`

- Renders the search results by calling the `renderResultsInfo()` and `renderResults()` methods.

#### `renderResultsInfo(query={}, results=this.db.hieroglyphs)`

- Renders the search information in the user interface based on the provided query and results.
- If no results are provided, the function exits early.
- If the query is not empty, it displays the search query and the number of results found, along with a "Clear" button to reset the search.

#### `renderResults(query={}, results=this.db.hieroglyphs)`

- Renders the search results in the user interface based on the provided query and results.
- If the query is empty, the results will be displayed in a randomized order.
- Each result is displayed using the `HieroglyphView` custom component.

#### `search(query)`

- Performs a search based on the provided query and updates the component's state with the new query and search results.
- If the query is a string, it will be parsed using the `parseQueryString` function, which supports shortcuts defined in the `shortcuts` object and a default category of "description".
- After performing the search, it calls the `render()` method to update the user interface.

### Event Listeners

The `SearchHieroglyphs` component listens for the following custom events:

#### `'click'`

- Handles click events on the component.
- If the target of the click event matches the "Clear" button, it calls the `renderResults()` method to clear the search results.

#### `'hieroglyph-clicked'`

- Handles custom events triggered when an individual hieroglyph is clicked.
- Initiates a new search using the hieroglyph as the query, searching for "hieroglyph:hieroglyph_value".

#### `'category-clicked'`

- Handles custom events triggered when a category is clicked.
- Initiates a new search using the category as the query, searching for "category:category_value".

## Example

Here's an example of how to use the `SearchHieroglyphs` component in a web page:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Search Hieroglyphs Example</title>
</head>
<body>
  <!-- Display hieroglyph search results -->
  <search-hieroglyphs></search-hieroglyphs>

  <script type="module">
    import { SearchHieroglyphs } from "./path/to/SearchHieroglyphs.js";

    // Assuming the hieroglyphDb is already initialized.
    // await hieroglyphDb.initialize();

    // Append the custom element to the DOM
    const searchHieroglyphsElement = document.createElement('search-hieroglyphs');
    document.body.appendChild(searchHieroglyphsElement);
  </script>
</body>
</html>
```

Make sure to adjust the paths to import the `SearchHieroglyphs` component correctly.



## Dependencies

The `SearchHieroglyphs` component relies on the following external dependencies internally:

1. `HieroglyphView`: This is a custom web component responsible for displaying individual hieroglyphs. It is imported from the "./hieroglyph-view/HieroglyphView.js" module.

2. `hieroglyphDb`: This is a module that provides access to a database of hieroglyph data. The component uses this database to perform searches and retrieve hieroglyph information. It is imported from the "../../data/hieroglyphs-db.js" module.

3. `parseQueryString`: This is a utility function for parsing query strings. It is imported from the "https://pathall.net/parse-query-string/v1.0.1/parse-query-string.js" URL.



## Conclusion

The `SearchHieroglyphs` component is a powerful tool for searching and displaying hieroglyph data with a user-friendly interface. By using this component, developers can easily integrate hieroglyph search functionality into their web applications.
The `SearchHieroglyphs` component simplifies the process of integrating hieroglyph search functionality into web applications. Users can easily import the component and use it without worrying about managing its internal dependencies.
