var map, heatmap, data, stores;
var nextStore = 0;
var maxSpeed = {key: 0, speed: 0};
var elevationGain = {key: 0, gain: 0};
var longestRide = {key: 0, distance: 0};

$.ajax({
  //get our JSON data
  // url:"https://www.strava.com/api/v3/clubs/3905/activities?access_token=ebda7a44647255023d1e121f45d9b5e767fb6c55&per_page=200&callback=callback_function",
  url:"https://www.strava.com/api/v3/clubs/134344/activities?access_token=ebda7a44647255023d1e121f45d9b5e767fb6c55&per_page=200&callback=callback_function",
  crossDomain: true,
  dataType: "jsonp",

  // store the data as a JS object
  success: function (response) {
    stores = response;
    console.log(stores);
  }
});

function initialize() {

  // Create an array of styles.
  // var styles = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]
  
  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  // var styledMap = new google.maps.StyledMapType(styles,
  //   {name: "Styled Map"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(47.6097, -122.3331),
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    mapTypeControlOptions: {
      mapTypeId: [google.maps.MapTypeId.SATELLITE]
    },
    disableDefaultUI: true
  };
  
  // create a new map object
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  // map.mapTypes.set('map_style', styledMap);

  data = new google.maps.MVCArray();

  getMapData(stores, data);

  //draw the heatmap
  heatmap = new google.maps.visualization.HeatmapLayer({
    map: map,
    data: data,
    radius: 6,
    opacity: .6,
    dissipate: false,
  });

  // map.setMapTypeId('map_style');

  getStats(stores);
}

//@param jsonData: Strava's JSON object
//@param dataArray: the global google map MVC array

function getMapData(jsonData, dataArray) {
  // loop through our JSON object, adding points.
  for (var key in jsonData){
    if (jsonData.hasOwnProperty(key)) {
      
      var latLongEncoded = jsonData[key].map.summary_polyline;

      if (latLongEncoded){
        var latLongDecoded = google.maps.geometry.encoding.decodePath(latLongEncoded);
      }

      for (var i = latLongDecoded.length - 1; i >= 0; i--) {
        dataArray.push(new google.maps.LatLng(latLongDecoded[i].k, latLongDecoded[i].D));
      };
    }
  }
}

function getStats(jsonData) {

  // loop through our JSON object, adding points.
  for (var key in jsonData){
    if (jsonData.hasOwnProperty(key)) {
      console.log("Key: " + key)
      console.log("JSON Distance: " + jsonData[key].distance);
      console.log("Longest Ride: " + longestRide.distance);
      console.log("JSON Max Speed: " + jsonData[key].max_speed);
      console.log("Max Speed: " + maxSpeed.speed);
      console.log("JSON Elevation Gain: " + jsonData[key].total_elevation_gain);
      console.log("Most Gain: " + elevationGain.gain);

      if (jsonData[key].distance > longestRide.distance) {
        longestRide.key = key;
        longestRide.distance = jsonData[key].distance;
      };

      if (jsonData[key].max_speed > maxSpeed.speed) {
        maxSpeed.key = key;
        maxSpeed.speed = jsonData[key].max_speed;
      };

      if (jsonData[key].total_elevation_gain > elevationGain.gain) {
        elevationGain.key = key;
        elevationGain.gain = jsonData[key].total_elevation_gain;
      };
    }
  }
  
  longestRide.distance = longestRide.distance * 0.000621371;
  maxSpeed.speed = maxSpeed.speed  * 2.2369362920544;
  elevationGain.gain = elevationGain.gain * 3.28084;

  $( "#longestRide" ).append(longestRide.distance.toFixed(2) + ' miles <br >By <a href="https://www.strava.com/activities/'  + jsonData[longestRide.key].id + '">' + jsonData[longestRide.key].athlete.firstname + " " + jsonData[longestRide.key].athlete.lastname +"</a>");
  $( "#maxSpeed" ).append(maxSpeed.speed.toFixed(2) + ' mph <br >By <a href="https://www.strava.com/activities/'  + jsonData[maxSpeed.key].id + '">' + jsonData[maxSpeed.key].athlete.firstname + " " + jsonData[maxSpeed.key].athlete.lastname +"</a>");
  $( "#elevationGain" ).append(elevationGain.gain.toFixed(0) + ' feet <br >By <a href="https://www.strava.com/activities/'  + jsonData[elevationGain.key].id + '"  target="_blank">' + jsonData[elevationGain.key].athlete.firstname + " " + jsonData[elevationGain.key].athlete.lastname +"</a>");

}

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', initialize);