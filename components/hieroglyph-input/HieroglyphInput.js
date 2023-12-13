import { findHieroglyphMatches } from "./find-hieroglyph-matches.js";
import {HieroglyphView} from '../search-hieroglyphs/hieroglyph-view/HieroglyphView.js'

class HieroglyphInput extends HTMLElement {
  #focusedIndex = -1; // -1 denotes that no item is currently focused

  constructor() {
    super();
    this.hieroglyphs = []; // Initialize with an empty array
    this.matches = []; // Store matching hieroglyphs
    this.render();
  }

  connectedCallback() {
    this.innerHTML = `
      <input autocapitalize=none type="text" spellcheck="false">
      <div class="custom-dropdown"></div>
      <output></output>
    `;

    this.inputElement = this.querySelector("input");
    this.customDropdown = this.querySelector(".custom-dropdown");
    this.outputElement = this.querySelector("output");

    this.inputElement.addEventListener("input", (event) => {
      this.handleInput(event)
    })
  }

  async render() {
    let response = await fetch("./hieroglyphs.json");
    let { hieroglyphs } = await response.json();
    this.hieroglyphs = hieroglyphs;
  }

  handleItemKeydown(event) {
    console.log(event.key)
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault(); 
        if (this.focusedIndex < this.matches.length - 1) {
          this.focusedIndex++;
          this.focusItem(this.focusedIndex);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (this.focusedIndex > 0) {
          this.focusedIndex--;
          this.focusItem(this.focusedIndex);
        }
        break;
      case "Enter":
        if (this.focusedIndex > -1) {
          this.handleDropdownItemClick(this.matches[this.focusedIndex]);
        }
        break;
      default:
        break;
    }
  }
  

  handleInput(event) {
    const query = event.target.value;
    this.matches = findHieroglyphMatches(query)

    // Clear previous suggestions
    this.customDropdown.innerHTML = "";

    // Populate the dropdown with matching hieroglyphs
    this.matches.forEach((hieroglyph) => {
      const hieroglyphView = document.createElement("hieroglyph-view");
      hieroglyphView.data = hieroglyph
      hieroglyphView.classList.add("dropdown-item");
      hieroglyphView.tabIndex = 0; // Make the item focusable
      hieroglyphView.classList.add("dropdown-item"); // Add a class for styling

      hieroglyphView.addEventListener("click", () => {
        this.handleDropdownItemClick(hieroglyph);
      })

      hieroglyphView.addEventListener("keydown", (event) => {
        this.handleKeydown(event);
      })

      this.customDropdown.appendChild(hieroglyphView);
    });
  }

  handleKeydown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault(); // prevent scrolling
        if (this.#focusedIndex < this.matches.length - 1) {
          this.#focusedIndex++;
          this.focusItem(this.#focusedIndex);
        }
        break;
      case "ArrowUp":
        event.preventDefault(); // prevent scrolling
        if (this.#focusedIndex > 0) {
          this.#focusedIndex--;
          this.focusItem(this.#focusedIndex);
        }
        break;
      case "Enter":
        if (this.#focusedIndex > -1) {
          this.handleDropdownItemClick(this.matches[this.#focusedIndex]);
        }
        break;
      default:
        break;
    }
  }
  
  focusItem(index) {
    // First, remove focus (or any styling) from the previously focused item
    const previouslyFocused = this.customDropdown.querySelector(".focused");
    if (previouslyFocused) {
      previouslyFocused.classList.remove("focused");
    }
  
    // Now, add focus (or any styling) to the currently focused item
    const currentItem = this.customDropdown.querySelectorAll(".dropdown-item")[index];
    if (currentItem) {
      currentItem.classList.add("focused");
      currentItem.focus()
    }
  }
  
  handleDropdownItemClick(hieroglyph) {
    // Handle when a dropdown item is clicked
    this.outputElement.textContent += hieroglyph.hieroglyph;
    this.inputElement.value = "";
    this.customDropdown.innerHTML = ""; // Clear the dropdown
    this.inputElement.focus()
  }
}

customElements.define("hieroglyph-input", HieroglyphInput);

export { HieroglyphInput };