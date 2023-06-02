// set the dimensions and margins of the graph
var marginTreemap = {top: 10, right: 10, bottom: 10, left: 10},
  widthTreemap = document.getElementsByClassName("column-left-75")[0].offsetWidth,
  heightTreemap = 900,
  tile = d3.treemapResquarify,
  fontSizeTreemap = "16px",
  colorsAndroid = d3.scaleOrdinal()
    .range(["#6eb728", "#589220", "#426d18", "#8bc552", "#a8d37e"]),
  colorsApple = d3.scaleOrdinal()
    .range(["#2359b5", "#1c4790", "#15356c", "#4e7ac3", "#7b9bd2"]),
  palettesTreemap = {
    1: ["264653","3d85c6", "2a9d8f","e9c46a","f4a261","e76f51"], // OUI
    2: ["1b54b4","023e8a","0077b6","00b4d8","90e0ef","caf0f8"],
    3: ["264653","3d85c6", "2a9d8f","e9c46a","f4a261","e76f51"], // OUI
    4: ["1b54b4","023e8a","0077b6","0096c7","00b4d8","48cae4","90e0ef","ade8f4","caf0f8"],  
    5: ["0f4094","1b54b4","0077b6","00b4d8","90e0ef","caf0f8"],
    6: ['e9c46a', 'ffa62b', '16697a', '82c0cc', 'ede7e3', '489fb5'],
    7: ['f7b267', 'd8433b', 'f79d65', 'f25c54', 'f4845f', 'f27059'],
    8: ["16697a","489fb5","82c0cc","ede7e3","e9c46a","ffa62b"],
    9: ["f7b267","f79d65","f4845f","f27059","f25c54", "d8433b"],
    10: ["ffc4d6","ffa6c1","ff87ab","ff5d8f","ff97b7","ffacc5","ffcad4","f4acb7"],
    11: ['ccff33', '70e000', '007200', '004b23', '9ef01a', '008000', '006400', '38b000'],
    12: ["250902","38040e","640d14","800e13","ad2831", "eb4954"],
    13: ["30f2f2","ffd23f","ff6f59","3066be","a0a4b8","8e7cc3"],
    14: ['9336fd', 'f050ae', 'fdf148', 'a0e426', 'f77976', '52e3e1', '33a8c7', 'd883ff', 'ffab00'],
    15: ['e76f51', '2a9d8f', 'f4a261', '264653', 'e9c46a', '3d85c6'], // OUI
    16: ['e9c46a', 'f4a261', '3d85c6', '2a9d8f', '264653', 'e76f51'], // OUI
    17: ['94d2bd', '0a9396', 'bb3e03', 'ca6702', '001219', 'e9d8a6', 'ee9b00', 'ae2012', '005f73', '9b2226'], // OUI
    18: ['bb3e03', '001219', '94d2bd', '9b2226', 'ee9b00', 'ca6702', 'e9d8a6', '0a9396', '005f73', 'ae2012'], // OUI
    19: ['9b2226', '0a9396', 'bb3e03', '94d2bd', 'ee9b00', '001219', 'e9d8a6', 'ae2012', '005f73', 'ca6702'], // OUI
    20: ["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"] // OUI
  };

var androidCategories = ['Education', 'Music & Audio', 'Tools', 'Business', 'Entertainment', 'Lifestyle', 'Books & Reference', 'Personalization', 'Health & Fitness', 'Productivity', 'Shopping', 'Food & Drink', 'Travel & Local', 'Finance', 'Arcade', 'Puzzle', 'Casual', 'Communication', 'Sports', 'Social', 'News & Magazines', 'Photography', 'Medical', 'Action', 'Maps & Navigation', 'Simulation', 'Adventure', 'Educational', 'Art & Design', 'Auto & Vehicles', 'House & Home', 'Video Players & Editors', 'Events', 'Trivia', 'Beauty', 'Board', 'Racing', 'Role Playing', 'Word', 'Strategy', 'Card', 'Weather', 'Dating', 'Libraries & Demo', 'Casino', 'Music', 'Parenting', 'Comics'];
var appleCategories = ['Games', 'Business', 'Education', 'Utilities', 'Lifestyle', 'Food & Drink', 'Health & Fitness', 'Productivity', 'Entertainment', 'Shopping', 'Finance', 'Travel', 'Sports', 'Music', 'Medical', 'Photo & Video', 'Social Networking', 'News', 'Reference', 'Navigation', 'Stickers', 'Book', 'Weather', 'Graphics & Design', 'Developer Tools', 'Magazines & Newspapers'];
var editorsChoiceCategories = ['Education', 'Music & Audio', 'Tools', 'Business', 'Entertainment', 'Lifestyle', 'Books & Reference', 'Health & Fitness', 'Productivity', 'Shopping', 'Food & Drink', 'Travel & Local', 'Finance', 'Arcade', 'Puzzle', 'Casual', 'Communication', 'Sports', 'Social', 'News & Magazines', 'Photography', 'Medical', 'Action', 'Maps & Navigation', 'Simulation', 'Adventure', 'Educational', 'Art & Design', 'Auto & Vehicles', 'House & Home', 'Video Players & Editors', 'Events', 'Trivia', 'Beauty', 'Board', 'Racing', 'Role Playing', 'Word', 'Strategy', 'Card', 'Weather', 'Dating', 'Music', 'Parenting', 'Comics'];

var sliderTreemap = d3.select("#slider-treemap")

// Read data
var pathTreemap = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/treemap/'
var androidDataPathTreemap = pathTreemap + 'play_store_category_count.csv'
var appleDataPathTreemap = pathTreemap + 'apple_store_category_count.csv'
var editorsChoiceDataPathTreemap = pathTreemap + 'play_store_editors_choice_category_count.csv'
var androidDataTreemap
var appleDataTreemap
var editorsChoiceDataTreemap
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

var editorsChoiceTopAppsAction, editorsChoiceTopAppsAdventure, editorsChoiceTopAppsArcade, editorsChoiceTopAppsArtDesign, editorsChoiceTopAppsAutoVehicles, editorsChoiceTopAppsBeauty,
  editorsChoiceTopAppsBoard, editorsChoiceTopAppsBooksReference, editorsChoiceTopAppsBusiness, editorsChoiceTopAppsCard, editorsChoiceTopAppsCasual, editorsChoiceTopAppsComics,
  editorsChoiceTopAppsCommunication, editorsChoiceTopAppsDating, editorsChoiceTopAppsEducation, editorsChoiceTopAppsEducational, editorsChoiceTopAppsEntertainment, editorsChoiceTopAppsEvents,
  editorsChoiceTopAppsFinance, editorsChoiceTopAppsFoodDrink, editorsChoiceTopAppsHealthFitness, editorsChoiceTopAppsHouseHome, editorsChoiceTopAppsLifestyle,
  editorsChoiceTopAppsMapsNavigation, editorsChoiceTopAppsMedical, editorsChoiceTopAppsMusic, editorsChoiceTopAppsMusicAudio, editorsChoiceTopAppsNewsMagazines, editorsChoiceTopAppsParenting,
  editorsChoiceTopAppsPhotography, editorsChoiceTopAppsPuzzle, editorsChoiceTopAppsRacing, editorsChoiceTopAppsRolePlaying, editorsChoiceTopAppsShopping,
  editorsChoiceTopAppsSimulation, editorsChoiceTopAppsSocial, editorsChoiceTopAppsSports, editorsChoiceTopAppsStrategy, editorsChoiceTopAppsTools, editorsChoiceTopAppsTravelLocal, editorsChoiceTopAppsTrivia,
  editorsChoiceTopAppsVideoPlayersEditors, editorsChoiceTopAppsWeather, editorsChoiceTopAppsWord

d3.csv(androidDataPathTreemap, function(data) {
  androidDataTreemap = data
})

d3.csv(appleDataPathTreemap, function(data) {
  appleDataTreemap = data
})

d3.csv(editorsChoiceDataPathTreemap, function(data) {
  editorsChoiceDataTreemap = data
})

androidCategories.forEach(function(category) {
  d3.csv(pathTreemap + "play_store_top_apps_in_" + category + ".csv", function(data) {
    categoryFormatted = category.replace(/ /g, '').replace(/&/g, '')
    window["androidTopApps" + categoryFormatted] = data
  })
})

appleCategories.forEach(function(category) {
  d3.csv(pathTreemap + "apple_store_top_apps_in_" + category + ".csv", function(data) {
    categoryFormatted = category.replace(/ /g, '').replace(/&/g, '')
    window["appleTopApps" + categoryFormatted] = data
  })
})

editorsChoiceCategories.forEach(function(category) {
  d3.csv(pathTreemap + "play_store_editors_choice_top_apps_in_" + category + ".csv", function(data) {
    categoryFormatted = category.replace(/ /g, '').replace(/&/g, '')
    window["editorsChoiceTopApps" + categoryFormatted] = data
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
  var sliderValueTreemap = parseInt(sliderTreemap.node().value)

  if (sliderValueTreemap === 1) {
    update(androidDataTreemap, sliderValueTreemap)
  }
  else if (sliderValueTreemap === 2) {
    update(appleDataTreemap, sliderValueTreemap)
  }
  else if (sliderValueTreemap === 3) {
    update(editorsChoiceDataTreemap, sliderValueTreemap)
  }
}

function update(data, dataType) {
  var color = d3.scaleOrdinal()
  .range(palettesTreemap[Math.floor(Math.random() * 20) + 1])

  // Remove previous svg
  d3.select("#treemap").selectAll("svg").remove()

  // append the svg object to the body of the page
  var svgTreemap = d3.select("#treemap")
  .append("svg")
    .attr("viewBox", [-marginTreemap.left, -marginTreemap.bottom, widthTreemap, heightTreemap])
    .attr("width", widthTreemap)
    .attr("height", heightTreemap)
  .append("g")
    .attr("transform",
          "translate(" + marginTreemap.left + "," + marginTreemap.top + ")");

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
    .size([widthTreemap - marginTreemap.left - marginTreemap.right, heightTreemap - marginTreemap.top - marginTreemap.bottom])
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
    .style("font-size", fontSizeTreemap)
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
        return "#" + color(d.data.name)
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
          if (dataType === 1) {
            var topApps = window["androidTopApps" + d.data.name.replace(/ /g, '').replace(/&/g, '')]
            var topAppsHtml = "<h3>Top apps in " + d.data.name + "<br>(Number of downloads)</h3>"
            topApps.forEach(function(app, index) {
              topAppsHtml += "<p>" + (index + 1) + ". " + app.name + "</p>"
            })
            categoryInfo.html(topAppsHtml).style("opacity", 0).transition().duration(500).style("opacity", 1)
          } 
          else if (dataType === 2){
            var topApps = window["appleTopApps" + d.data.name.replace(/ /g, '').replace(/&/g, '')]
            var topAppsHtml = "<h3>Top apps in " + d.data.name + "<br>(Number of reviews)</h3>"
            topApps.forEach(function(app, index) {
              topAppsHtml += "<p>" + (index + 1) + ". " + app.name + "</p>"
            })
            categoryInfo.html(topAppsHtml).style("opacity", 0).transition().duration(500).style("opacity", 1)
          }
          else if (dataType === 3) {
            var topApps = window["editorsChoiceTopApps" + d.data.name.replace(/ /g, '').replace(/&/g, '')]
            var topAppsHtml = "<h3>Top apps in " + d.data.name + "<br>(Number of downloads)</h3>"
            topApps.forEach(function(app, index) {
              topAppsHtml += "<p>" + (index + 1) + ". " + app.name + "</p>"
            })
            categoryInfo.html(topAppsHtml).style("opacity", 0).transition().duration(500).style("opacity", 1)
          }

      })
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 0.75)


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
      .duration(500)
      .attr("opacity", 1)
      .attr("x", function(d){ return d.x0 + 8})    // +8 to adjust position (more right)
      .attr("y", function(d){ return d.y0 + 20})    // +20 to adjust position (lower)
      .text(function(d){ 
        var name = d.data.name
        var widthTemp = d.x1 - d.x0
        var heightTemp = d.y1 - d.y0
        var textWidth = getTextWidth(name, fontSizeTreemap) + marginTreemap.right
        var textHeight = parseInt(fontSizeTreemap.substring(0, 2)) + 8
        var truncatedName = name

        if (textWidth > widthTemp) {
          var substringLength = findMaxSubstringLength(name, widthTemp - marginTreemap.right, fontSizeTreemap)

          if (substringLength > 1) {
            truncatedName = name.substring(0, findMaxSubstringLength(name, widthTemp - marginTreemap.right, fontSizeTreemap)) + "..."
          }
          else {
            truncatedName = ""
          }
        }

        if (textHeight > heightTemp) {
          truncatedName = ""
        }

        return truncatedName
      })
      .attr("font-size", fontSizeTreemap)
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
    var width = getTextWidth(substr, fontSize) + marginTreemap.right + marginTreemap.left;

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

function initializeTreemap() {
  var sliderValueTreemap = parseInt(sliderTreemap.node().value)

if (sliderValueTreemap === 1) {
  d3.csv(androidDataPathTreemap, function(data) {
    update(data, sliderValueTreemap)
  })
}
else if (sliderValueTreemap === 2) {
  d3.csv(appleDataPathTreemap, function(data) {
    update(data, sliderValueTreemap)
  })
}
else if (sliderValueTreemap === 3) {
  d3.csv(editorsChoiceDataPathTreemap, function(data) {
    update(data, sliderValueTreemap)
  })
}
}

initializeTreemap()
