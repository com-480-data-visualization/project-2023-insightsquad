// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = document.getElementsByClassName("row")[0].offsetWidth,
  height = 1000,
  tile = d3.treemapResquarify
  fontSize = "16px"
  colorsAndroid = d3.scaleOrdinal()
    .range(["#6eb728", "#589220", "#426d18", "#8bc552", "#a8d37e"]);
  colorsApple = d3.scaleOrdinal()
    .range(["#2359b5", "#1c4790", "#15356c", "#4e7ac3", "#7b9bd2"]);

// Read data
var android_data = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/data/play_store_category_count.csv'
var apple_data = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/data/apple_store_category_count.csv'
  
function update(data, isAndroid) {
  // Remove previous svg
  d3.select("#treemap").selectAll("svg").remove()

  // append the svg object to the body of the page
  var svgTreemap = d3.select("#treemap")
  .append("svg")
    .attr("viewBox", [-margin.left, -margin.bottom, width, height])
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


  console.log(data)

  // stratify the data: reformatting for d3.js
  var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
  root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

  root.each(function(d) {
    d.data.percentage = (d.value / root.value) * 100
  })

  // Sort the leaves
  root.sort((a, b) => d3.descending(a.value, b.value))

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .tile(tile)
    .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
    .padding(4)
    .round(true)
    (root)

  // Tooltip
  var tooltip = d3.select("body").append("div")
    .style("position", "absolute")
    .style("pointer-events", "none")
    .style("visibility", "hidden")
    .style("background-color", "rgba(0, 0, 0, 0.8)")
    .style("color", "#fff")
    .style("padding", "5px")
    .style("font-size", fontSize)
    .style("border-radius", "3px");

  // use this information to add rectangles:
  var tiles = svgTreemap.selectAll("rect")
    .data(root.leaves())

  tiles.exit().remove()

  tiles
    .enter()
    .append("rect")
    .attr("x", function (d) { return d.x0 })
    .attr("y", function (d) { return d.y0 })
    .attr("width", function (d) { return d.x1 - d.x0 })
    .attr("height", function (d) { return d.y1 - d.y0 })
      .style("fill", function(d) { 
        if (isAndroid) {
          return colorsAndroid(d.data.name)
        }
        else {
          return colorsApple(d.data.name)
        }
      })
      .on("mouseover", function(d) {
        tooltip.html(d.data.name + "<br>" + d.data.value + " apps" + "<br>" + d.data.percentage.toFixed(2) + "%")
        tooltip.style("visibility", "visible")
      })
      .on("mousemove", function() {
        tooltip.style("top", (d3.event.pageY+10)+"px").style("left",(d3.event.pageX+10)+"px")
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden")
      });

  // and to add the text labels
  var textLabels = svgTreemap.selectAll("text")
    .data(root.leaves())

  textLabels.exit().remove()

  textLabels
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0 + 8})    // +8 to adjust position (more right)
      .attr("y", function(d){ return d.y0 + 20})    // +20 to adjust position (lower)
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .attr("opacity", 1)
      .text(function(d){ 
        var name = d.data.name
        var width = d.x1 - d.x0
        var textWidth = getTextWidth(name, fontSize) + margin.right
        var truncatedName = name

        if (textWidth > width) {
          var substringLength = findMaxSubstringLength(name, width - margin.right, fontSize)

          if (substringLength > 1) {
            truncatedName = name.substring(0, findMaxSubstringLength(name, width - margin.right, fontSize)) + "..."
          }
          else {
            truncatedName = ""
          }
        }
        return truncatedName
      })
      .attr("font-size", fontSize)
      .attr("fill", "white")
}

// Helper function to find the maximum substring length that fits within the desired width
function findMaxSubstringLength(text, desiredWidth, fontSize) {
  var low = 0;
  var high = text.length - 1;
  var maxSubstrLength = 0;

  while (low <= high) {
    var mid = Math.floor((low + high) / 2);
    var substr = text.substr(0, mid + 1);
    var width = getTextWidth(substr, fontSize) + margin.right + margin.left;

    if (width <= desiredWidth) {
      maxSubstrLength = mid + 1;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return maxSubstrLength;
}

// Helper function to get the width of a text element
function getTextWidth(text, fontSize) {
  var container = d3.select("body")
    .append("svg")
    .attr("visibility", "hidden")
    .style("position", "absolute")
    .style("width", "auto")
    .style("height", "auto");

  var textElement = container.append("text")
    .attr("font-size", fontSize)
    .text(text);

  var width = textElement.node().getComputedTextLength();

  container.remove();

  return width;
}

d3.select("#android_button_treemap").on("click", function() {
  d3.csv(android_data, function(data) {
    update(data, true)
  })
})

d3.select("#apple_button_treemap").on("click", function() {
  d3.csv(apple_data, function(data) {
    update(data, false)
  })
})

d3.csv(android_data, function(data) {
  update(data, true)
})
