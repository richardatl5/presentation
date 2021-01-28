
var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 110,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "value";

// function used for updating x-scale var upon click on axis label
function xScale(fifaData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(fifaData, d => d[chosenXAxis]) * 0.9,
      d3.max(fifaData, d => d[chosenXAxis]) * 1.1
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}


// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "value") {
    label = "Value (Euros):";
  }
  else if (chosenXAxis === "inches") {
    label = "Height (Inches)"
  }
  else if (chosenXAxis === "weight") {
    label = "Weight (Lbs)"
  }

  else {
    label = "Body Mass Index";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([90, -70])
    .html(function(d) {
      return (`${d.name}<br>${label} ${d[chosenXAxis]}<br>Rating: ${d.overall}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below

d3.json("/charts").then(function(fifaData, err) {
  if (err) throw err;

  console.log(fifaData)

  // parse data
  Object.keys(fifaData).forEach(function(data) {
    data.value = +data.value;
    data.bmi = +data.bmi;
    data.overall = +data.overall;
    data.inches = +data.inches;
    data.weight = +data.weight;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(fifaData, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([74, d3.max(fifaData, d => d.overall + 2)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(fifaData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.overall))
    .attr("r", 10)
    .attr("fill", "orange")
    .attr("opacity", "2");

  // Create group for multiple x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var valueEurosLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "value") // value to grab for event listener
    .classed("active", true)  // default x-axes
    .text("Value in Euros");

    var inchesLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "inches") // value to grab for event listener
    .classed("inactive", true)
    .text("Height (Inches)");

    var weightLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "weight") // value to grab for event listener
    .classed("inactive", true)
    .text("Weight (Lbs");

  var bmiLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 80)
    .attr("value", "bmi") // value to grab for event listener
    .classed("inactive", true)
    .text("Body Mass Index");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 30 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Overall Rating");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(fifaData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
        

        // changes classes to change bold text
        if (chosenXAxis === "bmi") {
          bmiLabel
            .classed("active", true)
            .classed("inactive", false);
            valueEurosLabel
            .classed("active", false)
            .classed("inactive", true);
            inchesLabel
            .classed("active", false)
            .classed("inactive", true);
            weightLabel
            .classed("active", false)
            .classed("inactive", true);         
        }

        else if (chosenXAxis === "inches") {
          inchesLabel
            .classed("active", true)
            .classed("inactive", false);
            valueEurosLabel
            .classed("active", false)
            .classed("inactive", true);
            bmiLabel
            .classed("active", false)
            .classed("inactive", true)
            weightLabel
            .classed("active", false)
            .classed("inactive", true)
        }

        else if (chosenXAxis === "weight") {
          weightLabel
            .classed("active", true)
            .classed("inactive", false)          
            bmiLabel
            .classed("active", false)
            .classed("inactive", true);
            valueEurosLabel
            .classed("active", false)
            .classed("inactive", true);
            inchesLabel
            .classed("active", false)
            .classed("inactive", true);       
        }

        else {
          valueEurosLabel
            .classed("active", true)
            .classed("inactive", false);          
            bmiLabel
            .classed("active", false)
            .classed("inactive", true);
            inchesLabel
            .classed("active", false)
            .classed("inactive", true);
            weightLabel
            .classed("active", false)
            .classed("inactive", true);          
          }
      }
    });
}).catch(function(error) {
  console.log(error);
});
