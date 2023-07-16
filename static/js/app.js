 // Fetch the initial data and populate the dropdown on page load
 document.addEventListener("DOMContentLoaded", () => {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(data => {
        var dropdown = document.getElementById("selDataset");
  
        // Loop through the data and create options for the dropdown
        data.names.forEach(name => {
          var option = document.createElement("option");
          option.value = name;
          option.text = name;
          dropdown.appendChild(option);
        });
    })
});

// Function to handle the dropdown selection
function optionChanged(value) {
    
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(data => {
        updateBarChart(data, value);
        updateBubbleChart(data, value);
        updateDemographicInfo(data, value);
      })
  }
  
  // Function to update the bar chart
  function updateBarChart(data, value) {
    
    var samples = data.samples.find(sample => sample.id === value);
  
    // Slice top 10
    var top10Samples = samples.sample_values.slice(0, 10);
    var top10Labels = samples.otu_ids.slice(0, 10);
    var top10HoverText = samples.otu_labels.slice(0, 10);
  
    // Bar Chart
    var barChartData = [
      {
        x: top10Samples,
        y: top10Labels.map(label => `OTU ${label}`),
        text: top10HoverText,
        type: "bar",
        orientation: "h"
      }
    ];
  
    var barChartLayout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };
  
    
    Plotly.newPlot("bar", barChartData, barChartLayout);
  }
  
  // Function to update bubble chart
  function updateBubbleChart(data, value) {
    var samples = data.samples.find(sample => sample.id === value);
    var bubbleChartData = [
        {
            x: samples.otu_ids,
            y: samples.sample_values,
            text: samples.otu_labels,
            mode: "markers",
            marker: {
              size: samples.sample_values,
              color: samples.otu_ids,
              colorscale: "Cividis"  //for color vision deficiencies
        }
        }
    ];
    var bubbleChartLayout = {
        title: "Sample Bubble Chart",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
      };
    
      
      Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);

  }

  // Function to update the demographic info
  function updateDemographicInfo(data, value) {
    
    var metadata = data.metadata.find(meta => meta.id.toString() === value);
  
    
    var metadataContainer = document.getElementById("sample-metadata");
    metadataContainer.innerHTML = "";
  
    
    Object.entries(metadata).forEach(([key, value]) => {
      var paragraph = document.createElement("p");
      paragraph.textContent = `${key}: ${value}`;
      metadataContainer.appendChild(paragraph);
    });
  }
  

 
  