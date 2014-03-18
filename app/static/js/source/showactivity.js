/* jshint camelcase:false */
/* global google:true */

(function(){

  'use strict';

  $(document).ready(initialize);

  var lat;
  var lng;
  var venuename;
  var map;
  var markers = [];

  function initialize(){
    prepareMap();
  }

  function prepareMap(){
    lat = $('#lat').text() * 1;
    lng = $('#lng').text() * 1;
    venuename = $('#venuename').text();
    console.log(lat);
    console.log(lng);
    console.log(venuename);
    initMap(lat, lng, 15, venuename);
  }

  function initMap(lat, lng, zoom, venuename){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var loca = {lat:lat, lng:lng, title:venuename};
    addMarker(loca);
  }

  function addMarker(loca){
    var position = new google.maps.LatLng(loca.lat, loca.lng);
    var marker = new google.maps.Marker({map:map, position:position, title:loca.venuename});
    markers.push(marker);
  }

})();
