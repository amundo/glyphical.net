// Import the necessary functions from the deno_dom library
import { DOMParser, Element } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

function flattenTable(table) {
    const matrix = [];

    // Helper function to set the cell in the matrix, expanding it if necessary.
    const setMatrix = (row, col, cell) => {
        while (row >= matrix.length) {
            matrix.push([]);
        }
        while (col >= matrix[row].length) {
            matrix[row].push(null);
        }
        matrix[row][col] = cell;
    };

    // Get all the rows in the table
    const rows = table.querySelectorAll('tr');

    rows.forEach((tr, i) => {
        const cells = tr.querySelectorAll('td, th');
        let colIndex = 0;

        cells.forEach((cell) => {
            while (matrix[i] && matrix[i][colIndex]) {
                colIndex++; // Find the next free column in this row
            }

            const rowspan = Number(cell.getAttribute('rowspan')) || 1;
            const colspan = Number(cell.getAttribute('colspan')) || 1;

            for (let r = i; r < i + rowspan; r++) {
                for (let c = colIndex; c < colIndex + colspan; c++) {
                    setMatrix(r, c, cell.cloneNode(true)); // Clone and place the cell
                }
            }

            // Remove the rowspan/colspan attributes
            cell.removeAttribute('rowspan');
            cell.removeAttribute('colspan');

            colIndex++;
        });
    });

    // Rebuild the table using the matrix
    while (table.firstChild) {
        table.removeChild(table.firstChild); // Clear the table more safely
    }
    matrix.forEach((row) => {
        const tr = table.ownerDocument.createElement('tr'); // Create a new row
        row.forEach((cell) => {
            if (cell) { // If it's not a placeholder
                tr.appendChild(cell);
            } else {
                // Append an empty cell if necessary
                tr.appendChild(table.ownerDocument.createElement('td'));
            }
        });
        table.appendChild(tr); // Append the new row to the table
    });
}

// Example usage:
// const document = new DOMParser().parseFromString('<table></table>', 'text/html');
// const table = document.querySelector('table');
// flattenTable(table);


export {flattenTable}