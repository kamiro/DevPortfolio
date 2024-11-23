import { type StaticImageData } from "next/image";

import cloudy from "../../public/images/cloudy.jpg";
import partlycloudy from "../../public/images/partlycloudy.jpg";
import rain from "../../public/images/rain.jpg";
import sleet from "../../public/images/sleet.jpg";
import snow from "../../public/images/snow.jpg";
import sunny from "../../public/images/sunny.jpg";
import thunderstorm from "../../public/images/thunderstorm.jpg";
import unknown from "../../public/images/unknown.jpg";

export const weatherImages: Record<SimpleSymbolCode, StaticImageData> = {
  sunny,
  partlycloudy,
  cloudy,
  rain,
  snow,
  sleet,
  thunderstorm,
  unknown
};

/// Request access to the user's location
type METNoTimeseriesData = {
  instant: { details: WeatherDetails; };
  next_1_hours?: { summary: { symbol_code: string; }; };
  next_6_hours?: { summary: { symbol_code: string; }; };
  next_12_hours?: { summary: { symbol_code: string; }; };
};

export type SymbolCode =
  | "clearsky_day"
  | "clearsky_night"
  | "clearsky_polartwilight"
  | "fair_day"
  | "fair_night"
  | "fair_polartwilight"
  | "partlycloudy_day"
  | "partlycloudy_night"
  | "partlycloudy_polartwilight"
  | "cloudy"
  | "fog"
  | "lightrain"
  | "rain"
  | "lightrainshowers_day"
  | "lightrainshowers_night"
  | "lightrainshowers_polartwilight"
  | "rainshowers_day"
  | "rainshowers_night"
  | "rainshowers_polartwilight"
  | "heavyrain"
  | "heavyrainshowers_day"
  | "heavyrainshowers_night"
  | "heavyrainshowers_polartwilight"
  | "lightsnow"
  | "snow"
  | "lightsnowshowers_day"
  | "lightsnowshowers_night"
  | "lightsnowshowers_polartwilight"
  | "snowshowers_day"
  | "snowshowers_night"
  | "snowshowers_polartwilight"
  | "heavysnow"
  | "heavysnowshowers_day"
  | "heavysnowshowers_night"
  | "heavysnowshowers_polartwilight"
  | "lightssnowshowersandthunder_day"
  | "lightssnowshowersandthunder_night"
  | "lightssnowshowersandthunder_polartwilight"
  | "heavysnowshowersandthunder_day"
  | "heavysnowshowersandthunder_night"
  | "heavysnowshowersandthunder_polartwilight"
  | "lightsleet"
  | "sleet"
  | "lightsleetshowers_day"
  | "lightsleetshowers_night"
  | "lightsleetshowers_polartwilight"
  | "sleetshowers_day"
  | "sleetshowers_night"
  | "sleetshowers_polartwilight"
  | "heavysleet"
  | "heavysleetshowers_day"
  | "heavysleetshowers_night"
  | "heavysleetshowers_polartwilight"
  | "thunder"
  | "lightrainshowersandthunder_day"
  | "lightrainshowersandthunder_night"
  | "lightrainshowersandthunder_polartwilight"
  | "rainandthunder"
  | "heavyrainandthunder"
  | "rainshowersandthunder_day"
  | "rainshowersandthunder_night"
  | "rainshowersandthunder_polartwilight"
  | "heavysnowandthunder"
  | "sleetandthunder"
  | "heavysleetandthunder"
  | "lightsnowandthunder"
  | "sleetshowersandthunder_day"
  | "sleetshowersandthunder_night"
  | "sleetshowersandthunder_polartwilight"
  | "snowshowersandthunder_day"
  | "snowshowersandthunder_night"
  | "snowshowersandthunder_polartwilight"
  | "unknown";

export type SimpleSymbolCode = ReturnType<typeof simplifySymbolCode>;

const simplifySymbolCode = (symbolCode: SymbolCode) => {
  switch (symbolCode) {
    case "clearsky_day":
    case "clearsky_night":
    case "clearsky_polartwilight":
      return "sunny";

    case "fair_day":
    case "fair_night":
    case "fair_polartwilight":
    case "partlycloudy_day":
    case "partlycloudy_night":
    case "partlycloudy_polartwilight":
      return "partlycloudy";

    case "cloudy":
    case "fog":
      return "cloudy";

    case "lightrain":
    case "rain":
    case "lightrainshowers_day":
    case "lightrainshowers_night":
    case "lightrainshowers_polartwilight":
    case "rainshowers_day":
    case "rainshowers_night":
    case "rainshowers_polartwilight":
    case "heavyrain":
    case "heavyrainshowers_day":
    case "heavyrainshowers_night":
    case "heavyrainshowers_polartwilight":
      return "rain";

    case "lightsnow":
    case "snow":
    case "lightsnowshowers_day":
    case "lightsnowshowers_night":
    case "lightsnowshowers_polartwilight":
    case "snowshowers_day":
    case "snowshowers_night":
    case "snowshowers_polartwilight":
    case "heavysnow":
    case "heavysnowshowers_day":
    case "heavysnowshowers_night":
    case "heavysnowshowers_polartwilight":
    case "lightssnowshowersandthunder_day":
    case "lightssnowshowersandthunder_night":
    case "lightssnowshowersandthunder_polartwilight":
    case "heavysnowshowersandthunder_day":
    case "heavysnowshowersandthunder_night":
    case "heavysnowshowersandthunder_polartwilight":
      return "snow";

    case "lightsleet":
    case "sleet":
    case "lightsleetshowers_day":
    case "lightsleetshowers_night":
    case "lightsleetshowers_polartwilight":
    case "sleetshowers_day":
    case "sleetshowers_night":
    case "sleetshowers_polartwilight":
    case "heavysleet":
    case "heavysleetshowers_day":
    case "heavysleetshowers_night":
    case "heavysleetshowers_polartwilight":
      return "sleet";

    case "thunder":
    case "lightrainshowersandthunder_day":
    case "lightrainshowersandthunder_night":
    case "lightrainshowersandthunder_polartwilight":
    case "rainandthunder":
    case "heavyrainandthunder":
    case "rainshowersandthunder_day":
    case "rainshowersandthunder_night":
    case "rainshowersandthunder_polartwilight":
    case "lightssnowshowersandthunder_day":
    case "lightssnowshowersandthunder_night":
    case "lightssnowshowersandthunder_polartwilight":
    case "heavysnowandthunder":
    case "sleetandthunder":
    case "heavysleetandthunder":
    case "lightsnowandthunder":
    case "sleetshowersandthunder_day":
    case "sleetshowersandthunder_night":
    case "sleetshowersandthunder_polartwilight":
    case "snowshowersandthunder_day":
    case "snowshowersandthunder_night":
    case "snowshowersandthunder_polartwilight":
      return "thunderstorm";
    case "unknown":
      return "unknown"; // Handle any unsupported or unrecognized symbol codes
  }
}

export type WeatherDetails = {
  time: string;
  air_temperature: number;
  relative_humidity: number;
  wind_from_direction: number;
  wind_speed: number;
  symbol_code: SymbolCode;
  simple_symbol_code: SimpleSymbolCode;
};

const extractWeatherDetails = (weatherForecast: { properties: { timeseries: { time: string, data: METNoTimeseriesData }[] } }): WeatherDetails => {
  const timeseries = weatherForecast.properties.timeseries[0];
  const time = timeseries.time;
  const instantDetails = timeseries.data.instant.details as Omit<WeatherDetails, 'simple_symbol_code'>;

  // Find the first available symbol_code from the forecast
  const symbol_code = (timeseries.data.next_1_hours?.summary.symbol_code ??
    timeseries.data.next_6_hours?.summary.symbol_code ??
    timeseries.data.next_12_hours?.summary.symbol_code ??
    'unknown') as SymbolCode;

  return {
    time,
    air_temperature: instantDetails.air_temperature,
    relative_humidity: instantDetails.relative_humidity,
    wind_from_direction: instantDetails.wind_from_direction,
    wind_speed: instantDetails.wind_speed,
    symbol_code: symbol_code,
    simple_symbol_code: simplifySymbolCode(symbol_code),
  };
}

export const weatherFetcher = async (location: GeolocationPosition) => {
  const lat = location.coords.latitude.toFixed(4);
  const lon = location.coords.longitude.toFixed(4);

  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

  const response = await fetch(url);
  const result = await response.json();
  const weatherDetails = extractWeatherDetails(result);

  console.log(url, weatherDetails)
  return weatherDetails
}
