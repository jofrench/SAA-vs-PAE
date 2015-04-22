var map, heatmap, data, stores;
var nextStore = 0;

$.ajax({
  //get our JSON data
  url:"https://data.seattle.gov/resource/3k2p-39jp.json?event_clearance_description=BICYCLE%20THEFT",
  crossDomain: true,
  dataType: "json",

  // store the data as a JS object
  success: function (response) {
    stores = response;
  }
});

function initialize() {

  // Create an array of styles.
  var styles = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]
  
  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(47.6097, -122.3331),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
    disableDefaultUI: true
  };
  
  // create a new map object
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);

  data = new google.maps.MVCArray();

  //loop through our JSON object, adding points.
  for (var key in stores){
    if (stores.hasOwnProperty(key)) {
      data.push(new google.maps.LatLng(stores[key].latitude, stores[key].longitude));
    }
  }
  
  //draw the heatmap
  heatmap = new google.maps.visualization.HeatmapLayer({
    map: map,
    data: data,
    radius: 10,
    opacity: 0.6,
    dissipate: false,
  });

  map.setMapTypeId('map_style');
}

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', initialize);