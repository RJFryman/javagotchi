(function(){

  'use strict';

  $(document).ready(initialize);

  var lat;
  var lng;

  function initialize(){
    $('#queryfoursquare').click(getLocation);
  }

  function getLocation(event){
    var geoOptions = {enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    event.preventDefault();
  }

  function geoSuccess(location){
    lat = location.coords.latitude;
    lng = location.coords.longitude;
    getFoursquareVenues(lat, lng);
  }

  function geoError(){
    console.log('Sorry, no position available.');
  }

  function getFoursquareVenues(lat, lng){
    var clientid = 'CEOFOL4IRP2KFPAVY5AR2OF4FUC15HCTE4DALXIVGDTG24N1';
    var clientsecret = 'BHCBDXVPSAQBGCAJGEYCT13JMW2V3SJYRFGTBPJVSK4Q0EWX';
    var url = 'https://api.foursquare.com/v2/venues/search?client_id=' + clientid + '&client_secret=' + clientsecret + '&v=20130815&ll=' + lat + ',' + lng;
    $.getJSON(url, receive);
  }

  function receive(data){
    console.log(data);
    /*
    for(var i = 0; i < data.response.venues.length; i++){
      var $tr = $('<tr>');
      var $tdicon = $('<td>');
      var $tdname = $('<td>');
      var $tdaddress = $('<td>');
      $tdicon.addClass('icon');
      $tdicon.css('background-image', 'url('+data.response.venues[i].categories[0].icon.prefix + 'bg_32' + data.response.venues[i].categories[0].icon.suffix + ')');
      $tdname.text(data.response.venues[i].name);
      $tdaddress.text(data.response.venues[i].location.address);
      $tr.append($tdicon, $tdname, $tdaddress);
      $('#venues').append($tr);
    }
    */
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
  }
})();

