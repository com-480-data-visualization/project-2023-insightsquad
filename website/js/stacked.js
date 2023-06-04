

  google.charts.load("current", {packages:['corechart']});
  
  // Retrieve necessary elements from the DOM
  const slider_stacked = document.getElementById('slider-donut');
  const categorySelectStacked = document.getElementById('category-donut');
  const slider_stacked_top = document.getElementById('slider-stacked');
  
  
  // Add event listener to the slider to update the category options when changed

  
  
  // Function to fetch data from a CSV file and create a DataTable
  function fetchDataAndCreateDataTableStacked(csvFilePath, callback) {
    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvData => {
        const dataTable = new google.visualization.DataTable();
        
        // Split the CSV data into rows
        const rows = csvData.trim().split('\n');
  
        // skip the first row of the CSV file (headers)
        rows.shift();
  
        
        dataTable.addColumn('string', 'BM');
        dataTable.addColumn('number', 'Free');
        dataTable.addColumn('number', 'Paid');
        
        // Add rows to the DataTable
        rows.forEach(row => {
          const rowData = row.split(',');
          // last element of rowData has to be converted to a number
          rowData[1] = parseInt(rowData[1]);
          rowData[2] = parseInt(rowData[2]);
          dataTable.addRow(rowData);
        });
        
        // Invoke the callback function with the created DataTable
        callback(dataTable);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  
  // Function to draw the Stacked diagram using the provided data table
  function drawStackedDiagram(dataTable) {
    var chart = new google.visualization.ColumnChart(document.getElementById('stacked'));
    
    const palettes = {
      1: ["0061ff","60efff"],
      2: ["40c9ff","e81cff"],
      3: ["ff930f","fff95b"],
      4: ["696eff","f8acff"],  
      5: ["006e90","f18f01"],
      6: ["0a2463","fb3640"],
      7: ["57ebde","aefb2a"],
      8: ["ef798a","f7a9a8"],
      9: ["00ffff","8000ff"],
      10:["ffc7f8","6bf8fa"]
    };
  
    // choose a random color palette for the nodes 
    const palette = palettes[Math.floor(Math.random() * 10) + 1];
  
    var options = {
        animation:{
            duration: 1000,
            easing: 'inAndOut',
            startup: true,
          },
        hAxis:{
            title: 'Business Model',
            titleTextStyle: {
              color: 'Black'
            },
            direction: -1,
          },
          vAxis:{
            title: '# Apps',
            titleTextStyle: {
              color: 'Black'
            },
            direction: 1,
          },
        colors: palette,
        
        
        backgroundColor: 'red',
        dataOpacity: 0.6,
        width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
        backgroundColor: '#f2f2f2',
      };

    chart.draw(dataTable, options);
  }
  
  
  
  
  // Function to update the Stacked diagram based on the selected data and category
  function updateStackedDiagram() {
  
    const sliderValue = parseInt(slider_stacked.value);
    const selectedData = getDataBasedOnSliderValue();
    const selectedCategory = categorySelectStacked.value;
    const sliderTopValue = parseInt(slider_stacked_top.value);
    // get the html element with id Stacked-labels
    
    if (sliderValue === 2) {
        return;
    }
    var value = sliderTopValue;
    // if sliderTopValue is 2, then value is 10, if 3 is 100, if 4 is 1000
    if (sliderTopValue > 1) {
        value = Math.pow(10, sliderTopValue - 1);
    }

    var csvFilePath = `data/stacked_bar/stacked_${selectedData}_${selectedCategory}_${value}.csv`;
    if (sliderTopValue === 1) {
        csvFilePath = `data/stacked_bar/stacked_${selectedData}_${selectedCategory}.csv`;    
    }
  
    fetchDataAndCreateDataTableStacked(csvFilePath, drawStackedDiagram);
  
  }
  
  // Function to return the appropriate data based on the slider value
  function getDataBasedOnSliderValue() {
    const sliderValue = parseInt(slider_stacked.value);
    
    if (sliderValue === 1) {
      return "android";
    } else if (sliderValue === 2) {
      return "ios";
    } else {
      return "editor";
    }
  }
  
  // Function to initialize the Stacked diagram with default values
  function initializeStackedDiagram() {
    slider_stacked_top.value = "1"; 
  
    // Update the Stacked diagram based on the default values
    updateStackedDiagram();
  }
  
  // Add an event listener to trigger the initialization when the page is loaded
  //make sure that the function
  
  window.addEventListener('load', initializeStackedDiagram);
  
  // Add event listeners to the slider and category select to update the diagram when changed
  slider_stacked.addEventListener('input', updateStackedDiagram);
  slider_stacked_top.addEventListener('input', updateStackedDiagram);
  categorySelectStacked.addEventListener('change', updateStackedDiagram);
  
  
