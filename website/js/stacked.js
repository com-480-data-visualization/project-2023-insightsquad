

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
      1: ["264653","2a9d8f","e9c46a","f4a261","e76f51"],
      2: ["03045e","0077b6","00b4d8","90e0ef","caf0f8"],
      3: ["2b2d42","8d99ae","edf2f4","ef233c","d90429"],
      4: ["03045e","023e8a","0077b6","0096c7","00b4d8","48cae4","90e0ef","ade8f4","caf0f8"],  
      5: ["390099","9e0059","ff0054","ff5400","ffbd00"],
      6: ["7400b8","6930c3","5e60ce","5390d9","4ea8de","48bfe3","56cfe1","64dfdf","72efdd","80ffdb"],
      7: ["ff7b00","ff8800","ff9500","ffa200","ffaa00","ffb700","ffc300","ffd000","ffdd00","ffea00"],
      8: ["16697a","489fb5","82c0cc","ede7e3","ffa62b"],
      9: ["f7b267","f79d65","f4845f","f27059","f25c54"],
      10: ["fadde1","ffc4d6","ffa6c1","ff87ab","ff5d8f","ff97b7","ffacc5","ffcad4","f4acb7"],
      11: ["004b23","006400","007200","008000","38b000","70e000","9ef01a","ccff33"],
      12: ["250902","38040e","640d14","800e13","ad2831"],
      13: ["30f2f2","ffd23f","ff6f59","3066be","a0a4b8"],
      14: ["33a8c7","52e3e1","a0e426","fdf148","ffab00","f77976","f050ae","d883ff","9336fd"],
      15: ["ff0000","ff8700","ffd300","deff0a","a1ff0a","0aff99","0aefff","147df5","580aff","be0aff"],
      16: ["ff0000","ff8700","ffd300","deff0a","a1ff0a","0aff99","0aefff","147df5","580aff","be0aff"],
      17: ["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"],
      18: ["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"],
      19: ["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"],
      20: ["001219","005f73","0a9396","94d2bd","e9d8a6","ee9b00","ca6702","bb3e03","ae2012","9b2226"]
    };
  
    // choose a random color palette for the nodes 
    const palette = palettes[Math.floor(Math.random() * 20) + 1];
  
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
        title: "Business Model"
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
  
  
