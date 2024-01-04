const createColorReference = (cssString) => {
  // Extract all variable names and values from the CSS string
  const variablePattern = /(--[a-z-0-9]+):\s+(hsla?\([0-9%,\.\s]+\))/g;
  let match;
  const variables = [];
  while ((match = variablePattern.exec(cssString)) !== null) {
      variables.push({
          name: match[1],
          value: match[2]
      });
  }

  // Build the HTML content
  let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Color Reference</title>
  <style>
      ${cssString}
      body {
          font-family: 'Arial', sans-serif;
          margin: 20px;
      }
      .color-reference {
      }
      .color-card {
          box-sizing: border-box;
          display: grid;
          grid-template: 
            "swatch name" 2rem
            "swatch value" 2rem
          /  1fr    1fr;

          & .swatch { grid-area: swatch;}
          & .name { grid-area: name; }
          & .value { grid-area: value; }
      }
  </style>
</head>
<body>
  <div class="color-reference">
`;

  variables.forEach(variable => {
      htmlContent += `
      <article class="color-card">
        <div class=swatch style="background-color: var(${variable.name});"> </div>
        <code class=name>${variable.name}</code>
        <code class=value>${variable.value}</code>
      </article>
`;
  });

  htmlContent += `
  </div>
</body>
</html>
`;

  return htmlContent;
};

// For demonstration purposes, you can pass in your CSS string and see the resulting HTML
const cssFile = Deno.args[0]
const cssString = await Deno.readTextFile(cssFile)
const referenceHtml = createColorReference(cssString);
console.log(referenceHtml);

