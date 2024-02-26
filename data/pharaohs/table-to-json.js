let tableToJSON = (table, columnNames = null) => {
  // Validate input parameters
  if (table.tagName !== "TABLE") {
    throw new Error("Invalid input: table must be an HTMLTableElement");
  }

  // Select all table rows
  let trs = Array.from(table.querySelectorAll("tr"));

  // Check if there are rows in the table
  if (trs.length === 0) {
    throw new Error("Table has no rows.");
  }

  // // Function to check for rowspan or colspan attributes in cells
  // const checkRowColSpan = (cell) => {
  //   if (cell.hasAttribute('rowspan') || cell.hasAttribute('colspan')) {
  //     throw new Error('Table contains cells with rowspan or colspan attributes, which are not supported.');
  //   }
  // };

  // Extract column headers from the first row
  let columnHeaders = Array.from(trs[0].querySelectorAll("td,th"))
    .map((cell) => {
      // checkRowColSpan(cell); // Check for rowspan or colspan
      return cell.textContent.trim();
    });

  // Check if custom column names are provided
  if (columnNames) {
    if (
      !Array.isArray(columnNames) || columnNames.length !== columnHeaders.length
    ) {
      throw new Error(
        "Invalid columnNames parameter. It must be an array with the same length as the number of columns.",
      );
    }
    columnHeaders = columnNames;
  }

  // // Extract row headers from the remaining rows
  // let rowHeaders = trs.slice(1).map((row) => {
  //   let cells = Array.from(row.querySelectorAll("td,th"));
  //   cells.forEach(checkRowColSpan); // Check for rowspan or colspan in row cells

  //   let headerCell = cells.shift(); // Get the first cell as the row header
  //   return headerCell.textContent.trim();
  // });

  // Extract data and convert it into JSON format
  let data = trs.slice(1).map((row) => {
    let cells = Array.from(row.querySelectorAll("td,th"));
    // cells.forEach(checkRowColSpan); // Check for rowspan or colspan in row cells

    let entries = columnHeaders.map((header, i) => [
      header,
      cells[i]?.textContent.trim() || "",
    ]);

    let item = Object.fromEntries(entries);
    return item;
  });

  return data;
};
export { tableToJSON };
