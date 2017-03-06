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
    var latLng = { lat: 51.507558, lng: -0.127625 };
    map = new google.maps.Map($map.get(0), {
      zoom: 13,
      center: latLng,
      scrollwheel: false,
      // Map styles are stored in another .js file - which is required above the app.js and is available inside this file
      styles: mapStyles
    });

    getGigs();
  }

  function getGigs() {
    var events = $map.data('events');
    // console.log(events);
    $.each(events, function (index, location) {
      console.log(location);
      addMarker(location);
    });
  }

  function addMarker(location) {
    var latLng = { lat: location.venue.latitude, lng: location.venue.longitude };
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: '../assets/images/music-icon.png'
    });
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    // Add a Google maps event listener to each that marker, which fires the markerClick function, passing in that individual marker and that individual location
    marker.addListener('click', function () {
      markerClick(marker, location);
    });
  }

  function markerClick(marker, location) {
    // If there is an open infowindow on the map, close it
    if (infowindow) infowindow.close();

    // Locate the data that we need from the individual bike object
    var eventName = location.eventname;
    var price = location.entryprice;
    var venue = location.venue.name;
    var link = location.link;
    var date = location.date;
    var time = location.openingtimes.doorsopen;

    // Update the infowindow variable to be a new Google InfoWindow
    infowindow = new google.maps.InfoWindow({
      content: '\n      <div class="infowindow">\n        <h4>' + eventName + '</h4>\n        <p>' + venue + '</p>\n        <p>' + price + '</p>\n        <p>' + date + '</p>\n        <p>' + time + '</p>\n        <a class="btn" href="' + link + '" target="_blank">Buy tickets</a>\n        <a class="btn" href="/profile">Save for later!</a>\n      </div>\n      '
    });

    // Finally, open the new InfoWindow
    infowindow.open(map, marker);
  }
});