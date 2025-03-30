import { IWeatherCurrent } from "@/interfaces/weather.interface";
import { FC } from "react";
import { Card } from "react-bootstrap";
import styles from "./WeatherCart.module.scss";

interface WeatherCartProps {
  weather: IWeatherCurrent;
}

export const WeatherCard: FC<WeatherCartProps> = ({ weather }) => {
  return (
    <Card className={styles.weatherCard}>
      <Card.Body>
        <Card.Title>
          {weather.name}, {weather.sys.country}
        </Card.Title>
        <Card.Text>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          {weather.weather[0].description}
        </Card.Text>
        <Card.Text>Temperature: {weather.main.temp.toFixed(1)} °C</Card.Text>
        <Card.Text>
          Feels like: {weather.main.feels_like.toFixed(1)} °C
        </Card.Text>
        <Card.Text>Humidity: {weather.main.humidity}%</Card.Text>
        <Card.Text>Pressure: {weather.main.pressure} hPa</Card.Text>
        <Card.Text>Wind: {weather.wind.speed} m/s</Card.Text>
        <Card.Text>
          Updated: {new Date(weather.dt * 1000).toLocaleTimeString("ru")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
