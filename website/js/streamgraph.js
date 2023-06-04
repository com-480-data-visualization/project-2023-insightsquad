// Set size constants
var totWidth = 1170,
    totHeight = 600;
var margins = {top: 20, right: 10, bottom: 0, left: 10};
var width = totWidth ;
    height = totHeight; 

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
      .attr("x", width-30)
      .attr("y", height-30)
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


  const palettes = {
    1: ['#007f5f', '#2b9348', '#55a630', '#80b918', '#aacc00', '#bfd200', '#d4d700', '#dddf00', '#eeef20', '#ffff3f'],
    2: ['#7400b8', '#6930c3', '#5e60ce', '#5390d9', '#4ea8de', '#48bfe3', '#56cfe1', '#64dfdf', '#72efdd', '#80ffdb'],
    3: ['#012a4a', '#013a63', '#01497c', '#014f86', '#2a6f97', '#2c7da0', '#468faf', '#61a5c2', '#89c2d9', '#a9d6e5'],
    4: ['#ff7b00', '#ff8800', '#ff9500', '#ffa200', '#ffaa00', '#ffb700', '#ffc300', '#ffd000', '#ffdd00', '#ffea00'],
    5: ['#033270', '#1368aa', '#4091c9', '#9dcee2', '#fedfd4', '#f29479', '#f26a4f', '#ef3c2d', '#cb1b16', '#65010c'],
    6: ['#b76935', '#a56336', '#935e38', '#815839', '#6f523b', '#5c4d3c', '#4a473e', '#38413f', '#263c41', '#143642'],
    7: ['#eb5e28', '#f27f34', '#f9a03f', '#f6b049', '#f3c053', '#a1c349', '#94b33d', '#87a330', '#799431', '#6a8532'],
    8: ['#264653', '#287271', '#2a9d8f', '#8ab17d', '#babb74', '#e9c46a', '#efb366', '#f4a261', '#ee8959', '#e76f51'],
    9: ['#0c3e5e', '#155b87', '#2d92d1', '#74bbe8', '#97d1f4', '#0c5e50', '#158774', '#2ed1b5', '#74e8d4', '#97f4e5'],
    10: ['#00193a', '#002b53', '#023f73', '#034780', '#7a0213', '#a10220', '#bf0a26', '#cd0c2b', '#131313', '#262626'],
    11: ['#ff0072', '#ff177f', '#ff2e8c', '#ff4598', '#ff5ca5', '#ff74b2', '#ff8bbf', '#ffa2cb', '#ffb9d8', '#ffd0e5'],
    12: ['#8ecae6', '#219ebc', '#126782', '#023047', '#ffb703', '#fd9e02', '#fb8500', '#bb3e03', '#ae2012', '#9b2226'],
    13: ['#70b8ff', '#429bfa', '#147df5', '#095dd7', '#0000ff', '#0000b8', '#00008f', '#000079', '#000052', '#00003d'],
    14: ['#f72585', '#b5179e', '#7209b7', '#560bad', '#480ca8', '#3a0ca3', '#159f91', '#1bccba', '#1ee3cf', '#92f2e8'],
    15: ['#f2636a', '#dc4b4f', '#c63333', '#e94900', '#ef6803', '#f58606', '#c1b225', '#72a85f', '#229e99', '#36a7a2'],
    16: ['#5c0000', '#751717', '#ba0c0c', '#ff0000', '#ffebeb', '#ecffeb', '#27a300', '#2a850e', '#2d661b', '#005c00'],
    17: ['#643100', '#763a00', '#7f3e00', '#914600', '#af5500', '#b96619', '#c27731', '#cb8849', '#d49961', '#eacaae'],
  };
  // choose a random color palette for the nodes 
  const palette = palettes[Math.floor(Math.random() * 17) + 1];
  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(palette);

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
