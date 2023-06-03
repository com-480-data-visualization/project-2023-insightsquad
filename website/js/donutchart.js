// set the dimensions and margins of the graph
var widthDonut = 600
    heightDonut = 500
    marginDonut = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(widthDonut, heightDonut) / 2 - marginDonut

// set the color scale
var colorRangeDonut = ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]

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
var colorDonut = d3.scaleOrdinal()
    .domain(data.columns.slice(1))
    .range(colorRangeDonut);

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
  .value(function(d) {return d.value; })

// The arc generator
var arc = d3.arc()
  .innerRadius(radius * 0.5) // This is the size of the donut hole
  .outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg.selectAll('allSlices')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d){ return(colorDonut(d.data.word)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    .transition()
    .duration(500)
    .attrTween("d", function(d) {
        var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t) {
            return arc(interpolate(t));
        };
    });

// Add the polylines between chart and labels:
var polylinesDonut = svg.selectAll('allPolylines')
  .data(pie(data))
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

// Add the labels:
var labelsDonut = svg.selectAll('allLabels')
  .data(pie(data))
  .enter()
  .append('text')
    .text( function(d) { return d.data.word } )
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

polylinesDonut
    .style("opacity", 0)
    .transition()
    .duration(500)
    .style("opacity", 1)

labelsDonut
    .style("opacity", 0)
    .transition()
    .duration(500)
    .style("opacity", 1)

svg.append('text')
    .text('Word count')
    .attr('class', 'chart-title')
    .style('text-anchor', 'middle')
    .style('font-size', '30px')
    .style("opacity", 0)
    .transition()
    .duration(500)
    .style("opacity", 1)

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