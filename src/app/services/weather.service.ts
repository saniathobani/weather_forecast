import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = '2077b9fd3099a22bf42ba6f16b316294';
  constructor(private http: HttpClient) {}

  getTodayWeather(lat, lon) {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.apiKey);

    return this.http.get(this.url, { params });
  }
  getWeatherForecast(lat, lon) {
    let urlOpen = 'https://api.openweathermap.org/data/2.5/forecast';
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.apiKey);

    return this.http.get(urlOpen, { params });
  }
}
