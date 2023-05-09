import * as d3 from "d3";

function createPie(datas, colors) {
  // set the dimensions and margins of the graph
  const width = 200,
    height = 150,
    margin = 10;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  const radius = Math.min(width, height) / 2 - margin;

    //conteneur médaille complète
    const conteneurMedaille = d3
    .select("#pie-chart")
    .append("div")
    .attr("class", "medaille-container")

  //ruban
  const ruban = conteneurMedaille
    .append("svg")
    .attr("width", 135)
    .attr("height", 97)
    .attr("id", "ruban")
    .append("g")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "text-after-edge")
    ruban
    .append("path")
    .attr("d", "M97.3223 97L59.9402 0H0L37.3821 97H97.3223Z")
    .attr("fill", "#CCD6EB");
    ruban
    .append("path")
    .attr("d", "M134.704 0L97.3222 97H37.382L74.7641 0H134.704Z")
    .attr("fill", "#E9ECF5");

  // append the svg object to the div called 'my_dataviz'
  const svg = conteneurMedaille
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Datas
  const data = datas;
  //{ bloc: 9, difficulté: 20 };

  // set the color scale
  const color = d3.scaleOrdinal().range(colors);

  // Compute the position of each group on the pie:
  const pie = d3.pie().value(function (d) {
    return d[1];
  });
  const data_ready = pie(Object.entries(data));
  // Now I know that group A goes from 0 degrees to x degrees and so on.

  // shape helper to build arcs:
  const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

  // create a tooltip
  var Tooltip = conteneurMedaille
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("width", "20px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html(d.target.__data__.value)
      .style("left", (d3.pointer(this)[0]) + "px")
      .style("top", (d3.pointer(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }
  
  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll("mySlices")
    .data(data_ready)
    .join("path")
    .attr("d", arcGenerator)
    .attr("fill", function (d) {
      return color(d.data[0]);
    })
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

  // Now add the annotation. Use the centroid method to get the best coordinates
  svg
    .selectAll("mySlices")
    .data(data_ready)
    .join("text")
    .text(function (d) {
      return d.data[0];
    })
    .attr("transform", function (d) {
      return `translate(${arcGenerator.centroid(d)})`;
    })
    .style("text-anchor", "middle")
    .style("font-size", 17);
}

export { createPie };
