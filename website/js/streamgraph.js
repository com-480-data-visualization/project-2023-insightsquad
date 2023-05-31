// Set size constants
var totWidth = 860,
    totHeight = 520;
var margins = {top: 20, right: 10, bottom: 0, left: 10};
var width = totWidth - margins.left - margins.right,
    height = totHeight - margins.top - margins.bottom;

// Load data
var appStoreData, playStoreData, editorsChoiceData

var appStorePath = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/streamgraph/apple_store_grouped_grouped.csv'
var playStorePath = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/streamgraph/play_store_grouped_grouped.csv'
var editorsChoicePath = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/streamgraph/editors_choice_grouped_grouped.csv'

d3.csv(appStorePath, function(data) {
  appStoreData = data
})
d3.csv(playStorePath, function(data) {
  playStoreData = data
})
d3.csv(editorsChoicePath, function(data) {
  editorsChoiceData = data
})

var appStoreDataRadius = 150000
var playStoreDataRadius = 250000
var editorsChoiceDataRadius = 100

// append the svg object to the body of the page
var svgStreamgraph = d3.select("#streamgraph")
  .append("svg")
    .attr("width", totWidth)
    .attr("height", totHeight)
  .append("g")
    .attr("transform",
          "translate(" + margins.left + "," + margins.top + ")");

function buildStreamgraph(data, dataRadius) {

  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year; }))
    .range([ 0, width ]);
  svgStreamgraph.append("g")
    .attr("transform", "translate(0," + height*0.8 + ")")
    .call(d3.axisBottom(x).tickSize(-height*.7).tickValues([2008, 2010, 2012, 2014, 2016, 2018, 2020]))
    .select(".domain").remove()

  // X axis labels
  svgStreamgraph.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height-30 )
      .text("Time (year)");

  // Y axis
  var y = d3.scaleLinear()
    .domain([-dataRadius, dataRadius])
    .range([height, 0]);
  
  // Add Y axis label:
  svgStreamgraph.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0, " + (height / 2) + ") rotate(-90)")
    .text("Genres of newly created apps");

  // Customize tick lines
  svgStreamgraph.selectAll(".tick line").attr("stroke", "#b8b8b8")
  
  var keys = data.columns.slice(1)

  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemeDark2);

  //stack the data?
  var stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)
    (data)

  // create a tooltip
  var Tooltip = svgStreamgraph
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .style("opacity", 0)
    .style("font-size", 17)

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip.style("opacity", 1)
    d3.selectAll(".myArea").style("opacity", .2)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d,i) {
    grp = keys[i]
    Tooltip.text(grp)
  }
  var mouseleave = function(d) {
    Tooltip.style("opacity", 0)
    d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
   }

  // Area generator
  var area = d3.area()
    .x(function(d) { return x(d.data.year); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })

  // Show the areas
  svgStreamgraph
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .attr("class", "myArea")
      .style("fill", function(d) { return color(d.key); })
      .attr("d", area)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
}

var sliderStreamgraph = d3.select("#slider-streamgraph")

function updateStreamgraphOnSliderChange() {
  // Remove previous svg
  d3.select("#streamgraph").selectAll("svg").remove()
  svgStreamgraph = d3.select("#streamgraph")
  .append("svg")
    .attr("width", totWidth)
    .attr("height", totHeight)
  .append("g")
    .attr("transform",
          "translate(" + margins.left + "," + margins.top + ")");

  var sliderValue = parseInt(sliderStreamgraph.node().value)

  if (sliderValue === 1) {
    buildStreamgraph(playStoreData, playStoreDataRadius)
  }
  else if (sliderValue === 2) {
    buildStreamgraph(appStoreData, appStoreDataRadius)
  }
  else if (sliderValue === 3) {
    update(editorsChoiceData, editorsChoiceDataRadius)
  }
}

sliderStreamgraph.on("input", updateStreamgraphOnSliderChange)

var sliderValue = parseInt(sliderStreamgraph.node().value)

if (sliderValue === 1) {
  d3.csv(playStorePath, function(data) {
    buildStreamgraph(data, playStoreDataRadius)
  })
}
else if (sliderValue === 2) {
  d3.csv(appStorePath, function(data) {
    buildStreamgraph(data, appStoreDataRadius)
  })
}
else if (sliderValue === 3) {
  d3.csv(editorsChoicePath, function(data) {
    update(data, editorsChoiceDataRadius)
  })
}