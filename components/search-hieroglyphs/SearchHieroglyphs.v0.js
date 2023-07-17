import { HieroglyphView } from "./hieroglyph-view/HieroglyphView.js"

export class SearchHieroglyphs extends HTMLElement {
  constructor() {
    super()
    this.attachTemplate()
    this.resultsContainer = this.querySelector("#results")
    this.searchForm = this.querySelector("#search-form")
    this.searchInput = this.querySelector("#search-input")
    this.searchForm.addEventListener("submit", this.handleSearch.bind(this))
  }

  attachTemplate() {
    const template = document.querySelector("#SearchHieroglyphs-template")
    const templateContent = template.content
    this.appendChild(templateContent.cloneNode(true))
  }

  handleSearch(event) {
    event.preventDefault()
    const searchQuery = this.searchInput.value

    if (!this.hieroglyphsData) {
      console.log("Hieroglyph data not yet fetched.")
      return
    }

    const hieroglyphs = this.hieroglyphsData.hieroglyphs
    const exactMatch = hieroglyphs
      .find((hieroglyph) => hieroglyph.description === searchQuery)

    const substringMatches = hieroglyphs
      .filter((hieroglyph) => hieroglyph !== exactMatch)
      .filter((hieroglyph) => hieroglyph.description.includes(searchQuery))

    this.renderResults(searchQuery, exactMatch, substringMatches)
  }

  async connectedCallback() {
    try {
      const response = await fetch("../data/hieroglyphs.json")
      if (!response.ok) {
        throw new Error(`HttpError: ${response.status} ${response.statusText}`)
      }
      this.hieroglyphsData = await response.json()
    } catch (error) {
      console.log(`Error fetching ${response.url}:`, error)
    }
  }

  renderResults(query, exactMatch, substringMatches) {
    this.resultsContainer.innerHTML = ""

    const resultsCount = substringMatches.length
    const resultsInfo = document.createElement("div")
    resultsInfo.textContent =
      `Your search for "${query}" had ${resultsCount} result${
        resultsCount !== 1 ? "s" : ""
      }.`
    this.resultsContainer.appendChild(resultsInfo)

    if (exactMatch) {
      const exactMatchContainer = document.createElement("div")
      exactMatchContainer.classList.add("result-item", "exact-match")
      exactMatchContainer.innerHTML = `
        <div class="hieroglyph">${exactMatch.hieroglyph}</div>
        <div class="description">${exactMatch.description}</div>
      `
      this.resultsContainer.appendChild(exactMatchContainer)
    }

    if (substringMatches.length > 0) {
      const substringMatchesContainer = document.createElement("div")
      substringMatchesContainer.classList.add(
        "result-item",
        "substring-matches",
      )

      substringMatches.forEach((substringMatch) => {
        const matchItem = document.createElement("div")
        matchItem.classList.add("match-item")
        matchItem.innerHTML = `
          <div class="hieroglyph">${substringMatch.hieroglyph}</div>
          <div class="description">${substringMatch.description}</div>
        `
        substringMatchesContainer.appendChild(matchItem)
      })

      this.resultsContainer.appendChild(substringMatchesContainer)
    }
  }
}

customElements.define("search-hieroglyphs", SearchHieroglyphs)
