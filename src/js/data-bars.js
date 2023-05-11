import * as d3 from "d3";

function createBars() {
  // set the dimensions and margins of the graph
  const margin = { top: 60, right: 30, bottom: 70, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#bars-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Initialize the X axis
  const x = d3.scaleBand().range([0, width]).padding(0.2);
  const xAxis = svg.append("g").attr("transform", `translate(0,${height})`);

  // Initialize the Y axis
  const y = d3.scaleLinear().range([height, 0]);
  const yAxis = svg.append("g").attr("class", "myYaxis");

  // Add X axis label:
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 40)
    .text("Année");

  // Add Y axis label:
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", -20)
    .text("Nombre de médailles")
    .attr("text-anchor", "start");

  // A function that create / update the plot for a given variable:
  function update(selectedVar) {
    // Parse the Data
    d3.csv("/data/data-bars.csv").then(function (data) {
      // X axis
      x.domain(data.map((d) => d.group));
      const tickValues = data
        .map((d, i) => (i % 2 === 0 ? d.group : null))
        .filter((d) => d !== null);
      xAxis
        .transition()
        .duration(1000)
        .call(d3.axisBottom(x).tickValues(tickValues));

      // Add Y axis
      //y.domain([0, d3.max(data, (d) => +d[selectedVar])]);
      y.domain([0, 6]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y).ticks(6).tickFormat(d3.format("d")));

      // variable u: map data to existing bars
      const u = svg.selectAll("rect").data(data);

      // update bars

      u.join("rect")
        .transition()
        .duration(1000)
        .attr("x", (d) => x(d.group))
        .attr("y", (d) => y(d[selectedVar]))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d[selectedVar]))
        .attr("fill", (d) => {
            switch (selectedVar) {
                case "var1":
                  return"#FFE654";
                case "var2":
                  return "#C0C0C0";
                case "var3":
                  return "#B85D0D";
              }
        });
    });
  }

  // Initialize plot
  update("var1");

  //fonction pour que les boutons fonctionnent avec n'imp
  var boutons = document.querySelectorAll(".bars-button");

  // Pour chaque bouton, ajoute un événement de clic pour afficher le graph correspondant
  boutons.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      // Récupère l'id des données correspondantes
      var buttonId = this.getAttribute("id");

      // Affiche les données correspondantes
      update(buttonId);
    });
  });
}

export { createBars };
