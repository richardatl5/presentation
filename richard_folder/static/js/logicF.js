//  3111 is Wednesday Accurate

// Use this link to get the geojson data.
var geolink = "static/data/countriesMAP.geojson";
var hundredlink ="static/data/100Players.json";
var thousandlink ="static/data/1000Players.json";
var tenthousandlink ="static/data/10000Players.json";
var fifalink ="static/data/AllPlayers.json";
var currentlink = hundredlink;
console.log("&&",fifalink,"&&");


// Creating map object
//var myMap = L.map("map", {
//  center: [40,0],
//  zoom: 2.49
//});



d3.json(currentlink, function(data) {
  FIFAcountries = data;
  // console.log(FIFAcountries)
});
 
// Creating map object
var myMap = L.map("map", {
  center: [30,0],
  zoom: 2.49
});

function MapIt(){
  

  // Adding tile layer
  var temp = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  })
  temp.addTo(myMap);  


  // Grabbing our GeoJSON data..
  d3.json(geolink, function(data) {
    // Creating a geoJSON layer with the retrieved data
    var thelayer = L.geoJson(data, {
      style: function(feature) {
        return {
          color: "white",
          fillColor: chooseColor(feature.properties.ADMIN),
          fillOpacity: 0.5,
          weight: 1.5
        };
      }
   })
   thelayer.addTo(myMap);
   
  });
  
}

MapIt()


function chooseColor(ADMIN) {
  var i;
  for (i = 0; i<FIFAcountries.length; i++) {
    // console.log(i)
    if (FIFAcountries[i].nationality===ADMIN) {
      thecolor=FIFAcountries[i].Color;
      return thecolor
    }
    else {
      thecolor="black"
    }   
  }
    return thecolor
}


function toggleClass(elem,className){
  if (elem.className.indexOf(className) !== -1){
    elem.className = elem.className.replace(className,'');
  }
  else{
    elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
  }

  return elem;
}

function toggleDisplay(elem){
  const curDisplayStyle = elem.style.display;			

  if (curDisplayStyle === 'none' || curDisplayStyle === ''){
    elem.style.display = 'block';
  }
  else{
    elem.style.display = 'none';
  }

}

function toggleMenuDisplay(e){
  const dropdown = e.currentTarget.parentNode;
  const menu = dropdown.querySelector('.menu');
  const icon = dropdown.querySelector('.fa-angle-right');

  toggleClass(menu,'hide');
  toggleClass(icon,'rotate-90');
}

function handleOptionSelected(e){
  toggleClass(e.target.parentNode, 'hide');			

  const id = e.target.id;
  const newValue = e.target.textContent + ' ';
  const titleElem = document.querySelector('.dropdown .title');
  const icon = document.querySelector('.dropdown .title .fa');


  titleElem.textContent = newValue;
  titleElem.appendChild(icon);

  //trigger custom event
  document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
    //setTimeout is used so transition is properly shown
  setTimeout(() => toggleClass(icon,'rotate-90',0));
}

function handleTitleChange(e){
  const result = document.getElementById('result');
  var opt = String(e.target.textContent);
 
  var  opt2 =opt.substring(8,9);
  console.log("***",opt2,"***");
  //thelayer.removelayer(MyMap);
  // map.remove();

  if(opt2 === "P") {
    console.log("!");
    currentlink=hundredlink;
    d3.json(currentlink, function(data) {
      FIFAcountries = data;  
    });

    MapIt()
  }


  if(opt2 === " ") {
    console.log("!!");
    currentlink=thousandlink;
    d3.json(currentlink, function(data) {
      FIFAcountries = data;  
    });

    MapIt()
  }
  
  if(opt2 === "0") {
    console.log("!!!");
    currentlink=tenthousandlink;
    d3.json(currentlink, function(data) {
      FIFAcountries = data;  
    });

    MapIt()
  }

  if(opt2 === "e") {
    console.log("!!!!");
    currentlink=fifalink;
    d3.json(currentlink, function(data) {
      FIFAcountries = data;  
    });

    MapIt()
  }

  result.innerHTML = 'You are looking at ' + e.target.textContent;
  //if (opt == "Option 1"){
  //  console.log(opt)
 // }
  // console.log(e.target.textContent)

}

//get elements
const dropdownTitle = document.querySelector('.dropdown .title');
const dropdownOptions = document.querySelectorAll('.dropdown .option');

//bind listeners to these elements
dropdownTitle.addEventListener('click', toggleMenuDisplay);

dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));

document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);