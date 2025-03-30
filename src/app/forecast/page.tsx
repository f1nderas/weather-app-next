"use client";

import { IWeatherForecast } from "@/interfaces/weather.interface";
import { weatherService } from "@/services/weather.service";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./page.module.scss";
import { ForecastList } from "@/components/ForecastList/ForecastList";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MainLayout } from "@/components/layouts/MainLayout";

export default function Forecast() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const [forecast, setForecast] = useState<IWeatherForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (city) {
      const fetchForecast = async () => {
        setLoading(true);
        try {
          const data = await weatherService.getForecast(city as string);
          setForecast(data);
        } catch (error) {
          setError("Failed to fetch forecast");
        } finally {
          setLoading(false);
        }
      };
      fetchForecast();
    }
  }, [city]);

  return (
    <MainLayout>
      <Container className={styles.container}>
        <h1>Weather Forecast for {forecast?.city.name}</h1>
        {loading && <div>ss</div>}
        {error && <div className={styles.error}>{error}</div>}
        {forecast && <ForecastList forecasts={forecast.list} />}
      </Container>
    </MainLayout>
  );
}
