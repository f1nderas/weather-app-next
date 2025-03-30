import { IWeatherForecast } from "@/interfaces/weather.interface";
import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import styles from "./ForecastList.module.scss";
interface ForeastListProps {
  forecasts: IWeatherForecast["list"];
}

export const ForecastList: FC<ForeastListProps> = ({ forecasts }) => {
  return (
    <Row className={styles.forecastList}>
      {forecasts.map((forecast) => (
        <Col key={forecast.dt} xs={12} md={4} lg={3}>
          <Card className={styles.forecastCard}>
            <Card.Body>
              <Card.Title>
                {new Date(forecast.dt * 1000).toLocaleString("ru", {
                  hour: "numeric",
                  day: "numeric",
                  month: "numeric",
                })}
              </Card.Title>
              <Card.Text>
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt={forecast.weather[0].description}
                />
                {forecast.weather[0].description}
              </Card.Text>
              <Card.Text>Temp: {forecast.main.temp.toFixed(1)}°C</Card.Text>
              <Card.Text>Min: {forecast.main.temp_min.toFixed(1)}°C</Card.Text>
              <Card.Text>Max: {forecast.main.temp_max.toFixed(1)}°C</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
