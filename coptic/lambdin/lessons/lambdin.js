import {SearchBook} from "../../../components/search-book/SearchBook.js"

addEventListener('click', clickEvent => {
  if(clickEvent.target.matches('#toggle-search-button')){
    let searchBook = document.querySelector('search-book')
    searchBook.open()
  }
})