var Temperature = require('./../js/temperature.js').temperatureModule;
var apiKey = require('./../.env').apiKey;
var city1Temp = 0;
var city2Temp = 0;
var city;
var cityTemp;

$(document).ready(function() {
  var newTemperature = new Temperature();
  $('#temperatureLocation').click(function() {
    city = $('#location').val();
    $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + '&appid=' + apiKey).then(function(response){
      cityTemp = response.main.temp;
      $('.showTemperature').text("The temperature in " + city + " is " + cityTemp + " degrees Celcius");
    }).fail(function(error) {
      $('.showTemperature').text(error.responseJSON.message);
    });
  });
  $('#toFahrenheit').click(function() {
    var fahrenheit = newTemperature.celsiusToFahrenheit(cityTemp);
    $('.showTemperature').text("The temperature in " + city + " is " + fahrenheit + " degrees Fahrenheit");
  });
  $('#find-out').click(function() {
    var city1 = $('#location1').val();
    var city2 = $('#location2').val();
    var unit = $('#unit').val();
    var hotterCity;
    var tempDifference;
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city1 + "&units=" + unit + '&appid=' + apiKey).then(function(response){
      city1Temp = response.main.temp;
      console.log(city1Temp);
      $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city2 +  "&units=" + unit + '&appid=' + apiKey).then(function(response){
        city2Temp = response.main.temp;
        console.log(city2Temp);
        newTemperature.whichIsHotter(city1, city1Temp, city2, city2Temp);
        $('#hotter-city').text(newTemperature.hotterCity + " is the hottest!");
        $('#temperature-difference').text(newTemperature.temperatureDifference + " degrees " + $('#unit option:selected').text() + " difference.");
      }).fail(function(error) {
        $('.showTemperature').text(error.responseJSON.message);
      });
    }).fail(function(error) {
      $('.showTemperature').text(error.responseJSON.message);
    });
  });
});
