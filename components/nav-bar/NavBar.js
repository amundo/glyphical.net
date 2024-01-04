class NavBar extends HTMLElement {
  constructor(){
    super();
    const baseUrl = new URL('../../', import.meta.url).href; // Navigate up to the root from /components/nav-bar/

    this.innerHTML = `
      <nav>
        <a tabindex="-1" href="${baseUrl}index.html">Home</a>
        <a tabindex="-1" href="${baseUrl}about.html">About</a>
        <a tabindex="-1" href="${baseUrl}type/index.html">Type</a>
        <a tabindex="-1" href="${baseUrl}data/categories.html">Categories</a>
        <a tabindex="-1" href="${baseUrl}quizzes/">Quizzes</a>
        <a tabindex="-1" href="${baseUrl}links/links.html">Links</a>
        <a tabindex="-1" href="${baseUrl}games/index.html">Games</a>
        <a tabindex="-1" href="${baseUrl}coptic/lambdin/">ⲧⲙⲛ̅ⲧⲣⲙ̅ⲛ̅ⲕⲏⲙⲉ</a>
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
