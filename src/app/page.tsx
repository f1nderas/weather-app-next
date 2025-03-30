"use client";

import { weatherService } from "@/services/weather.service";
import { useWeatherStore } from "@/store/useWeatherStore";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./page.module.scss";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { IWeatherCurrent } from "@/interfaces/weather.interface";
import { WeatherCard } from "@/components/WeatherCart/WeatherCart";
import Link from "next/link";
import { LoadingSpinner } from "@/components/LoadingSpiner/LoadingSpinner";
import { MainLayout } from "@/components/layouts/MainLayout";

export default function Home() {
  const [weather, setWeather] = useState<IWeatherCurrent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, favorites } = useWeatherStore();

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getCurrentWeather(city);
      setWeather(data);
    } catch (error) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = () => {
    if (weather?.name) {
      addFavorite(weather.name);
    }
  };

  const isFavorite = weather?.name && favorites.includes(weather.name);

  return (
    <MainLayout>
      <Container className={styles.container}>
        <h1>Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        {loading && <LoadingSpinner />}
        {error && <div className={styles.error}>{error}</div>}
        {weather && (
          <>
            <WeatherCard weather={weather} />
            <div className={styles.actions}>
              <Button
                onClick={handleAddFavorite}
                variant={isFavorite ? "secondary" : "success"}
                disabled={isFavorite}
              >
                {isFavorite ? "Added!" : "Add to Favorite"}
              </Button>
              <Link href={`/forecast?city=${encodeURIComponent(weather.name)}`}>
                <Button variant="primary">View Forecast</Button>
              </Link>
            </div>
          </>
        )}
      </Container>
    </MainLayout>
  );
}
