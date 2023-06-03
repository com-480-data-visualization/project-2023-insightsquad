// Set size constants
var totWidth = 860,
    totHeight = 600;
var margins = {top: 20, right: 10, bottom: 0, left: 10};
var width = totWidth - margins.left - margins.right,
    height = totHeight - margins.top - margins.bottom;

// Load data
var appStoreDataStreamgraph, playStoreDataStreamgraph, editorsChoiceDataStreamgraph
var appStoreCRDataStreamgraph, playStoreCRDataStreamgraph, editorsChoiceCRDataStreamgraph

var appStorePathStreamgraph = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/streamgraph/apple_store_grouped_grouped.csv'
var playStorePathStreamgraph = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/streamgraph/play_store_grouped_grouped.csv'
var editorsChoicePathStreamgraph = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/streamgraph/editors_choice_grouped_grouped.csv'
var appStoreCRPathStreamgraph = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/streamgraph/apple_store_cr_grouped.csv'
var playStoreCRPathStreamgraph = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/streamgraph/play_store_cr_grouped.csv'
var editorsChoiceCRPathStreamgraph = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/streamgraph/editors_choice_cr_grouped.csv'


d3.csv(appStorePathStreamgraph, function(data) {
  appStoreDataStreamgraph = data
  // console.log("appStoreDataStreamgraph READ")
})
d3.csv(playStorePathStreamgraph, function(data) {
  playStoreDataStreamgraph = data
  // console.log("playStoreDataStreamgraph READ")
})
d3.csv(editorsChoicePathStreamgraph, function(data) {
  editorsChoiceDataStreamgraph = data
  // console.log("editorsChoiceDataStreamgraph READ")
})
d3.csv(appStoreCRPathStreamgraph, function(data) {
  appStoreCRDataStreamgraph = data
  // console.log("appStoreCRDataStreamgraph READ")
})
d3.csv(playStoreCRPathStreamgraph, function(data) {
  playStoreCRDataStreamgraph = data
  // console.log("playStoreCRDataStreamgraph READ")
})
d3.csv(editorsChoiceCRPathStreamgraph, function(data) {
  editorsChoiceCRDataStreamgraph = data
  // console.log("editorsChoiceCRDataStreamgraph READ")
})

var sliderGenresPathMap = {
  1: playStorePathStreamgraph,
  2: appStorePathStreamgraph,
  3: editorsChoicePathStreamgraph
}
var sliderCRPathMap = {
  1: playStoreCRPathStreamgraph,
  2: appStoreCRPathStreamgraph,
  3: editorsChoiceCRPathStreamgraph
}
var sliderRadiusMap = {
  1: 250000,
  2: 150000,
  3: 100
}
var sliderCRRadiusMap = {
  1: 450000,
  2: 250000,
  3: 200
}

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
    .attr("transform", "translate(0," + height*0.9 + ")")
    .call(d3.axisBottom(x)
      .tickSize(-height*0.80)
      .tickValues([2008, 2010, 2012, 2014, 2016, 2018, 2020])
      .tickFormat(d3.format("d")))
    .select(".domain").remove()

  // X axis labels
  svgStreamgraph.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height-10)
      .text("Time (year)");

  // Y axis
  var y = d3.scaleLinear()
    .domain([-dataRadius, dataRadius])
    .range([height, 0]);
  
  // Add Y axis label:
  svgStreamgraph.append("text")
    .attr("class", "chart-label")
    .attr("x", -(margins.left)*0.65)
    .attr("y", -(margins.top/8))
    .attr("text-anchor", "start")
    .attr("font-size", "20px")
    .text("Genres of newly created apps")

  // Customize tick lines
  svgStreamgraph.selectAll(".tick line").attr("stroke", "#b8b8b8")
  
  var keys = data.columns.slice(1)

  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]);

  //stack the data?
  var stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)
    (data)

  // create a tooltip
  var Tooltip = svgStreamgraph
    .append("text")
    .attr("x", 3)
    .attr("y", 75)
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

var sliderStreamgraph1 = d3.select("#slider-streamgraph1")
var sliderStreamgraph2 = d3.select("#slider-streamgraph2")

function updateStreamgraphOnSliderChange() {
  // Remove previous svg
  d3.select("#streamgraph").selectAll("svg").remove()
  // Build new svg
  svgStreamgraph = d3.select("#streamgraph")
  .append("svg")
    .attr("width", totWidth)
    .attr("height", totHeight)
  .append("g")
    .attr("transform",
          "translate(" + margins.left + "," + margins.top + ")");

  var sliderValue1 = parseInt(sliderStreamgraph1.node().value)
  var sliderValue2 = parseInt(sliderStreamgraph2.node().value)
  
  if (sliderValue2 === 1) {
    switch (sliderValue1) {
      case 1:
        buildStreamgraph(playStoreDataStreamgraph, sliderRadiusMap[sliderValue1])
        break
      case 2:
        buildStreamgraph(appStoreDataStreamgraph, sliderRadiusMap[sliderValue1])
        break
      case 3:
        buildStreamgraph(editorsChoiceDataStreamgraph, sliderRadiusMap[sliderValue1])
        break
    }
  }
  else if (sliderValue2 === 2) {
    switch (sliderValue1) {
      case 1:
        buildStreamgraph(playStoreCRDataStreamgraph, sliderCRRadiusMap[sliderValue1])
        break
      case 2:
        buildStreamgraph(appStoreCRDataStreamgraph, sliderCRRadiusMap[sliderValue1])
        break
      case 3:
        buildStreamgraph(editorsChoiceCRDataStreamgraph, sliderCRRadiusMap[sliderValue1])
        break
    }
  }

}

sliderStreamgraph1.on("input", updateStreamgraphOnSliderChange)
sliderStreamgraph2.on("input", updateStreamgraphOnSliderChange)

function initializeStreamgraph() {
  var sliderValue1 = parseInt(sliderStreamgraph1.node().value)
  var sliderValue2 = parseInt(sliderStreamgraph2.node().value)

  if (sliderValue2 === 1) {
    d3.csv(sliderGenresPathMap[sliderValue1], function(data) {
      buildStreamgraph(data, sliderRadiusMap[sliderValue1])
    })
  }
  else if (sliderValue2 === 2) {
    d3.csv(sliderCRPathMap[sliderValue1], function(data) {
      buildStreamgraph(data, sliderCRRadiusMap[sliderValue1])
    })
  }
}

initializeStreamgraph()
