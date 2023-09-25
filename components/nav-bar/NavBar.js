class NavBar extends HTMLElement {
  constructor(){
    super();
    const baseUrl = new URL('../../', import.meta.url).href; // Navigate up to the root from /components/nav-bar/

    this.innerHTML = `
      <nav>
        <a href="${baseUrl}about.html">About</a>
        <a href="${baseUrl}data/gods/god-carousel/god-carousel.html">Gods</a>
        <a href="${baseUrl}data/temples/">Temples</a>
      </nav>
    `;
  }
}

export { NavBar };
customElements.define('nav-bar', NavBar);
