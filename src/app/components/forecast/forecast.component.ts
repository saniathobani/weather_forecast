import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

import { mainWeather, forecastWeather } from '../../shared/models';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  lat;
  lon;

  weather;
  id;
  options;
  todaysWeather: mainWeather;
  forecastItem: forecastWeather;
  //
  forecastList = Array();

  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherForCurrentLocation();
  }

  // When the page renders onInit get the current latitude and longitude using navigtor

  getWeatherForCurrentLocation() {
    if (window.navigator.geolocation) {
      // window.navigator.geolocation.watchPosition(
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          setTimeout(() => this.subscribeCurrentPosition(), 100);
        },
        (error) => {
          // LoggingService.error('Geolocation error: '+ error);
          console.log('Geolocation error: ' + error);
        }
      );
    } else {
      // LoggingService.error('Geolocation not supported in this browser');
      console.log('Geolocation not supported in this browser');
    }
  }

  // is the function called to get the lat and lon from user map click
  onChooseLocation(event) {
    this.lat = event.coords.lat;
    this.lon = event.coords.lng;
    this.subscribeCurrentPosition();
  }
  // is the function called on Refresh click event sets the location, weather according to users current location
  onRefresh() {
    this.ngOnInit();
  }

  // Using 'openWeather' api get the  Weather set in class properties lat and lon
  subscribeCurrentPosition() {
    this.weatherService
      .getTodayWeather(this.lat, this.lon)
      .subscribe((response) => {
        this.weather = response;
        var d = new Date(this.weather.dt * 1000);
        var dayName = this.days[d.getDay()];
        this.todaysWeather = {
          temp: Math.trunc(this.weather.main.temp),
          temp_max: this.weather.main.temp_max,
          temp_min: this.weather.main.temp_min,
          speed: this.weather.wind.speed,
          feels_like: this.weather.main.feels_like,
          city: this.weather.name,
          country: this.weather.sys.country,
          weather: this.weather.weather[0].description,
          icon: `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`,
          day: dayName,
        };
      });

    this.weatherService
      .getWeatherForecast(this.lat, this.lon)
      .subscribe((response) => {
        this.forecastList = Array();

        for (var i = 7; i < response['list'].length; i = i + 8) {
          var d = new Date(response['list'][i].dt * 1000);
          var dayName = this.days[d.getDay()];
          this.forecastItem = {
            temp: Math.trunc(response['list'][i].main.temp),
            icon: `http://openweathermap.org/img/w/${response['list'][i].weather[0].icon}.png`,
            day: dayName,
          };
          this.forecastList.push(this.forecastItem);
        }
      });
  }
}
