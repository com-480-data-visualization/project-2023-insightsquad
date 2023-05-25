// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = document.getElementsByClassName("column-left")[0].offsetWidth,
  height = 1000,
  tile = d3.treemapResquarify
  fontSize = "16px"
  colorsAndroid = d3.scaleOrdinal()
    .range(["#6eb728", "#589220", "#426d18", "#8bc552", "#a8d37e"]);
  colorsApple = d3.scaleOrdinal()
    .range(["#2359b5", "#1c4790", "#15356c", "#4e7ac3", "#7b9bd2"]);

var androidCategories = ['Education', 'Music & Audio', 'Tools', 'Business', 'Entertainment', 'Lifestyle', 'Books & Reference', 'Personalization', 'Health & Fitness', 'Productivity', 'Shopping', 'Food & Drink', 'Travel & Local', 'Finance', 'Arcade', 'Puzzle', 'Casual', 'Communication', 'Sports', 'Social', 'News & Magazines', 'Photography', 'Medical', 'Action', 'Maps & Navigation', 'Simulation', 'Adventure', 'Educational', 'Art & Design', 'Auto & Vehicles', 'House & Home', 'Video Players & Editors', 'Events', 'Trivia', 'Beauty', 'Board', 'Racing', 'Role Playing', 'Word', 'Strategy', 'Card', 'Weather', 'Dating', 'Libraries & Demo', 'Casino', 'Music', 'Parenting', 'Comics'];
var appleCategories = ['Games', 'Business', 'Education', 'Utilities', 'Lifestyle', 'Food & Drink', 'Health & Fitness', 'Productivity', 'Entertainment', 'Shopping', 'Finance', 'Travel', 'Sports', 'Music', 'Medical', 'Photo & Video', 'Social Networking', 'News', 'Reference', 'Navigation', 'Stickers', 'Book', 'Weather', 'Graphics & Design', 'Developer Tools', 'Magazines & Newspapers'];

var sliderTreemap = d3.select("#slider-treemap")

// Read data
var path = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/treemap/'
var androidDataPath = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/treemap/play_store_category_count.csv'
var appleDataPath = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/treemap/apple_store_category_count.csv'
var androidData
var apple_data
var androidTopAppsAction, androidTopAppsAdventure, androidTopAppsArcade, androidTopAppsArtDesign, androidTopAppsAutoVehicles, androidTopAppsBeauty, 
  androidTopAppsBoard, androidTopAppsBooksReference, androidTopAppsBusiness, androidTopAppsCard, androidTopAppsCasino, androidTopAppsCasual, androidTopAppsComics, 
  androidTopAppsCommunication, androidTopAppsDating, androidTopAppsEducation, androidTopAppsEducational, androidTopAppsEntertainment, androidTopAppsEvents, 
  androidTopAppsFinance, androidTopAppsFoodDrink, androidTopAppsHealthFitness, androidTopAppsHouseHome, androidTopAppsLibrariesDemo, androidTopAppsLifestyle, 
  androidTopAppsMapsNavigation, androidTopAppsMedical, androidTopAppsMusic, androidTopAppsMusicAudio, androidTopAppsNewsMagazines, androidTopAppsParenting, 
  androidTopAppsPersonalization, androidTopAppsPhotography, androidTopAppsPuzzle, androidTopAppsRacing, androidTopAppsRolePlaying, androidTopAppsShopping, 
  androidTopAppsSimulation, androidTopAppsSocial, androidTopAppsSports, androidTopAppsStrategy, androidTopAppsTools, androidTopAppsTravelLocal, androidTopAppsTrivia, 
  androidTopAppsVideoPlayersEditors, androidTopAppsWeather, androidTopAppsWord

var appleTopAppsBook, appleTopAppsBusiness, appleTopAppsDeveloperTools, appleTopAppsEducation, appleTopAppsEntertainment, appleTopAppsFinance, appleTopAppsFoodDrink,
  appleTopAppsGames, appleTopAppsGraphicsDesign, appleTopAppsHealthFitness, appleTopAppsLifestyle, appleTopAppsMagazinesNewspapers, appleTopAppsMedical, appleTopAppsMusic,
  appleTopAppsNavigation, appleTopAppsNews, appleTopAppsPhotoVideo, appleTopAppsProductivity, appleTopAppsReference, appleTopAppsShopping, appleTopAppsSocialNetworking,
  appleTopAppsSports, appleTopAppsStickers, appleTopAppsTravel, appleTopAppsUtilities, appleTopAppsWeather

d3.csv(androidDataPath, function(data) {
  androidData = data
})

d3.csv(appleDataPath, function(data) {
  apple_data = data
})

androidCategories.forEach(function(category) {
  d3.csv(path + "play_store_top_apps_in_" + category + ".csv", function(data) {
    categoryFormatted = category.replace(/ /g, '').replace(/&/g, '')
    window["androidTopApps" + categoryFormatted] = data
  })
})

appleCategories.forEach(function(category) {
  d3.csv(path + "apple_store_top_apps_in_" + category + ".csv", function(data) {
    categoryFormatted = category.replace(/ /g, '').replace(/&/g, '')
    window["appleTopApps" + categoryFormatted] = data
  })
})

function updateTreemapOnSliderChange() {
  d3.select("#category-info")
    .style("opacity", 1)
    .transition()
    .duration(500) // Set the duration of the transition in milliseconds
    .style("opacity", 0)
    .on("start", function() {
      // This function is called when the transition starts
      // You can perform any necessary tasks here before the transition begins
    })
    .on("end", function() {
      // This function is called when the transition ends
      // Set the HTML content to an empty string
      d3.select("#category-info").html("").style("opacity", 1);
    });
  var sliderValue = parseInt(sliderTreemap.node().value)
  var isAndroid = sliderValue === 1

  if (isAndroid) {
    update(androidData, isAndroid)
  }
  else {
    update(apple_data, isAndroid)
  }
}

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

  // Category info
  var categoryInfo = d3.select("#category-info")
    
  // Use this information to add rectangles:
  var tiles = svgTreemap.selectAll("rect")
    .data(root.leaves())

  // Remove previous tiles
  tiles.exit().remove()

  // Add new tiles
  tiles
    .enter()
    .append("rect")
      .attr("x", function (d) { return d.x0 })
      .attr("y", function (d) { return d.y0 })
      .attr("width", function (d) { return d.x1 - d.x0 })
      .attr("height", function (d) { return d.y1 - d.y0 })
      .style("stroke", "black")
      .style("fill", function(d) { 
        if (isAndroid) {
          return colorsAndroid(d.data.name)
        }
        else {
          return colorsApple(d.data.name)
        }
      })
      .on("mouseover", function(d) {
        htmlContent = d.data.name + "<br>" + d.data.value + " apps" + "<br>" + d.data.percentage.toFixed(2) + "%"
        tooltip.html(htmlContent)
        tooltip.style("visibility", "visible")
      })
      .on("mousemove", function() {
        tooltip.style("top", (d3.event.pageY+10)+"px").style("left",(d3.event.pageX+10)+"px")
      })
      .on("mouseout", function() {
        tooltip.style("visibility", "hidden")
      })
      .on("click", function(d) {
          if (isAndroid) {
            var topApps = window["androidTopApps" + d.data.name.replace(/ /g, '').replace(/&/g, '')]
            var topAppsHtml = "<h3>Top apps in " + d.data.name + "<br>(Number of downloads)</h3>"
            topApps.forEach(function(app, index) {
              topAppsHtml += "<p>" + (index + 1) + ". " + app.name + "</p>"
            })
            categoryInfo.html(topAppsHtml).style("opacity", 0).transition().duration(500).style("opacity", 1)
          } 
          else {
            var topApps = window["appleTopApps" + d.data.name.replace(/ /g, '').replace(/&/g, '')]
            var topAppsHtml = "<h3>Top apps in " + d.data.name + "<br>(Number of reviews)</h3>"
            topApps.forEach(function(app, index) {
              topAppsHtml += "<p>" + (index + 1) + ". " + app.name + "</p>"
            })
            categoryInfo.html(topAppsHtml).style("opacity", 0).transition().duration(500).style("opacity", 1)
          }

      })


  // And to add the text labels
  var textLabels = svgTreemap.selectAll("text")
    .data(root.leaves())

  // Remove previous text labels
  textLabels.exit().remove()

  // Add new text labels
  textLabels
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0 + 8})    // +8 to adjust position (more right)
      .attr("y", function(d){ return d.y0 + 20})    // +20 to adjust position (lower)
      .attr("opacity", 0)
      .transition()
      .duration(800)
      .attr("opacity", 1)
      .attr("x", function(d){ return d.x0 + 8})    // +8 to adjust position (more right)
      .attr("y", function(d){ return d.y0 + 20})    // +20 to adjust position (lower)
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

sliderTreemap.on("input", updateTreemapOnSliderChange)

var sliderValue = parseInt(sliderTreemap.node().value)
var isAndroid = sliderValue === 1

if (isAndroid) {
  d3.csv(androidDataPath, function(data) {
    update(data, isAndroid)
  })
}
else {
  d3.csv(appleDataPath, function(data) {
    update(data, isAndroid)
  })
}
