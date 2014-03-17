/* jshint camelcase:false */

(function(){

  'use strict';

  $(document).ready(initialize);

  var lat;
  var lng;

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
  }

  function toggleClassWeather(event){
    $('#historicweathersearch').toggleClass('hide');
    event.preventDefault();
  }

  function toggleClassFoursquare(event){
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
      var $ul = $('<ul>').addClass('activitydata');
      $ul.append($liname, $liaddress);
      $tdvenue.append($ul);
      //$tdname.text(data.response.venues[i].name);
      //$tdaddress.text(data.response.venues[i].location.address);
      $tr.append($tdicon, $tdvenue);
      $('#venuetable').append($tr);
    }
    /*
    for(var j = 0; j < data.response.venues.length; j++){
      var $liicon = $('<span>');
      $liicon.addClass('icon');
      $liicon.html('<img src="'+data.response.venues[j].categories[0].icon.prefix + 'bg_32' + data.response.venues[j].categories[0].icon.suffix+'">');
      //$liicon.css('background-image', 'url('+data.response.venues[j].categories[0].icon.prefix + 'bg_32' + data.response.venues[j].categories[0].icon.suffix + ')');
      var $liname = $('<span>');
      $liname.text(data.response.venues[j].name + ' | ');
      var $option = $('<option>');
      console.log(data.response.venues[j].name);
      var $liaddress = $('<span>');
      $liaddress.text(data.response.venues[j].location.address);
      //$option.text(data.response.venues[j].name);
      $option.append($liicon, $liname, $liaddress);
      $('#venueselect').append($option);
    }
    */
  }

  function getWeather(event){
    var url = 'http://api.wunderground.com/api/c098c4de54fd58cb/conditions/q/'+lat+','+lng+'.json?callback=?';
    $.getJSON(url, populateWeather);
    event.preventDefault();
  }

  function getHistoricWeather(event){
    var date = $('#historicdate').val().toString().replace(/-/g,''); // must be in format YYYYMMDD
    var place = $('#historicplace').val().toString(); // must be in format TX/Dallas
    var url = 'http://api.wunderground.com/api/c098c4de54fd58cb/history_'+date+'/q/'+place+'.json?callback=?';
    $.getJSON(url, populateWeather);
    event.preventDefault();
  }

  function populateWeather(data){
    console.log(data);
    var $ul = $('<ul>').addClass('activitydata');
    var $liicon = $('<li>').addClass('weathericon').css('background-image', 'url('+data.current_observation.icon_url+')');
    var $lidesc = $('<li>').text(data.current_observation.weather);
    var $lifeelslike = $('<li>').text('Currently feels like: ' + data.current_observation.feelslike_string);
    $ul.append($liicon, $lidesc, $lifeelslike);
    $('#weatherdata').append($ul);
  }

})();

