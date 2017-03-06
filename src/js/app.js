/* global google:ignore mapStyles:ignore */

$(() => {

  // Store the #map div, and make it available to all functions
  const $map = $('#map');
  // Set a map variable that will hold our Google map, and is available to all functions
  let map = null;
  // Set infowindow as null to begin with, and make it available to all functions
  let infowindow = null;
  // If there is a #map div on the page, then initialise the Google map
  if ($map.length) initMap();

  function initMap() {
    const latLng = { lat: 51.507558, lng: -0.127625 };
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
    const events = $map.data('events');
    // console.log(events);
    $.each(events, (index, location) => {
      console.log(location);
      addMarker(location);
    });
  }

  function addMarker(location) {
    const latLng = { lat: location.venue.latitude, lng: location.venue.longitude };
    const marker = new google.maps.Marker({
      position: latLng,
      map: map
    });

    // Add a Google maps event listener to each that marker, which fires the markerClick function, passing in that individual marker and that individual location
    marker.addListener('click', () => {
      markerClick(marker, location);
    });
  }

  function markerClick(marker, location) {
    // If there is an open infowindow on the map, close it
    if(infowindow) infowindow.close();

    // Locate the data that we need from the individual bike object
    const eventName = location.eventname;
    const price = location.entryprice;
    const venue = location.venue.name;
    const link = location.link;

    // Update the infowindow variable to be a new Google InfoWindow
    infowindow = new google.maps.InfoWindow({
      content: `
      <div class="infowindow">
        <h5>${eventName}</h5>
        <p>${venue}</p>
        <p>${price}</p>
        <a href="${link}" target="_blank">Buy tickets</a>
      </div>
      `
    });

    // Finally, open the new InfoWindow
    infowindow.open(map, marker);
  }

});
