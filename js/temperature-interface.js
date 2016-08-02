var Temperature = require('./../js/temperature.js').temperatureModule;
var apiKey = require('./../.env').apiKey;
var city1Temp = 0;
var city2Temp = 0;

$(document).ready(function() {
  var newTemperature = new Temperature();
  $('#temperatureLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + '&appid=' + apiKey).then(function(response){
      $('.showTemperature').text("The temperature in " + city + " is " + response.main.temp + " degrees Celcius");
    }).fail(function(error) {
      $('.showTemperature').text(error.responseJSON.message);
    });
  });
  $('#find-out').click(function() {
    var city1 = $('#location1').val();
    var city2 = $('#location2').val();

    var hotterCity;
    var tempDifference;
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city1 + "&units=metric" + '&appid=' + apiKey).then(function(response){
      city1Temp = response.main.temp;
      $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city2 + "&units=metric" + '&appid=' + apiKey).then(function(response){
        city2Temp = response.main.temp;
        newTemperature.whichIsHotter(city1, city1Temp, city2, city2Temp);
        $('#hotter-city').text(newTemperature.hotterCity + " is the hottest!");
        $('#temperature-difference').text(newTemperature.temperatureDifference + " degrees difference.");
      }).fail(function(error) {
        $('.showTemperature').text(error.responseJSON.message);
      });
    }).fail(function(error) {
      $('.showTemperature').text(error.responseJSON.message);
    });
  });
});
