
let uncolspan = table => {

  let cloneSelf = node => { 
    let clone = node.cloneNode(true); 
    node.parentNode.insertBefore(clone, node)  
  }

  let colspanned = [... table.querySelectorAll('[colspan]')];
  colspanned.forEach(cs => { 
    let n = parseInt(cs.getAttribute('colspan')); 
    cs.setAttribute("colspan", 1); 
    for(let i=n; i>1; i--){ 
      cloneSelf(cs) 
    } 
  })

}

let unrowspan = table => {

  let spanningCells = [... table.querySelectorAll('[rowspan]')];
  spanningCells.forEach(spanningCell => { 
    let 
      spanCount = parseInt(spanningCell.getAttribute('rowspan')), 
      parentRow = spanningCell.parentNode;

    spanningCell.setAttribute("rowspan", 1); 

    for(let i=spanCount-1; i>0; i--){ 
      let nextRow = table.rows[parentRow.rowIndex + i];
      let empty = nextRow.insertCell(spanningCell.cellIndex);
      empty.outerHTML = spanningCell.outerHTML;
    } 
  })
  
}

let unspan = table => {
  unrowspan(table);
  uncolspan(table);
}


export {unspan}