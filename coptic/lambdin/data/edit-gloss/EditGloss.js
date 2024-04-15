class EditGloss extends HTMLElement {
  #word = {} // Initialize the private field to store word data

  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
    this.addEventListeners() // Call to add event listeners after the component is rendered
  }

  set data(wordData) {
    this.#word = wordData // Update the private field with the new word data
    this.render() // Re-render the component with the new data
  }

  get data() {
    return this.#word // Return the current word data
  }

  render() {
    if (!this.#word) return

    this.innerHTML = `
        <span class="form">${this.#word.form}</span>
        <input name="gloss" placeholder=gloss class="gloss-input" type="text" value="${
      this.#word.gloss || ""
    }">
    `
  }

  addEventListeners() {
    const input = this.querySelector("[name=gloss]") // Select the input element
    if (!input) return // If the input element is not found, do nothing

    // Add an event listener for the 'change' event
    this.addEventListener("input", (event) => {
      if(event.target.matches('input')) {
        this.#word.gloss = event.target.value // Update the gloss property of the word object
        // Dispatch a custom event with the updated gloss value when the input value changes
        this.dispatchEvent(
          new CustomEvent("update-gloss", {
            detail: { word: this.#word },
            bubbles: true, // Enable the event to bubble up through the DOM
            composed: true, // Allow the event to cross the shadow DOM boundary
          }),
        )
      }

      
    })
  }
}

customElements.define("edit-gloss", EditGloss) // Define the custom element

export { EditGloss } // Export the component class
