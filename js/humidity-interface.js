// var Weather = require('./../js/weather.js').weatherModule;

var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#humidityLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response){
      $('.showHumidity').text("The humidity in " + city + " is " + response.main.humidity + "%");
    }).fail(function(error) {
      $('.showHumidity').text(error.responseJSON.message);
    });
  });
});
