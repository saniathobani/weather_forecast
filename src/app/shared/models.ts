export interface mainWeather {
  temp: number;
  temp_max: number;
  temp_min: number;
  speed: number;
  feels_like: number;
  city: string;
  country: string;
  weather: string;
  icon: string;
  day: string;
}

export interface forecastWeather {
  temp: number;
  icon: string;
  day: string;
}
