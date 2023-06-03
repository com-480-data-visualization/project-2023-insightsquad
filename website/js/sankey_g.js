
const categories = {
    1: ['Education', 'Music & Audio', 'Tools', 'Business', 'Entertainment', 'Lifestyle', 'Books & Reference', 'Personalization', 'Health & Fitness', 'Productivity', 'Shopping', 'Food & Drink', 'Travel & Local', 'Finance', 'Arcade', 'Puzzle', 'Casual', 'Communication', 'Sports', 'Social', 'News & Magazines', 'Photography', 'Medical', 'Action', 'Maps & Navigation', 'Simulation', 'Adventure', 'Educational', 'Art & Design', 'Auto & Vehicles', 'House & Home', 'Video Players & Editors', 'Events', 'Trivia', 'Beauty', 'Board', 'Racing', 'Role Playing', 'Word', 'Strategy', 'Card', 'Weather', 'Dating', 'Libraries & Demo', 'Casino', 'Music', 'Parenting', 'Comics'],
    2: ['Games', 'Business', 'Education', 'Utilities', 'Lifestyle', 'Food & Drink', 'Health & Fitness', 'Productivity', 'Entertainment', 'Shopping', 'Finance', 'Travel', 'Sports', 'Music', 'Medical', 'Photo & Video', 'Social Networking', 'News', 'Reference', 'Navigation', 'Stickers', 'Book', 'Weather', 'Graphics & Design', 'Developer Tools', 'Magazines & Newspapers'],
    3: ['Education', 'Music & Audio', 'Tools', 'Business', 'Entertainment', 'Lifestyle', 'Books & Reference', 'Personalization', 'Health & Fitness', 'Productivity', 'Shopping', 'Food & Drink', 'Travel & Local', 'Finance', 'Arcade', 'Puzzle', 'Casual', 'Communication', 'Sports', 'Social', 'News & Magazines', 'Photography', 'Medical', 'Action', 'Maps & Navigation', 'Simulation', 'Adventure', 'Educational', 'Art & Design', 'Auto & Vehicles', 'House & Home', 'Video Players & Editors', 'Events', 'Trivia', 'Beauty', 'Board', 'Racing', 'Role Playing', 'Word', 'Strategy', 'Card', 'Weather', 'Dating', 'Libraries & Demo', 'Casino', 'Music', 'Parenting', 'Comics']
  };
  
  google.charts.load('current', {'packages':['sankey']});
  
  // Retrieve necessary elements from the DOM
  const slider = document.getElementById('slider_sankey');
  const categorySelect = document.getElementById('category');
  const diagramContainer = document.getElementById('sankey');
  
  function updateCategoryOptions() {
    const sliderValue = parseInt(slider.value);
    const categoryOptions = categories[sliderValue];
    
    // Clear existing options
    categorySelect.innerHTML = '';
    
    // Add new options
    categoryOptions.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
    updateSankeyDiagram();
  }
  
  // Add event listener to the slider to update the category options when changed
  slider.addEventListener('input', updateCategoryOptions);
  
  // Initialize the category options based on the default slider value
  updateCategoryOptions();
  
  // Function to fetch data from a CSV file and create a DataTable
  function fetchDataAndCreateDataTable(csvFilePath, callback) {
    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvData => {
        const dataTable = new google.visualization.DataTable();
        console.log(csvData);
        
        // Split the CSV data into rows
        const rows = csvData.trim().split('\n');
  
        // skip the first row of the CSV file (headers)
        rows.shift();
  
        
        dataTable.addColumn('string', 'From');
        dataTable.addColumn('string', 'To');
        dataTable.addColumn('number', 'Apps');
        
        // Add rows to the DataTable
        rows.forEach(row => {
          const rowData = row.split(',');
          // last element of rowData has to be converted to a number
          rowData[2] = parseInt(rowData[2]);
          dataTable.addRow(rowData);
        });
        
        // Invoke the callback function with the created DataTable
        callback(dataTable);
      })
      .catch(error => {
      });
  }
  
  
  // Function to draw the sankey diagram using the provided data table
  function drawSankeyDiagram(dataTable) {
    const chart = new google.visualization.Sankey(document.getElementById('sankey'));
    
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
      height: 500,
      tooltip: {isHtml: true},
      sankey: {
        node: {
          label: {
            fontName: 'Open Sans',
            fontSize: 12,
            color: '#FFFFFF',
            bold: true,
            italic: false
          },
          interactivity: true, // Allows you to select nodes.
          labelPadding: 5,     // Horizontal distance between the label and the node.
          nodePadding: 10,     // Vertical distance between nodes.
          width: 8,            // Thickness of the node.
          colors: palette,
          colorMode: 'unique',
        },
        link: {
          color: {
            fill: 'red',     // Color of the link.
            fillOpacity: 0.2, // Transparency of the link.
            stroke: 'black',  // Color of the link border.
            strokeWidth: 0    // Thickness of the link border (default 0).
          },
          colors: palette,
          colorMode: 'gradient',
        }
      },
  
    };
    chart.draw(dataTable, options);
  }
  
  
  
  
  // Function to update the sankey diagram based on the selected data and category
  function updateSankeyDiagram() {
  
    const labels_options = {
      1: ["Category","Downloads","Rating","Ads or In-App Purchases","Price"],
      2: ["Category","Reviews","Rating","Content Rating","Price"],
      3: ["Category","Downloads","Rating","Ads or In-App Purchases","Price"]
    };
    const selectedData = getDataBasedOnSliderValueSankey();
    const selectedCategory = categorySelect.value;
    // get the html element with id sankey-labels
    const sankeyLabels = document.getElementById("sankey-labels");
    // extract the labels from labels, depending on the value of the slider
    const labels = labels_options[slider.value];
    // set the innerHTML of the sankey-labels element to the labels
    // for each label in labels, create a div element with the label as text and class="sankey-label"
    // append the div element to the sankey-labels element
    sankeyLabels.innerHTML = "";
    labels.forEach(label => {
      const div = document.createElement("div");
      div.innerText = label;
      div.classList.add("sankey-label");
      // if the element is the first element, add some styling to it with text-align: left;"
      if (label === labels[0]) {
        div.style.textAlign = "left";
      }
      if (label === labels[4]) {
        div.style.textAlign = "right";
      }
      if (label === labels[1]) {
        div.style.textAlign = "left";
        div.style.paddingLeft = "15px";
      }
      if (label === labels[3]) {
        div.style.textAlign = "right";
        div.style.paddingRight = "15px";
      }
      sankeyLabels.appendChild(div);
    });
  
    
    // use the selected data and category to create the appropriate CSV file path
    const csvFilePath = `data/sankey/${selectedData}_${selectedCategory}.csv`;
  
    fetchDataAndCreateDataTable(csvFilePath, drawSankeyDiagram);
  
  }
  
  // Function to return the appropriate data based on the slider value
  function getDataBasedOnSliderValueSankey() {
    const sliderValue = parseInt(slider.value);
    
    switch (sliderValue) {
      case 1:
        return "android";
      case 2:
        return "ios";
      case 3:
        return "editor";
    }
  }
  
  // Function to initialize the sankey diagram with default values
  function initializeSankeyDiagram() {
    // Set the default values for the slider and category select
    slider.value = "1"; // Google Play Store selected by default
    categorySelect.value = "Education"; // Default category selected
  
    // Update the sankey diagram based on the default values
    updateSankeyDiagram();
  }
  
  // Add an event listener to trigger the initialization when the page is loaded
  //make sure that the function
  
  window.addEventListener('load', initializeSankeyDiagram);
  
  // Add event listeners to the slider and category select to update the diagram when changed
  slider.addEventListener('input', updateSankeyDiagram);
  categorySelect.addEventListener('change', updateSankeyDiagram);
  
  
  
  
  /*
  google.charts.load('current', {'packages':['sankey']});
        google.charts.setOnLoadCallback(drawChart);
  
        function drawChart() {
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'From');
          data.addColumn('string', 'To');
          data.addColumn('number', 'Weight');
          
          // load a csv file from data/sankey.csv and use it to add rows to the data table, skipping the first row
          // load the data from a csv file
          
  
          // Sets chart options.
          var options = {
            width: 600,
          };
  
          // Instantiates and draws our chart, passing in some options.
          var chart = new google.visualization.Sankey(document.getElementById('sankey_basic'));
          chart.draw(data, options);
        }  */