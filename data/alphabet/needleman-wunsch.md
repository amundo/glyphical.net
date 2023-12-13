---
title: Investigating the Needleman-Wunsch algorithm for comparing alphabets
author: Patrick Hall
---


Implementation by ChatGPT <https://chat.openai.com/share/e3d4ade6-4136-4dd9-9ac4-618cd5bd355f>

```js
function needlemanWunsch(a, b, matchScore = 1, mismatchScore = -1, gapScore = -1) {
    const M = a.length;
    const N = b.length;
    const matrix = Array(M + 1).fill(null).map(() => Array(N + 1).fill(0));

    // Initialize the matrix with gap scores
    for (let i = 0; i <= M; i++) matrix[i][0] = i * gapScore;
    for (let j = 0; j <= N; j++) matrix[0][j] = j * gapScore;

    // Fill out the matrix
    for (let i = 1; i <= M; i++) {
        for (let j = 1; j <= N; j++) {
            const match = matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? matchScore : mismatchScore);
            const deleteChar = matrix[i - 1][j] + gapScore;
            const insertChar = matrix[i][j - 1] + gapScore;

            matrix[i][j] = Math.max(match, deleteChar, insertChar);
        }
    }

    // Backtrack to find alignment
    const alignment = [];
    let i = M;
    let j = N;
    while (i > 0 || j > 0) {
        if (i > 0 && matrix[i][j] === matrix[i - 1][j] + gapScore) {
            alignment.unshift([a[i - 1], '-']);
            i--;
        } else if (j > 0 && matrix[i][j] === matrix[i][j - 1] + gapScore) {
            alignment.unshift(['-', b[j - 1]]);
            j--;
        } else {
            alignment.unshift([a[i - 1], b[j - 1]]);
            i--;
            j--;
        }
    }

    return alignment;
}
```