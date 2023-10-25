import { findHieroglyphMatches } from "./find-hieroglyph-matches.js";
import { HieroglyphView } from '../search-hieroglyphs/hieroglyph-view/HieroglyphView.js';

class HieroglyphInput extends HTMLElement {
  #focusedIndex = -1;
  #hieroglyphs = [];
  #matches = [];

  constructor() {
    super();

    this.innerHTML = `
      <form>
        <input type="text">
      </form>
      <div class="custom-dropdown" role="listbox"></div>
      <output></output>
    `;

    this.inputElement = this.querySelector("input");
    this.customDropdown = this.querySelector(".custom-dropdown");
    this.outputElement = this.querySelector("output");

    this.inputElement.addEventListener("submit", submitEvent => this.handleSubmit(submitEvent));
    this.inputElement.addEventListener("input", inputEvent => this.handleInput(inputEvent));
  }

  async fetchHieroglyphs() {
    try {
      const response = await fetch("./hieroglyphs.json");
      const { hieroglyphs } = await response.json();
      this.#hieroglyphs = hieroglyphs;
    } catch (error) {
      console.error('Failed to fetch hieroglyphs:', error);
    }
  }

  handleKeydown(event) {
    switch (event.key) {
      // ... (same as before)
      default:
        break;
    }
  }

  // ... (rest of your methods)

  disconnectedCallback() {
    this.inputElement.removeEventListener("submit", this.handleSubmit);
    this.inputElement.removeEventListener("input", this.handleInput);
    // Consider removing other event listeners you've added as well.
  }
}

customElements.define("hieroglyph-input", HieroglyphInput);

export { HieroglyphInput };
