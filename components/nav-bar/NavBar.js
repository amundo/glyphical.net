class NavBar extends HTMLElement {
  constructor(){
    super();
    const baseUrl = new URL('../../', import.meta.url).href; // Navigate up to the root from /components/nav-bar/

    this.innerHTML = `
      <nav>
        <a href="${baseUrl}index.html">Home</a>
        <a href="${baseUrl}about.html">About</a>
        <a href="${baseUrl}hieroglyph-input/hieroglyph-input.html">Type</a>
        <a href="${baseUrl}quizzes/">Quizzes</a>
      </nav>
    `;

    const notYet = `
    <a href="${baseUrl}data/determinatives/determinatives.html">Determinatives</a>
    <a href="${baseUrl}data/gods/god-carousel/god-carousel.html">Gods</a>
    <a href="${baseUrl}data/temples/">Temples</a>
    <a href="${baseUrl}data/pyramids/">Pyramids</a>
    <a href="${baseUrl}data/pharaohs/">Pharaohs</a>
    `
  }
}

export { NavBar };
customElements.define('nav-bar', NavBar);
