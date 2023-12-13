class GodCarousel extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <header>
      <a href="" class=citation-link></a>
    </header>
    <nav class=previous-nav><button class=previous-button>&lt;</button></nav>
    <nav class=next-nav><button class=next-button>&gt;</button></nav>
    <figure class=god-image>
      <img src>
    </figure>
    <div class=god-info>
      <h2 class=god-name></h2>
      <p class=god-description></p>
      <div class=progress-meter></div>
    </div>
    `;
    this.listen();
  }

  async fetch(url) {
    let response = await fetch(url);
    let data = await response.json();
    this.data = data;
  }

  connectedCallback() {
  }

  static get observedAttributes() {
    return ["src"];
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    console.log(attribute);
    if (attribute == "src") {
      this.fetch(newValue);
    }
  }

  set data({ metadata, gods }) {
    this.gods = gods
      .filter((god) => god.src);
    this.metadata = metadata;
    this.render();
  }

  get data() {
    return {
      gods: this.gods,
      metadata: this.metadata,
    };
  }

  render() {
    this.show(Math.floor(Math.random() * this.gods.length));
  }

  show(n) {
    let god = this.gods[n];
    this.querySelector(".god-name").textContent = god.name;
    this.querySelector(".god-description").textContent = god.description;
    this.querySelector(".god-image img").src = god.src;
    this.querySelector("a.citation-link").href = god.url;
    this.querySelector("a.citation-link").textContent = "Wikipedia";
  }
  listen() {
    this.addEventListener("click", (clickEvent) => {
      if (clickEvent.target.matches()) {
      }
    });
  }
}

export { GodCarousel };
customElements.define("god-carousel", GodCarousel);
