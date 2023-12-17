import { parseLink } from "../web-link-list/parse-links.js"

class WebLink extends HTMLElement {
  constructor(){
    super()
    this.link = null
    this.listen()
  }

  set data(link){
    this.link = link
    this.render()
  }

  get data(){
    return this.link
  }

  connectedCallback() {

  }

  render() {
    this.innerHTML = ''

    // Create the link element
    const a = document.createElement('a')
    a.href = this.data.url
    a.textContent = this.data.title
    a.classList.add('link')
    a.target = '_blank' // Open in new tab

    const descriptionP = document.createElement('p')
    descriptionP.textContent = this.data.description
    descriptionP.classList.add('description')

    const tagsUL = document.createElement('ul')
    tagsUL.classList.add('tags')

    this.data.tags.forEach(tag => {
      const tagButton = document.createElement('button')
      tagButton.textContent = tag
      tagButton.classList.add('tag')
      let li = document.createElement('li')
      li.append(tagButton)
      tagsUL.append(li) 
    })

    let urlP = document.createElement('p')
    urlP.textContent = this.data.url
    urlP.classList.add('url')

    this.append(a)

    this.append(urlP)
    this.append(descriptionP)
    this.append(tagsUL)
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches('button.tag')){
        let tag = clickEvent.target.textContent
        let tagEvent = new CustomEvent('tag-click', {
          detail: tag,
          bubbles: true
        })
        this.dispatchEvent(tagEvent)
      }
    })
  }
}

export { WebLink }
customElements.define('web-link', WebLink)
