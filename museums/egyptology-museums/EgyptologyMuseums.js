class EgyptologyMuseums extends HTMLElement {
  static get observedAttributes() {
    return ['src'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'src') {
      this.fetchData(newValue);
    }
  }

  async fetchData(src) {
    try {
      const response = await fetch(src);
      this.data = await response.json();
      this.render();
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  }

  render() {
    // Clear the element
    this.innerHTML = '';

    const container = document.createElement('div');

    // Create title from metadata
    const title = document.createElement('h1');
    title.textContent = this.data.metadata.title;
    container.appendChild(title);

    // Create list of museums
    const list = document.createElement('ul');
    this.data.museums.forEach(museum => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = museum.url;
      link.textContent = `${museum.name} (${museum.country})`;
      listItem.appendChild(link);
      list.appendChild(listItem);
    });
    container.appendChild(list);

    // Append container to the web component
    this.appendChild(container);
  }
}

// Define the new element
customElements.define('egyptology-museums', EgyptologyMuseums);
