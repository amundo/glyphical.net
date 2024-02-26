document.querySelectorAll('section.demo')
  .forEach((section, index) => {
    let pre = document.createElement('pre')
    let clone = section.cloneNode(true)
    clone.querySelector("h3.demo-heading").remove()
    pre.textContent = clone.innerHTML.trim()
    pre.classList.add('demo')
    section.after(pre)
  })