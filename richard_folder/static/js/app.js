datasetOverall = [
    {label:"Belgium", value:68.24},
    {label:"France", value:67.85},
    {label:"Brazil", value:71.97},
    {label:"England", value:63.76},
    {label:"Portugal", value:70.63},
    {label:"Spain", value:69.63},
    {label:"Argentina", value:69.67},
    {label:"Uruguay", value:68.10},
    {label:"Mexico", value:66.19},
    {label:"Italy", value:68.94}
];

datasetPace =  [
    {label:"Belgium", value:68.61},
    {label:"France", value:67.33},
    {label:"Brazil", value:69.46},
    {label:"England", value:67.87},
    {label:"Portugal", value:69.38},
    {label:"Spain", value:66.54},
    {label:"Argentina", value:65.69},
    {label:"Uruguay", value:67.24},
    {label:"Mexico", value:67.01},
    {label:"Italy", value:65.40} 
     ];

datasetDribbling =  [
    {label:"Belgium", value:66.47},
    {label:"France", value:64.59},
    {label:"Brazil", value:68.18},
    {label:"England", value:61.67},
    {label:"Portugal", value:68.36},
    {label:"Spain", value:66.21},
    {label:"Argentina", value:64.32},
    {label:"Uruguay", value:64.09},
    {label:"Mexico", value:63.95},
    {label:"Italy", value:65.43} 
];

datasetShooting =  [
    {label:"Belgium", value:54.96},
    {label:"France", value:53.91},
    {label:"Brazil", value:59.73},
    {label:"England", value:49.98},
    {label:"Portugal", value:57.61},
    {label:"Spain", value:56.35},
    {label:"Argentina", value:53.93},
    {label:"Uruguay", value:54.18},
    {label:"Mexico", value:54.06},
    {label:"Italy", value:55.59} 
];
      
datasetPassing =  [
    {label:"Belgium", value:58.97},
    {label:"France", value:56.71},
    {label:"Brazil", value:60.66},
    {label:"England", value:51.83},
    {label:"Portugal", value:60.05},
    {label:"Spain", value:59.63},
    {label:"Argentina", value:55.33},
    {label:"Uruguay", value:55.34},
    {label:"Mexico", value:56.32},
    {label:"Italy", value:57.28} 
]; 
        
datasetDefending =  [
    {label:"Belgium", value:52.03},
    {label:"France", value:53.71},
    {label:"Brazil", value:54.20},
    {label:"England", value:50.33},
    {label:"Portugal", value:54.80},
    {label:"Spain", value:54.02},
    {label:"Argentina", value:50.17},
    {label:"Uruguay", value:51.91},
    {label:"Mexico", value:52.81},
    {label:"Italy", value:53.60} 
];   

datasetPhysical =  [
    {label:"Belgium", value:63.66},
    {label:"France", value:64.50},
    {label:"Brazil", value:66.41},
    {label:"England", value:63.49},
    {label:"Portugal", value:65.45},
    {label:"Spain", value:63.42},
    {label:"Argentina", value:64.11},
    {label:"Uruguay", value:65.50},
    {label:"Mexico", value:62.71},
    {label:"Italy", value:62.91} 
];  

datasetGoalkeeping =  [
     {label:"Belgium", value:62.11},
     {label:"France", value:61.68},
     {label:"Brazil", value:66.10},
     {label:"England", value:57.92},
     {label:"Portugal", value:63.77},
     {label:"Spain", value:64.22},
     {label:"Argentina", value:64.65},
     {label:"Uruguay", value:63.08},
     {label:"Mexico", value:62.74},
     {label:"Italy", value:62.42} 
];          

// Set the margins of the chart
var margin = {top: (parseInt(d3.select('body').style('height'), 10)/20), right: (parseInt(d3.select('body').style('width'), 10)/20), bottom: (parseInt(d3.select('body').style('height'), 10)/20), left: (parseInt(d3.select('body').style('width'), 10)/5)},
        width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
        height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;

// Append the tooltip to the index
var div = d3.select("body").append("div").attr("class", "toolTip");

// Set the Y scale
var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .2, 0.5);

// Set the X scale
var x = d3.scale.linear()
        .domain([48, 74])
        .range([0, width]);

// Set the colors based on the country label
var colorColumn = "label";

// Color scale to have each bar a different color
var colorScale = d3.scale.category10();

// Setting the X Axis
var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(-height)
        .orient("bottom");

// Setting the Y axis
var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

// Set the svg element
var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "graph-svg-component");

// Call the X Axis
svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

// Set it for overall to be checked on load
d3.select("input[value=\"Overall\"]").property("checked", true);
change(datasetOverall);

// Function to load new data when new category is checked
d3.selectAll("input").on("change", selectDataset);

function change(dataset) {

    y.domain(dataset.map(function(d) { return d.label; }));
    x.domain([d3.min(dataset, function(d) { return d.value-2; }), d3.max(dataset, function(d) { return d.value; })]);
    colorScale.domain(dataset.map(function (d){ return d[colorColumn]; }));

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    svg.select(".y.axis").remove();
    svg.select(".x.axis").remove();

    svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(0)")
            .attr("x", 48)
            .attr("dx", ".1em")
            .style("text-anchor", "center")
            .style("font-weight", "bold")
            .style("font-size","35px")
            .style("fill","navy")
            .text("Top 10 Countries Comparison");

    var bar = svg.selectAll(".bar")
            .data(dataset, function(d) {return d.label; });

    // New data:
    bar.enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {return x(d.value); })
            .attr("y", function(d) {return y(d.label); })
            .attr("width", function(d) {return width-x(d.value); })
            .attr("height", y.rangeBand())
            

    bar
            .on("mousemove", function(d){
                div.style("left", d3.event.pageX+10+"px");
                div.style("top", d3.event.pageY-25+"px");
                div.style("display", "inline-block");
                div.html((d.label)+"<br>"+(d.value));
            });
    bar
            .on("mouseout", function(d){
                div.style("display", "none");
            });

    // Remove data:
    bar.exit().remove();

    // Update data:
    bar.transition()
            .duration(1000)
            .attr("x", function(d) {return 0; })
            .attr("y", function(d) {return y(d.label); })
            .attr("width", function(d) {return x(d.value); })
            .attr("height", y.rangeBand())
            .attr("fill", function (d){ return colorScale(d[colorColumn]); });

}      

// If/else function for choosing different categories 
function selectDataset()
{
    var value = this.value;
    if (value == "Overall")
    {
        change(datasetOverall);
    }
    else if (value == "Pace")
    {
        change(datasetPace);
    }
    else if (value == "Dribbling")
    {
        change(datasetDribbling);
    }
    else if (value == "Shooting")
    {
        change(datasetShooting);
    }
    else if (value == "Passing")
    {
        change(datasetPassing);
    }
    else if (value == "Defending")
    {
        change(datasetDefending);
    }
    else if (value == "Physical")
    {
        change(datasetPhysical);
    }
    else if (value == "Goalkeeping")
    {
        change(datasetGoalkeeping);
    }
}

// Retrieve data from the CSV file and execute everything below
d3.csv("./data/fifa21_top10.csv",function(top10Data) {

      
        // parse data
        top10Data.forEach(function(data) {
          data.Overall = +data.Overall;
          data.Pace = +data.Pace;
          data.Dribbling = +data.Dribbling;
          data.Shooting = +data.Shooting;
          data.Passing = +data.Passing;
          data.Defending = +data.Defending;
          data.Physical = +data.Physical;
          data.Goalkeeping = +data.Goalkeeping;
        });
console.log(top10Data);

});
