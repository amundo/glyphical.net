class ShowVideos extends HTMLElement {
  constructor() {
    super();
    this.videos = [];
  }

  static get observedAttributes() {
    return ['src']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'src' && oldValue !== newValue) {
      console.log(newValue)
      this.fetch(newValue)
    }
  }

  get src(){
    return this.getAttribute('src')
  }
  
  
  async fetch(src) {
    try {
      let url = new URL(src, document.location.href).href;
      const response = await fetch(url);
      const data = await response.json();
      this.videos = data;
      this.videos.forEach(video => {
        video.url = new URL(video.url, url).href;
      })
      this.renderVideos();
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  }

  renderVideos() {
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';

    for (const video of this.videos) {
      const li = document.createElement('li');

      const a = document.createElement('a');
      a.href = video.url;
      a.textContent = video.url.split('/').pop()

      li.append(a);
      ul.append(li);
    }

    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.style.width = '100%';

    this.innerHTML = '';
    this.appendChild(ul);
    this.appendChild(videoElement);

    this.listen()
  }
  listen() {
    const links = this.querySelectorAll('li a');
    const videoElement = this.querySelector('video');
    links.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        videoElement.src = event.target.href;
        videoElement.play();
      });
    });
  }

}
customElements.define('show-videos', ShowVideos);
export { ShowVideos }