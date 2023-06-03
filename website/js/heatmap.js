// set the dimensions and margins of the graph
var marginHeatmap = {top: 20, right: 25, bottom: 30, left: 40},
  widthHeatmap = 800 - marginHeatmap.left - marginHeatmap.right,
  heightHeatmap = 450 - marginHeatmap.top - marginHeatmap.bottom;


// set the color scale
var colorRangeHeatmap = ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]

var dropMenuHeatmap = document.getElementById("category-donut")
var sliderHeatmap = d3.select("#slider-donut")

var androidCategories = ['Education', 'Music & Audio', 'Tools', 'Business', 'Entertainment', 'Lifestyle', 'Books & Reference', 'Personalization', 'Health & Fitness', 'Productivity', 'Shopping', 'Food & Drink', 'Travel & Local', 'Finance', 'Arcade', 'Puzzle', 'Casual', 'Communication', 'Sports', 'Social', 'News & Magazines', 'Photography', 'Medical', 'Action', 'Maps & Navigation', 'Simulation', 'Adventure', 'Educational', 'Art & Design', 'Auto & Vehicles', 'House & Home', 'Video Players & Editors', 'Events', 'Trivia', 'Beauty', 'Board', 'Racing', 'Role Playing', 'Word', 'Strategy', 'Card', 'Weather', 'Dating', 'Libraries & Demo', 'Casino', 'Music', 'Parenting', 'Comics'];
var appleCategories = ['Games', 'Business', 'Education', 'Utilities', 'Lifestyle', 'Food & Drink', 'Health & Fitness', 'Productivity', 'Entertainment', 'Shopping', 'Finance', 'Travel', 'Sports', 'Music', 'Medical', 'Photo & Video', 'Social Networking', 'News', 'Reference', 'Navigation', 'Stickers', 'Book', 'Weather', 'Graphics & Design', 'Developer Tools', 'Magazines & Newspapers'];
var editorsChoiceCategories = ['Education', 'Music & Audio', 'Tools', 'Business', 'Entertainment', 'Lifestyle', 'Books & Reference', 'Health & Fitness', 'Productivity', 'Shopping', 'Food & Drink', 'Travel & Local', 'Finance', 'Arcade', 'Puzzle', 'Casual', 'Communication', 'Sports', 'Social', 'News & Magazines', 'Photography', 'Medical', 'Action', 'Maps & Navigation', 'Simulation', 'Adventure', 'Educational', 'Art & Design', 'Auto & Vehicles', 'House & Home', 'Video Players & Editors', 'Events', 'Trivia', 'Beauty', 'Board', 'Racing', 'Role Playing', 'Word', 'Strategy', 'Card', 'Weather', 'Dating', 'Music', 'Parenting', 'Comics'];
var categoriesHeatmap = {
    1: androidCategories,
    2: appleCategories,
    3: editorsChoiceCategories
}

var pathHeatmap = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/heatmap/'
var androidDataPathHeatmap = pathHeatmap + 'heatmap_android_All.csv'
var editorsChoiceDataPathHeatmap = pathHeatmap + 'heatmap_editor_All.csv'

var androidDataHeatmap
var editorsChoiceDataHeatmap


d3.csv(androidDataPathHeatmap, function(data) {
    androidDataHeatmap = data
})

d3.csv(editorsChoiceDataPathHeatmap, function(data) {
    editorsChoiceDataHeatmap = data
})

androidCategories.forEach(function(category) {
    d3.csv(pathHeatmap + "heatmap_android_" + category + ".csv", function(data) {
      categoryFormatted = category.replace(/ /g, '').replace(/&/g, '')
      window["androidHeatmap" + categoryFormatted] = data
    })
})
  
editorsChoiceCategories.forEach(function(category) {
    d3.csv(pathHeatmap + "heatmap_editor_" + category + ".csv", function(data) {
      categoryFormatted = category.replace(/ /g, '').replace(/&/g, '')
      window["editorsChoiceHeatmap" + categoryFormatted] = data
    })
})

function updateHeatMapOnSliderChange() {

    var sliderValueHeatmap = parseInt(sliderHeatmap.node().value);


    switch (sliderValueHeatmap) {
        case 1:
            updateHeatmapChart(androidDataHeatmap)
            break;
        case 2:
            break;
        case 3:
            updateHeatmapChart(editorsChoiceDataHeatmap)
            break;
    }
}

sliderHeatmap.on("input", updateHeatMapOnSliderChange)
sliderHeatmap.on("change", updateCategoryOptions)

function updateHeatmapChart(data) {
    d3.select("#heatmap").selectAll("svg").remove();
    var svg = d3.select("#heatmap")
    .append("svg")
      .attr("width", width + marginHeatmap.left + marginHeatmap.right)
      .attr("height", height + marginHeatmap.top + marginHeatmap.bottom)
    .append("g")
      .attr("transform",
            "translate(" + marginHeatmap.left + "," + marginHeatmap.top + ")");
    
    //Read the data
    
    
      // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
      var myGroups = d3.map(data, function(d){return d.group;}).keys()
      var myVars = d3.map(data, function(d){return d.variable;}).keys()
    
      // Build X scales and axis:
      var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(myGroups)
        .padding(0.05);
      svg.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()
    
      // Build Y scales and axis:
      var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(myVars)
        .padding(0.05);
      svg.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()
    
      // Build color scale
        // get the max value of the third column of data
        
        // apply logaritmic scale to all values in the third column
        data.forEach(function(d) {

            d.value = +d.value;
            d.value = Math.log(d.value);
        });
        var maxValue = d3.max(data, function(d) { return +d.value; })
        var myColor = d3.scaleLinear()
        .range(["white", "blue"])
        .domain([1,maxValue])
        
    
      // create a tooltip
      var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
    
      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function(d) {
        tooltip
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove = function(d) {
        tooltip
          .html("The exact value of<br>this cell is: " + d.value)
          .style("left", (d3.mouse(this)[0]+70) + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
      }
      var mouseleave = function(d) {
        tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
      }
    
      // add the squares
      svg.selectAll()
        .data(data, function(d) {return d.group+':'+d.variable;})
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.group) })
          .attr("y", function(d) { return y(d.variable) })
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("width", x.bandwidth() )
          .attr("height", y.bandwidth() )
          .style("fill", function(d) { return myColor(d.value)} )
          .style("stroke-width", 4)
          .style("stroke", "none")
          .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

}

function updateHeatmapChartCategoryChange() {
    var dropMenuHeatmapValue = dropMenuHeatmap.value
    var sliderValueHeatmap = parseInt(sliderHeatmap.node().value);

    switch (sliderValueHeatmap) {
        case 1:
            if (dropMenuHeatmapValue == "All") {
                updateHeatmapChart(androidDataHeatmap)
            }
            else {
                updateHeatmapChart(window["androidHeatmap" + dropMenuHeatmapValue.replace(/ /g, '').replace(/&/g, '')])
            }
            break;
        case 2:
            break;
        case 3:
            if (dropMenuHeatmapValue == "All") {
                updateHeatmapChart(editorsChoiceDataHeatmap)
            }
            else {
                updateHeatmapChart(window["editorsChoiceHeatmap" + dropMenuHeatmapValue.replace(/ /g, '').replace(/&/g, '')])
            }
            break;
    }
}

dropMenuHeatmap.addEventListener('change', updateHeatmapChartCategoryChange)

function initializeHeatmapChart() {
var sliderValueHeatmap = parseInt(sliderHeatmap.node().value);
switch (sliderValueHeatmap) {
    case 1:
        d3.csv(androidDataPathHeatmap, function(data) {
            updateHeatmapChart(data)
        })
        break;
    case 2:
        break;
    case 3:
        d3.csv(editorsChoiceDataPathHeatmap, function(data) {
            updateHeatmapChart(data)
        })
        break;
  }
}

initializeHeatmapChart()