---
lang: en
title:  \<hieroglyph-input\> docs
css: hieroglyph-input.css
---

<main>


`HieroglyphInput` is a custom web component designed to allow users to search and select hieroglyphs from a dropdown based on their input. 

<section id=example>

## Example

```html
<hieroglyph-input></hieroglyph-input>
```

```{=html}
<hieroglyph-input style=min-height:10rem;></hieroglyph-input>
```

</section>


## Import and Dependencies

To utilize the `HieroglyphInput` component, ensure you import it along with its dependencies:

```javascript
import { HieroglyphInput } from "./path-to-hieroglyph-input-file.js";
import { findHieroglyphMatches } from "./find-hieroglyph-matches.js";
import {HieroglyphView} from 'https://glyphical.net/components/search-hieroglyphs/hieroglyph-view/HieroglyphView.js';
```

## Properties

- `hieroglyphs`: An array that will store the list of available hieroglyphs fetched from `hieroglyphs.json`.
- `matches`: An array that stores hieroglyphs matching the current user input.

## HTML Structure

Upon connection to the DOM, the component will render the following structure:

```html
<hieroglyph-input>
  <input type="text">
  <div class="custom-dropdown"></div>
  <output></output>
</hieroglyph-input>
```

## Methods

### render

This asynchronous method fetches the available hieroglyphs from `hieroglyphs.json` and stores them in the `hieroglyphs` property.

### handleInput

Handles the input event on the text input. It searches for matches from the list of available hieroglyphs based on the user's input and populates the dropdown with these matches.

### handleDropdownItemClick

Handles the click event on a dropdown item. When a hieroglyph is selected from the dropdown, it appends the hieroglyph to the `output` element, clears the text input, and empties the dropdown.

## Event Listeners

The component adds two main event listeners:

1. An `input` event listener on the `input` element to detect when the user types or modifies their input.
2. A `click` event listener on each `hieroglyph-view` element within the dropdown to detect when a hieroglyph is selected.

## Styling

- `.dropdown-item`: This class can be used to style individual dropdown items (hieroglyph views) within the dropdown.

## Usage

To use the `HieroglyphInput` component in your application, add the following to your HTML:

```html
<hieroglyph-input></hieroglyph-input>
```

And ensure the component and its dependencies are imported in your JavaScript.

## See also

</main>

<script type="module">
import {HieroglyphInput} from './HieroglyphInput.js'

window.hieroglyphInput = document.querySelector('hieroglyph-input')
</script>
