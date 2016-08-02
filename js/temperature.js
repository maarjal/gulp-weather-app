function Temperature() {
  this.hotterCity;
  this.temperatureDifference;
}

Temperature.prototype.whichIsHotter = function(cityName, cityTemp, otherCityName, otherCityTemp) {
  var firstTemp = cityTemp;
  var secondTemp = otherCityTemp;
  this.temperatureDifference = Math.abs(firstTemp-secondTemp).toFixed(1);
  if (firstTemp > secondTemp ) {
    this.hotterCity = cityName;
  } else if (firstTemp === secondTemp ) {
    this.hotterCity = "Niether city";
  } else {
    this.hotterCity = otherCityName;
  }
};

exports.temperatureModule = Temperature;
