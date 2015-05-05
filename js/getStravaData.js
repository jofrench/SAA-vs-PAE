var map, heatmap, data, stores;
var maxSpeed = {key: 0, speed: 0};
var elevationGain = {key: 0, gain: 0};
var longestRide = {key: 0, distance: 0};
var bounds = new google.maps.LatLngBounds();
//an array for our heatmap points
var pointArray = new google.maps.MVCArray();

$.ajax({
  //get our JSON data
  // url:"https://www.strava.com/api/v3/clubs/3905/activities?access_token=ebda7a44647255023d1e121f45d9b5e767fb6c55&per_page=200&callback=callback_function",
  url:"https://www.strava.com/api/v3/clubs/134344/activities?access_token=ebda7a44647255023d1e121f45d9b5e767fb6c55&per_page=200&callback=callback_function",
  crossDomain: true,
  dataType: "jsonp",

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
  

  //set our general map options.
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(47.6097, -122.3331),
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    disableDefaultUI: true
  };
  
  // create a new map object
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);

  

  //run through every Strava object we get
  for (var key in stores){
    //ensure that it something, something... important!
    if (stores.hasOwnProperty(key)) {
      
      //get the encoded polyline value
      var latLongEncoded = stores[key].map.summary_polyline;

      //if the polyline value is not null
      if (latLongEncoded){
        
        //use Google's handy-dandy decoding tool
        var latLongDecoded = google.maps.geometry.encoding.decodePath(latLongEncoded);
        console.log(latLongDecoded);
        
        for (var z = latLongDecoded.length -1; z >= 0; z--){
          pointArray.push(latLongDecoded[z]);
        }
        

        //increase the bounds of the zoom, to ensure we capture all of the polylines
        for (var i = latLongDecoded.length - 1; i >= 0; i--) {
          bounds.extend(latLongDecoded[i]);
        };
      }


    }
  }

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });

  heatmap.setMap(map);

  //zoom the map to fit all of the polylines
  map.fitBounds (bounds);

  //separated into a separate function, for ease of reading
  getStats(stores);

}

function getStats(jsonData) {

  // loop through our JSON object, adding points.
  for (var key in jsonData){
    if (jsonData.hasOwnProperty(key)) {

      //if the distance of the ride is longer than the recorded max distance...
      if (jsonData[key].distance > longestRide.distance) {
        longestRide.key = key;
        longestRide.distance = jsonData[key].distance;
      };

      //if the speed of the ride is longer than the recorded max speed...
      if (jsonData[key].max_speed > maxSpeed.speed) {
        maxSpeed.key = key;
        maxSpeed.speed = jsonData[key].max_speed;
      };

      //if the elevation of the ride is longer than the recorded max elevation...
      if (jsonData[key].total_elevation_gain > elevationGain.gain) {
        elevationGain.key = key;
        elevationGain.gain = jsonData[key].total_elevation_gain;
      };
    }
  }
  
  //convert from meters
  longestRide.distance = longestRide.distance * 0.000621371;
  maxSpeed.speed = maxSpeed.speed  * 2.2369362920544;
  elevationGain.gain = elevationGain.gain * 3.28084;

  //render the data
  $( "#longestRide" ).append(longestRide.distance.toFixed(2));
  $( "#longestRideStats" ).append(
    'By ' 
    + jsonData[longestRide.key].athlete.firstname 
    + " " 
    + jsonData[longestRide.key].athlete.lastname 
    +'<br><a href="https://www.strava.com/activities/'  
    + jsonData[longestRide.key].id 
    + '" target="_blank">View Details</a>');
  $( "#maxSpeed" ).append(maxSpeed.speed.toFixed(2));
  $( "#maxSpeedStats" ).append(
    'By ' 
    + jsonData[maxSpeed.key].athlete.firstname 
    + " " 
    + jsonData[maxSpeed.key].athlete.lastname 
    + '<br><a href="https://www.strava.com/activities/'  
    + jsonData[maxSpeed.key].id 
    + '">View Details</a>');
  $( "#elevationGain" ).append(elevationGain.gain.toFixed(0));
  $( "#elevationGainStats" ).append(
    'By ' 
    + jsonData[elevationGain.key].athlete.firstname 
    + " " 
    + jsonData[elevationGain.key].athlete.lastname 
    + '<br><a href="https://www.strava.com/activities/'  
    + jsonData[elevationGain.key].id 
    + '"  target="_blank">View Details</a>');

}

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', initialize);