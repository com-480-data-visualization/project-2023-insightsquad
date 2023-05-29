// set the dimensions and margins of the graph
var widthDonut = 450
    heightDonut = 450
    marginDonut = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(widthDonut, heightDonut) / 2 - marginDonut

// set the color scale
var color = d3.scaleOrdinal()
  .range(["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]);

var dropMenuDonut = document.getElementById("category-donut")
var sliderDonut = d3.select("#slider-donut")

var androidCategories = ['Education', 'Music & Audio', 'Tools', 'Business', 'Entertainment', 'Lifestyle', 'Books & Reference', 'Personalization', 'Health & Fitness', 'Productivity', 'Shopping', 'Food & Drink', 'Travel & Local', 'Finance', 'Arcade', 'Puzzle', 'Casual', 'Communication', 'Sports', 'Social', 'News & Magazines', 'Photography', 'Medical', 'Action', 'Maps & Navigation', 'Simulation', 'Adventure', 'Educational', 'Art & Design', 'Auto & Vehicles', 'House & Home', 'Video Players & Editors', 'Events', 'Trivia', 'Beauty', 'Board', 'Racing', 'Role Playing', 'Word', 'Strategy', 'Card', 'Weather', 'Dating', 'Libraries & Demo', 'Casino', 'Music', 'Parenting', 'Comics'];
var appleCategories = ['Games', 'Business', 'Education', 'Utilities', 'Lifestyle', 'Food & Drink', 'Health & Fitness', 'Productivity', 'Entertainment', 'Shopping', 'Finance', 'Travel', 'Sports', 'Music', 'Medical', 'Photo & Video', 'Social Networking', 'News', 'Reference', 'Navigation', 'Stickers', 'Book', 'Weather', 'Graphics & Design', 'Developer Tools', 'Magazines & Newspapers'];
var editorsChoiceCategories = ['Education', 'Music & Audio', 'Tools', 'Business', 'Entertainment', 'Lifestyle', 'Books & Reference', 'Health & Fitness', 'Productivity', 'Shopping', 'Food & Drink', 'Travel & Local', 'Finance', 'Arcade', 'Puzzle', 'Casual', 'Communication', 'Sports', 'Social', 'News & Magazines', 'Photography', 'Medical', 'Action', 'Maps & Navigation', 'Simulation', 'Adventure', 'Educational', 'Art & Design', 'Auto & Vehicles', 'House & Home', 'Video Players & Editors', 'Events', 'Trivia', 'Beauty', 'Board', 'Racing', 'Role Playing', 'Word', 'Strategy', 'Card', 'Weather', 'Dating', 'Music', 'Parenting', 'Comics'];
var categoriesDonut = {
    1: androidCategories,
    2: appleCategories,
    3: editorsChoiceCategories
}

var pathDonut = 'https://raw.githubusercontent.com/com-480-data-visualization/project-2023-insightsquad/master/website/data/donutchart/'
var androidDataPathDonut = pathDonut + 'play_store_words_count.csv'
var appleDataPathDonut = pathDonut + 'apple_store_words_count.csv'
var editorsChoiceDataPathDonut = pathDonut + 'editors_choice_words_count.csv'

var androidDataDonut
var appleDataDonut
var editorsChoiceDataDonut

var androidWordsCountEducation, androidWordsCountMusicAudio, androidWordsCountTools, androidWordsCountBusiness, androidWordsCountEntertainment, androidWordsCountLifestyle,
androidWordsCountBooksReference, androidWordsCountPersonalization, androidWordsCountHealthFitness, androidWordsCountProductivity, androidWordsCountShopping, androidWordsCountFoodDrink,
androidWordsCountTravelLocal, androidWordsCountFinance, androidWordsCountArcade, androidWordsCountPuzzle, androidWordsCountCasual, androidWordsCountCommunication, androidWordsCountSports,
androidWordsCountSocial, androidWordsCountNewsMagazines, androidWordsCountPhotography, androidWordsCountMedical, androidWordsCountAction, androidWordsCountMapsNavigation, androidWordsCountSimulation,
androidWordsCountAdventure, androidWordsCountEducational, androidWordsCountArtDesign, androidWordsCountAutoVehicles, androidWordsCountHouseHome, androidWordsCountVideoPlayersEditors,
androidWordsCountEvents, androidWordsCountTrivia, androidWordsCountBeauty, androidWordsCountBoard, androidWordsCountRacing, androidWordsCountRolePlaying, androidWordsCountWord, androidWordsCountStrategy,
androidWordsCountCard, androidWordsCountWeather, androidWordsCountDating, androidWordsCountLibrariesDemo, androidWordsCountCasino, androidWordsCountMusic, androidWordsCountParenting, androidWordsCountComics

var appleWordsCountGames, appleWordsCountBusiness, appleWordsCountEducation, appleWordsCountUtilities, appleWordsCountLifestyle, appleWordsCountFoodDrink, appleWordsCountHealthFitness,
appleWordsCountProductivity, appleWordsCountEntertainment, appleWordsCountShopping, appleWordsCountFinance, appleWordsCountTravel, appleWordsCountSports, appleWordsCountMusic, appleWordsCountMedical,
appleWordsCountPhotoVideo, appleWordsCountSocialNetworking, appleWordsCountNews, appleWordsCountReference, appleWordsCountNavigation, appleWordsCountStickers, appleWordsCountBook, appleWordsCountWeather,
appleWordsCountGraphicsDesign, appleWordsCountDeveloperTools, appleWordsCountMagazinesNewspapers

var editorsChoiceWordCountEducation, editorsChoiceWordCountMusicAudio, editorsChoiceWordCountTools, editorsChoiceWordCountBusiness, editorsChoiceWordCountEntertainment, editorsChoiceWordCountLifestyle,
editorsChoiceWordCountBooksReference, editorsChoiceWordCountHealthFitness, editorsChoiceWordCountProductivity, editorsChoiceWordCountShopping, editorsChoiceWordCountFoodDrink, editorsChoiceWordCountTravelLocal,
editorsChoiceWordCountFinance, editorsChoiceWordCountArcade, editorsChoiceWordCountPuzzle, editorsChoiceWordCountCasual, editorsChoiceWordCountCommunication, editorsChoiceWordCountSports, editorsChoiceWordCountSocial,
editorsChoiceWordCountNewsMagazines, editorsChoiceWordCountPhotography, editorsChoiceWordCountMedical, editorsChoiceWordCountAction, editorsChoiceWordCountMapsNavigation, editorsChoiceWordCountSimulation,
editorsChoiceWordCountAdventure, editorsChoiceWordCountEducational, editorsChoiceWordCountArtDesign, editorsChoiceWordCountAutoVehicles, editorsChoiceWordCountHouseHome, editorsChoiceWordCountVideoPlayersEditors,
editorsChoiceWordCountEvents, editorsChoiceWordCountTrivia, editorsChoiceWordCountBeauty, editorsChoiceWordCountBoard, editorsChoiceWordCountRacing, editorsChoiceWordCountRolePlaying, editorsChoiceWordCountWord,
editorsChoiceWordCountStrategy, editorsChoiceWordCountCard, editorsChoiceWordCountWeather, editorsChoiceWordCountDating, editorsChoiceWordCountMusic, editorsChoiceWordCountParenting, editorsChoiceWordCountComics

d3.csv(androidDataPathDonut, function(data) {
    androidDataDonut = data
})

d3.csv(appleDataPathDonut, function(data) {
    appleDataDonut = data
})

d3.csv(editorsChoiceDataPathDonut, function(data) {
    editorsChoiceDataDonut = data
})

androidCategories.forEach(function(category) {
    d3.csv(pathDonut + "play_store_words_count_in_" + category + ".csv", function(data) {
      categoryFormatted = category.replace(/ /g, '').replace(/&/g, '')
      window["androidWordsCount" + categoryFormatted] = data
    })
})
  
appleCategories.forEach(function(category) {
    d3.csv(pathDonut + "apple_store_words_count_in_" + category + ".csv", function(data) {
      categoryFormatted = category.replace(/ /g, '').replace(/&/g, '')
      window["appleWordsCount" + categoryFormatted] = data
    })
})
  
editorsChoiceCategories.forEach(function(category) {
    d3.csv(pathDonut + "editors_choice_words_count_in_" + category + ".csv", function(data) {
      categoryFormatted = category.replace(/ /g, '').replace(/&/g, '')
      window["editorsChoiceWordsCount" + categoryFormatted] = data
    })
})

function updateCategoryOptions() {
    console.log("updateCategoryOptions")
    var sliderValueDonut = parseInt(sliderDonut.node().value);
    var categoryOptionsDonut = categoriesDonut[sliderValueDonut];
    
    // Clear existing options
    dropMenuDonut.innerHTML = '';
    optionAll = document.createElement('option');
    optionAll.value = "All";
    optionAll.textContent = "---";
    dropMenuDonut.appendChild(optionAll);
    
    // Add new options
    categoryOptionsDonut.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      dropMenuDonut.appendChild(option);
    });

    if (sliderValueDonut == 1) {
        updateDonutChart(androidDataDonut)
    } else if (sliderValueDonut == 2) {
        updateDonutChart(appleDataDonut)
    } else if (sliderValueDonut == 3) {
        updateDonutChart(editorsChoiceDataDonut)
    }
}

sliderDonut.on("input", updateCategoryOptions)

function updateDonutChart(data) {
console.log(data)
// remove the previous svg if it exists
d3.select("#donutchart").selectAll("svg").remove();

// append the svg object to the div called 'donutchart'
var svg = d3.select("#donutchart")
  .append("svg")
    .attr("width", widthDonut)
    .attr("height", heightDonut)
  .append("g")
    .attr("transform", "translate(" + widthDonut / 2 + "," + heightDonut / 2 + ")");

// Compute the position of each group on the pie:
var pie = d3.pie()
  .sort(null) // Do not sort group by size
  .value(function(d) {return d.count; })
var data_ready = pie(d3.entries(data))

// The arc generator
var arc = d3.arc()
  .innerRadius(radius * 0.5)         // This is the size of the donut hole
  .outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
var slices = svg.selectAll('allSlices')
    .data(data_ready)

slices.exit().remove()

slices
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d){ return(color(d.data.word)) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

// Add the polylines between chart and labels:
var lines = svg.selectAll('allPolylines')
    .data(data_ready)

lines.exit().remove()

lines
  .enter()
  .append('polyline')
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function(d) {
      var posA = arc.centroid(d) // line insertion in the slice
      var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
      var posC = outerArc.centroid(d); // Label position = almost the same as posB
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC]
    })

// Add the polylines between chart and labels:
var labels = svg.selectAll('allLabels')
    .data(data_ready)

labels.exit().remove()

labels
  .selectAll('allLabels')
  .data(data_ready)
  .enter()
  .append('text')
    .text( function(d) { console.log(d.data.word) ; return d.data.word } )
    .attr('transform', function(d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
    })
    .style('text-anchor', function(d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })
}

function updateDonutChartCategoryChange() {
    var dropMenuDonutValue = dropMenuDonut.value
    var sliderValueDonut = parseInt(sliderDonut.node().value);

    if (sliderValueDonut == 1) {
        if (dropMenuDonutValue == "All") {
            updateDonutChart(androidDataDonut)
        }
        else {
            updateDonutChart(window["androidWordsCount" + dropMenuDonutValue.replace(/ /g, '').replace(/&/g, '')])
        }
    } else if (sliderValueDonut == 2) {
        if (dropMenuDonutValue == "All") {
            updateDonutChart(appleDataDonut)
        }
        else {
            updateDonutChart(window["appleWordsCount" + dropMenuDonutValue.replace(/ /g, '').replace(/&/g, '')])
        }
    } else if (sliderValueDonut == 3) {
        if (dropMenuDonutValue == "All") {
            updateDonutChart(editorsChoiceDataDonut)
        }
        else {
            updateDonutChart(window["editorsChoiceWordsCount" + dropMenuDonutValue.replace(/ /g, '').replace(/&/g, '')])
        }
    }
}

dropMenuDonut.addEventListener('change', updateDonutChartCategoryChange)

function initializeDonutChart() {
console.log("initializeDonutChart")
var sliderValueDonut = parseInt(sliderDonut.node().value);
console.log(sliderValueDonut)
var categoryOptionsDonut = categoriesDonut[sliderValueDonut];
console.log(categoryOptionsDonut)

// Clear existing options
dropMenuDonut.innerHTML = '';
optionAll = document.createElement('option');
optionAll.value = "All";
optionAll.textContent = "---";
dropMenuDonut.appendChild(optionAll);
    
// Add new options
categoryOptionsDonut.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    dropMenuDonut.appendChild(option);
});
if (sliderValueDonut === 1) {
    d3.csv(androidDataPathDonut, function(data) {
        updateDonutChart(data)
    })
  }
  else if (sliderValueDonut === 2) {
    d3.csv(appleDataPathDonut, function(data) {
        updateDonutChart(data)
    })
  }
  else if (sliderValueDonut === 3) {
    d3.csv(editorsChoiceDataPathDonut, function(data) {
        updateDonutChart(data)
    })
  }
}

initializeDonutChart()