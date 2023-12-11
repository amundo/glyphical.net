export class TimeLine extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const src = this.getAttribute('src');
    fetch(src)
      .then(response => response.json())
      .then(data => this.renderTimeline(data));
  }

  renderTimeline(historians) {
    const svgNS = "http://www.w3.org/2000/svg";
    const scale = 600 / (850 - (-350));
    const svg = document.createElementNS(svgNS, "svg");
    const offset = 100;

    Object.keys(historians).forEach((name, idx) => {
      const { start, end } = historians[name];
      const startY = scale * (start + 350) + offset; // Adjust for the negative start year and offset
      const endY = scale * (end + 350) + offset;

      // Create a line for each historian's lifespan
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("class", "line");
      line.setAttribute("x1", startY);
      line.setAttribute("y1", idx * 50 + 20);
      line.setAttribute("x2", endY);
      line.setAttribute("y2", idx * 50 + 20);
      svg.appendChild(line);

      // Add red dots at the start and end of each line
      const startDot = document.createElementNS(svgNS, "circle");
      startDot.setAttribute("cx", startY);
      startDot.setAttribute("cy", idx * 50 + 20);
      startDot.setAttribute("r", 3); // Radius of the dot
      startDot.setAttribute("fill", "red");
      svg.appendChild(startDot);

      const endDot = document.createElementNS(svgNS, "circle");
      endDot.setAttribute("cx", endY);
      endDot.setAttribute("cy", idx * 50 + 20);
      endDot.setAttribute("r", 3); // Radius of the dot
      endDot.setAttribute("fill", "red");
      svg.appendChild(endDot);

      // Add year labels below the line to avoid overlap
      const startYearLabel = document.createElementNS(svgNS, "text");
      startYearLabel.setAttribute("class", "text");
      startYearLabel.setAttribute("x", startY - 10);
      startYearLabel.setAttribute("y", idx * 50 + 35); // Nudged down
      startYearLabel.textContent = start;
      svg.appendChild(startYearLabel);

      const endYearLabel = document.createElementNS(svgNS, "text");
      endYearLabel.setAttribute("class", "text");
      endYearLabel.setAttribute("x", endY + 5);
      endYearLabel.setAttribute("y", idx * 50 + 35); // Nudged down
      endYearLabel.textContent = end;
      svg.appendChild(endYearLabel);

      // Add historian's name
      const historianLabel = document.createElementNS(svgNS, "text");
      historianLabel.setAttribute("class", "text");
      historianLabel.setAttribute("x", 10); // Position the name a bit away from the left edge
      historianLabel.setAttribute("y", idx * 50 + 25);
      historianLabel.textContent = name;
      svg.appendChild(historianLabel);
    });

    this.appendChild(svg);
  }
}

customElements.define('time-line', TimeLine);
