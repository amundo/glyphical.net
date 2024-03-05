import {SearchBook} from "../../../components/search-book/SearchBook.js"

addEventListener('click', clickEvent => {
  if(clickEvent.target.matches('#toggle-search-button')){
    let searchBook = document.querySelector('search-book')
    searchBook.open()
  }
})

addEventListener('keydown', keydownEvent => {
  // Check if the key pressed is '?'
  if (keydownEvent.key === '?') {
    const searchInput = document.querySelector('#search-input');
    
    // Check if the search input is currently focused
    if (document.activeElement !== searchInput) {
      // If the search input is not focused, activate the search box
      // and prevent the default '?' input
      keydownEvent.preventDefault();
      document.querySelector('button#toggle-search-button').click();
      
      // Optionally, focus the search input after opening
      searchInput.focus();
    }
    // If the search input is focused, do nothing special,
    // allowing the '?' to be typed into the field
  }
});
