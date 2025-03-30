import {
  IWeatherCurrent,
  IWeatherForecast,
} from "@/interfaces/weather.interface";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherService = {
  getCurrentWeather: async (city: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      return response.data as IWeatherCurrent;
    } catch (error) {
      throw new Error("City not found");
    }
  },

  getForecast: async (city: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      return response.data as IWeatherForecast;
    } catch (error) {
      throw new Error("City not found");
    }
  },
};
