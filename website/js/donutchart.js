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

    switch (sliderValueDonut) {
        case 1:
            updateDonutChart(androidDataDonut)
            break;
        case 2:
            updateDonutChart(appleDataDonut)
            break;
        case 3:
            updateDonutChart(editorsChoiceDataDonut)
            break;
    }
}

sliderDonut.on("input", updateCategoryOptions)

function updateDonutChart(data) {
    
const palettes_donut = {
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
    const palette_donut = palettes_donut[Math.floor(Math.random() * 17) + 1];
    // color palette
    var colorDonut = d3.scaleOrdinal()
    .domain(data.columns.slice(1))
    .range(palette_donut);
    

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

    switch (sliderValueDonut) {
        case 1:
            if (dropMenuDonutValue == "All") {
                updateDonutChart(androidDataDonut)
            }
            else {
                updateDonutChart(window["androidWordsCount" + dropMenuDonutValue.replace(/ /g, '').replace(/&/g, '')])
            }
            break;
        case 2:
            if (dropMenuDonutValue == "All") {
                updateDonutChart(appleDataDonut)
            }
            else {
                updateDonutChart(window["appleWordsCount" + dropMenuDonutValue.replace(/ /g, '').replace(/&/g, '')])
            }
            break;
        case 3:
            if (dropMenuDonutValue == "All") {
                updateDonutChart(editorsChoiceDataDonut)
            }
            else {
                updateDonutChart(window["editorsChoiceWordsCount" + dropMenuDonutValue.replace(/ /g, '').replace(/&/g, '')])
            }
            break;
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
switch (sliderValueDonut) {
    case 1:
        d3.csv(androidDataPathDonut, function(data) {
            updateDonutChart(data)
        })
        break;
    case 2:
        d3.csv(appleDataPathDonut, function(data) {
            updateDonutChart(data)
        })
        break;
    case 3:
        d3.csv(editorsChoiceDataPathDonut, function(data) {
            updateDonutChart(data)
        })
        break;
  }
}

initializeDonutChart()