function wrapPrefix(prefix) {
  // Check if the style has already been added to avoid duplication
  if (!document.querySelector('#prefix-style')) {
    document.head.insertAdjacentHTML('beforeend', `<style id="prefix-style">.prefix {
      /* font-family: Noto Sans, sans-serif; */
      box-shadow: 0 0 0 2px black;
      font-family: inherit;
      font-size: inherit;
      display: inline-block;
      padding: .4rem;
      /* margin-right: .24rem; */
      clip-path: polygon(
        10% 10%, 
        90% 10%, 
        100% 50%,
        90% 90%, 
        10% 90%
      );
      background: pink;
      cursor: help;
    }</style>`);
  }

  // Select all 'td' elements and filter by those starting with the 'prefix'
  document.querySelectorAll('td')
    .forEach(td => {
      if (td.textContent.startsWith(prefix)) {
        let outerSpan = document.createElement('span');
        outerSpan.classList.add('prefix');
        
        // Create an inner span for the prefix itself
        let innerSpan = document.createElement('span');
        innerSpan.classList.add('c'); // Assuming 'c' class is intended for styling the content
        innerSpan.textContent = prefix;
        
        // Replace the prefix in the 'td' with the styled spans
        let prefixRegex = new RegExp(prefix, 'g');
        td.innerHTML = td.innerHTML.replace(prefixRegex, outerSpan.outerHTML);
        
        // Append the innerSpan to outerSpan after setting innerHTML to keep the reference intact
        outerSpan.append(innerSpan);
      }
    });
}

// Usage example: wrapPrefix('ⲟⲩ');
