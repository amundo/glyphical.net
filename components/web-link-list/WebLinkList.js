import { WebLink } from "../web-link/WebLink.js"
import { addLinkToDB, getAllLinksFromDB } from "./link-list-db.js"
import {parseLinks} from './parse-links.js'

class WebLinkList extends HTMLElement {
  constructor() {
    super()
    this.links = []
    this.filteredLinks = []
    this.searchBar = null

    this.searchBar = document.createElement("input")
    this.searchBar.type = "search"
    this.searchBar.placeholder =
      this.innerHTML =
        `
    <header class=web-link-list-header>
      <input type=search placeholder = 'Search... (e.g., "tag:unicode", "#unicode", "title:WikiHiero")'>
      <p>
        <button class=export-data-button>Export Data</button>
        <button class=add-link-button>Add Link</button>
      </p>
    </header>
    <section class=web-link-list-section>
      <ul class=link-list></ul>
    </section>
    `
    this.listen()
  }

  async fetch(url) {
    let response = await fetch(url)

    let plaintext = await response.text()
    let data = parseLinks(plaintext)

    this.data = data.links
    this.metadata = data.metadata
  }

  connectedCallback() {
  }

  static get observedAttributes() {
    return ["src"]
  }

  exportLinks() {
    const json = JSON.stringify(this.links, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const href = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = href
    link.download = "links_backup.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (attribute === "src") {
      let url = new URL(newValue, document.location.href).href
      this.fetch(url)
    }
  }

  set data(links) {
    this.links = links
    this.filteredLinks = links
    this.render()
  }

  get data() {
    return this.filteredLinks
  }

  clear(){
    this.querySelector(".link-list").innerHTML = ``
  }

  search(searchTerm){
    this.clear()

    if(this.querySelector('input[type=search]').value === ''){
      this.filteredLinks = this.links
      this.render()
      return
    }

    this.filteredLinks = this.links.filter((link) => {
      // Extend this logic to parse the dosection-specific language
      if (searchTerm.startsWith("title:")) {
        return link.title.toLowerCase().includes(searchTerm.slice(6))
      } else if (searchTerm.startsWith("desc:")) {
        return link.description.toLowerCase().includes(searchTerm.slice(5))
      } else if (searchTerm.startsWith("tag:") || searchTerm.startsWith("#")) {
        searchTerm = searchTerm
          .replace(/^tag:/, "") 
          .replace(/^#/, "")

        return link.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm)
        )
      } else {
        // Default plain text search
        return link.title.toLowerCase().includes(searchTerm) ||
          link.description.toLowerCase().includes(searchTerm) ||
          link.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      }
    })
    this.render()

  }

  handleSearch(event) {
    let searchTerm = event.target.value.toLowerCase()
    this.search(searchTerm)
  }

  async addLink(linkData) {
    let result = await addLinkToDB(linkData)
    let links = getAllLinksFromDB()
    this.render()
  }

  openAddLinkDialog() {
    const dialog = document.createElement("dialog")
    dialog.classList.add('add-link-dialog')
    dialog.innerHTML = `
      <form method="dialog">
        <label for="url">URL:</label>
        <input type="url" id="url" name="url" required>
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required>
        <label for="description">Description:</label>
        <textarea id="description" name="description" required></textarea>
        <label for="tags">Tags:</label>
        <input type="text" id="tags" name="tags"> <!-- Comma-separated -->
        <menu>
          <li><button type="submit">Add</button></li>
          <li><button type="reset">Cancel</button></li>
        </menu>
      </form>
    `
    dialog.querySelector("form").addEventListener('submit', submitEvent => {
      this.handleAddLinkFormSubmit(submitEvent)
    })

    this.append(dialog)

    dialog.showModal()

    dialog.onclose = () => {
      dialog.remove()
    }
  }

  handleAddLinkFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    const link = {
      url: form.url.value,
      title: form.title.value,
      description: form.description.value,
      tags: form.tags.value.split(",").map((tag) => tag.trim()), // Split tags by comma and trim whitespace
    }
    this.addLink(link)
    form.closest("dialog").close()
  }

  render() {
    // Clear and re-render the links based on filteredLinks
    let section = this.querySelector("section")
    let listContainer = this.querySelector(".link-list")

    // Iterate through the filteredLinks to append each WebLink
    this.filteredLinks.forEach((linkData) => {
      const webLink = document.createElement("web-link")
      webLink.data = linkData
      const listItem = document.createElement("li")
      listItem.append(webLink)
      listContainer.append(listItem)
    })
  }

  listen() {
    this.querySelector("input[type=search]")
      .addEventListener("input", (inputEvent) => this.handleSearch(inputEvent))

    this.addEventListener("click", (clickEvent) => {
      if (clickEvent.target.classList.contains("export-data-button")) {
        this.exportLinks()
      }

      if (clickEvent.target.classList.contains("add-link-button")) {
        this.openAddLinkDialog()
      }
    })

    this.addEventListener('tag-click', tagClickEvent => {
      let tag = tagClickEvent.detail
      this.querySelector('input[type=search]').value = `tag:${tag}`
      this.search(`tag:${tag}`)
    })
  }
}

customElements.define("web-link-list", WebLinkList)
export { WebLinkList }
