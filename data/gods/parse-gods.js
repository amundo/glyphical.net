// run at https://en.wikipedia.org/wiki/List_of_Egyptian_deities

let getImageSrc = async url => {
  let response = await fetch(url)
  let html = await response.text()
  let dom = new DOMParser().parseFromString(html, 'text/html')
  let img = dom.querySelector('.infobox-image img')
  if(!img){ return }

  let src = img.src
	return  src
}

let lis = Array.from(document.querySelectorAll('.mw-body-content li:has(b)'))
  .filter(li => li.textContent.includes(' - '))
  .filter(li => li.querySelector("b a"))
  .map(li => {
  	li.querySelectorAll('sup')?.forEach(sup => sup.remove())
	  return li
	})

let gods = await Promise.all(lis.map(async li => {
  let url = li.querySelector("b a").href
  console.log(`spidering… ${url}`)
  let src = await getImageSrc(url)
//   console.log(`src: ${src}`)

  src = src || ""
  let name = li.querySelector("b").textContent
  let description = li.textContent.trim().split(' - ')[1]
  return {
    name,
    description,
    url,
    src
  }
}))

let metadata = { title: "Egyptian Gods", parsedWith: "parse-gods.js", url: document.location.href}
console.log(JSON.stringify({metadata, gods}, null, 2))