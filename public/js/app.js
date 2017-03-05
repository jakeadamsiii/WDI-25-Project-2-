'use strict';

/* global google:ignore mapStyles:ignore */

$(function () {

  // Store the #map div, and make it available to all functions
  var $map = $('#map');
  // Set a map variable that will hold our Google map, and is available to all functions
  var map = null;
  // Set infowindow as null to begin with, and make it available to all functions
  var infowindow = null;
  // If there is a #map div on the page, then initialise the Google map
  if ($map.length) initMap();

  function initMap() {
    var latLng = { lat: 51.583241, lng: -0.411754 };
    map = new google.maps.Map($map.get(0), {
      zoom: 16,
      center: latLng,
      scrollwheel: false,
      // Map styles are stored in another .js file - which is required above the app.js and is available inside this file
      styles: mapStyles
    });

    //  getBikes();
  }

  // function getBikes() {
  //   $.get('https://api.tfl.gov.uk/bikepoint')
  //     .done((response) => { // Response is equal to an array of all of the bike points
  //       $.each(response, (index, location) => {
  //         // Add a marker for each bike point
  //         addMarker(location);
  //       });
  //     });
  // }
  //
  // function addMarker(location) {
  //   const latLng = { lat: location.lat, lng: location.lon };
  //   const marker = new google.maps.Marker({
  //     position: latLng,
  //     map: map,
  //     icon: '../assets/images/dot.svg' // Adding a custom icon
  //   });
  //
  //   // Add a Google maps event listener to each that marker, which fires the markerClick function, passing in that individual marker and that individual location
  //   marker.addListener('click', () => {
  //     markerClick(marker, location);
  //   });
  // }
  //
  // function markerClick(marker, location) {
  //   // If there is an open infowindow on the map, close it
  //   if(infowindow) infowindow.close();
  //
  //   // Locate the data that we need from the individual bike object
  //   const locationName = location.commonName;
  //   const noOfBikes = location.additionalProperties.find(obj => obj.key === 'NbBikes').value;
  //   const noOfSpaces = location.additionalProperties.find(obj => obj.key === 'NbEmptyDocks').value;
  //
  //   // Update the infowindow variable to be a new Google InfoWindow
  //   infowindow = new google.maps.InfoWindow({
  //     content: `
  //     <div class="infowindow">
  //       <h3>${locationName}</h3>
  //       <p>Available bikes: <strong>${noOfBikes}</strong></p>
  //       <p>Free spaces: <strong>${noOfSpaces}</strong></p>
  //     </div>
  //     `
  //   });
  //
  //   // Finally, open the new InfoWindow
  //   infowindow.open(map, marker);
  // }
});