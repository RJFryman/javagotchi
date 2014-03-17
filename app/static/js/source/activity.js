/* jshint camelcase:false */
/* global google:true */

(function(){

  'use strict';

  $(document).ready(initialize);

  var lat;
  var lng;
  var map;
  var markers = [];

  function initialize(){
    getLocation();
    $('#queryfoursquare').click(getFoursquareVenues);
    $('#queryweather').click(getWeather);
    $('#locationdata').on('mouseover', '.venuehover', function(){$(this).addClass('listhover');});
    $('#locationdata').on('mouseout', '.venuehover', function(){$(this).removeClass('listhover');});
    $('#historicweathersearch').on('click', '#gethistoricweather', getHistoricWeather);
    $('#locationsearch').on('click', '#searchfoursquare', searchFoursquare);
    $('#historicweather').click(toggleClassWeather);
    $('#otherlocation').click(toggleClassFoursquare);
    $('#locationdata').on('click', '.activitydata', grabVenue);
    $('#addactivity').click(addActivity);
  }

  function toggleClassWeather(event){
    $('#weatherdata').empty();
    $('#historicweathersearch').toggleClass('hide');
    event.preventDefault();
  }

  function toggleClassFoursquare(event){
    $('#venuetable').empty();
    $('#locationsearch').toggleClass('hide');
    event.preventDefault();
  }

  function getLocation(){
    var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  }

  function geoSuccess(location){
    lat = location.coords.latitude;
    lng = location.coords.longitude;
    $('#weathersection').removeClass('hide');
    $('#locationsection').removeClass('hide');
    initMap(lat, lng, 15, 'Current Location');
  }

  function geoError(){
    console.log('Sorry, no position available.');
  }

  function getFoursquareVenues(event){
    $('#venuetable').empty();
    var clientid = 'CEOFOL4IRP2KFPAVY5AR2OF4FUC15HCTE4DALXIVGDTG24N1';
    var clientsecret = 'BHCBDXVPSAQBGCAJGEYCT13JMW2V3SJYRFGTBPJVSK4Q0EWX';
    var url = 'https://api.foursquare.com/v2/venues/search?client_id='+clientid+'&client_secret='+clientsecret+'&v=20130815&ll='+lat+','+lng;
    $.getJSON(url, populateFoursquareSelect);
    event.preventDefault();
  }

  function searchFoursquare(event){
    $('#venuetable').empty();
    var clientid = 'CEOFOL4IRP2KFPAVY5AR2OF4FUC15HCTE4DALXIVGDTG24N1';
    var clientsecret = 'BHCBDXVPSAQBGCAJGEYCT13JMW2V3SJYRFGTBPJVSK4Q0EWX';
    var citystate = $('#citystate').val(); // must be in format Dallas,TX
    var query = $('#searchlocation').val(); // must be a string
    var url = 'https://api.foursquare.com/v2/venues/search?client_id='+clientid+'&client_secret='+clientsecret+'&v=20130815&near='+citystate+'&query='+query;
    $.getJSON(url, populateFoursquareSelect);
    event.preventDefault();
  }

  function populateFoursquareSelect(data){
    console.log('FOURSQUARE VENUE DATA:');
    console.log(data);
    
    var $table = $('<table>').attr('id', 'venuetable');
    var $thead = $('<thead>');
    var $thicon = $('<th>');
    var $thvenue = $('<th>');
    var $tbody = $('<tbody>');
    $table.append($thead, $thicon, $thvenue, $tbody);
    $('#locationdata').append($table);
    
    for(var i = 0; i < data.response.venues.length; i++){
      var $tr = $('<tr>').addClass('venuehover');
      var $tdicon = $('<td>');
      var $tdvenue = $('<td>');
      $tdicon.addClass('icon');
      $tdicon.css('background-image', 'url('+data.response.venues[i].categories[0].icon.prefix + 'bg_32' + data.response.venues[i].categories[0].icon.suffix + ')');
      var $liname = $('<li>').text(data.response.venues[i].name).addClass('venuename');
      var $liaddress = $('<li>').text(data.response.venues[i].location.address);
      var $licitystate = $('<li>').text(data.response.venues[i].location.city+', '+data.response.venues[i].location.state+' '+data.response.venues[i].location.postalCode);
      var $lilat = $('<li>').text(data.response.venues[i].location.lat).addClass('hide');
      var $lilng = $('<li>').text(data.response.venues[i].location.lng).addClass('hide');
      var $ul = $('<ul>').addClass('activitydata');
      $ul.append($liname, $liaddress, $licitystate, $lilat, $lilng);
      $tdvenue.append($ul);
      $tr.append($tdicon, $tdvenue);
      $('#venuetable').append($tr);
    }
  }

  function getWeather(event){
    $('#weatherdata').empty();
    var url = 'http://api.wunderground.com/api/c098c4de54fd58cb/conditions/q/'+lat+','+lng+'.json?callback=?';
    $.getJSON(url, populateWeather);
    event.preventDefault();
  }

  function getHistoricWeather(event){
    $('#weatherdata').empty();
    var date = $('#historicdate').val().toString().replace(/-/g,''); // must be in format YYYYMMDD
    var place = $('#historicplace').val().toString(); // must be in format TX/Dallas
    var url = 'http://api.wunderground.com/api/c098c4de54fd58cb/history_'+date+'/q/'+place+'.json?callback=?';
    $.getJSON(url, populateHistoricWeather);
    event.preventDefault();
  }

  function populateWeather(data){
    console.log('WEATHER UNDERGROUND CURRENT CONDITIONS DATA:');
    console.log(data);
    var $ul = $('<ul>').addClass('activitydata');
    var $liicon = $('<li>').addClass('weathericon').css('background-image', 'url('+data.current_observation.icon_url+')');
    var $lidesc = $('<li>').text(data.current_observation.weather);
    var $lifeelslike = $('<li>').text('Currently feels like: ' + data.current_observation.feelslike_string);
    var currentweatherdata = {icon:data.current_observation.icon_url, description:data.current_observation.weather, feelslike:data.current_observation.feelslike_string};
    $ul.append($liicon, $lidesc, $lifeelslike);
    $('#weatherdata').append($ul);
    $('#inputweathercurrent').val(JSON.stringify(currentweatherdata));
  }

  function populateHistoricWeather(data){
    console.log('WEATHER UNDERGROUND HISTORIC DATA:');
    console.log(data);
    var $ul = $('<ul>').addClass('activitydata');
    var $limeantemp = $('<li>').text('Mean Temperature: '+data.history.dailysummary[0].meantempi + ' F');
    var $limaxtemp = $('<li>').text('Max Temperature: '+data.history.dailysummary[0].maxtempi + ' F');
    var $limintemp = $('<li>').text('Min Temperature: '+data.history.dailysummary[0].mintempi + ' F');
    var $liprec = $('<li>').text('Precipitation: '+data.history.dailysummary[0].precipi);
    var historicweatherdata = {meantemp:data.history.dailysummary[0].meantempi, maxtemp:data.history.dailysummary[0].maxtempi, mintemp:data.history.dailysummary[0].mintempi, precip:data.history.dailysummary[0].precipi};
    $ul.append($limeantemp, $limaxtemp, $limintemp, $liprec);
    $('#inputweatherhistoric').val(JSON.stringify(historicweatherdata));
    $('#weatherdata').append($ul);
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

  function grabVenue(){
    var icon = $(this).parent().siblings('.icon').attr('style').replace('background-image: url(', '').replace(');','');
    var venuename = $(this).find('.venuename').text();
    var venueaddress = $(this).find('.venuename').siblings('li:nth-child(2)').text();
    var venuecitystate = $(this).find('.venuename').siblings('li:nth-child(3)').text();
    var venuelat = $(this).find('.venuename').siblings('li:nth-child(4)').text();
    var venuelng = $(this).find('.venuename').siblings('li:nth-child(5)').text();
    var currentvenue = {icon:icon, venuename:venuename, venueaddress:venueaddress, venuecitystate:venuecitystate, lat:venuelat, lng:venuelng};
    $('#inputlocation').val(JSON.stringify(currentvenue));
    $('#venuetable').empty();
    var $tr = $('<tr>');
    var $tdicon = $('<td>');
    var $tdvenue = $('<td>');
    $tdicon.addClass('icon');
    $tdicon.css('background-image', 'url('+icon+')');
    var $liname = $('<li>').text(venuename);
    var $liaddress = $('<li>').text(venueaddress);
    var $licitystate = $('<li>').text(venuecitystate);
    var $ul = $('<ul>').addClass('activitydata');
    $ul.append($liname, $liaddress, $licitystate);
    $tdvenue.append($ul);
    $tr.append($tdicon, $tdvenue);
    $('#venuetable').append($tr);
    initMap(venuelat, venuelng, 15, venuename);
  }

  function addActivity(event){
    var data = $('#activityform').serialize();
    console.log('SERIALIZED FORM DATA:');
    console.log(data);
    var url = '/activities';
    var type = 'POST';
    var success = successfunc;
    $.ajax({url:url, type:type, data:data, success:success});
    event.preventDefault();
  }

  function successfunc(data){
    console.log('DATA RETURNED FROM THE SERVER:');
    console.log(data);
  }

})();

