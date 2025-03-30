"use client";

import { IWeatherCurrent } from "@/interfaces/weather.interface";
import { weatherService } from "@/services/weather.service";
import { useWeatherStore } from "@/store/useWeatherStore";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./page.module.scss";
import { WeatherCard } from "@/components/WeatherCart/WeatherCart";
import { MainLayout } from "@/components/layouts/MainLayout";
import Link from "next/link";

export default function Favorites() {
  const { favorites, removeFavorite } = useWeatherStore();
  const [weatherData, setWeatherData] = useState<IWeatherCurrent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const data = await Promise.all(
        favorites.map(
          async (city) => await weatherService.getCurrentWeather(city)
        )
      );
      setWeatherData(data);
      setLoading(false);
    };

    if (favorites.length > 0) fetchFavorites();
  }, [favorites]);

  return (
    <MainLayout>
      <Container className={styles.container}>
        <h1>Favorite Locations</h1>
        {loading && <div>sss</div>}
        {weatherData.length === 0 && !loading && <p>No favorites yet</p>}
        {weatherData.map((weather) => (
          <div key={weather.id} className={styles.favoriteItem}>
            <Link href={`/forecast?city=${encodeURIComponent(weather.name)}`}>
              <div className={styles.clickableCard}>
                <WeatherCard weather={weather} />
              </div>
            </Link>
            <Button
              variant="danger"
              onClick={() => removeFavorite(weather.name)}
            >
              Remove
            </Button>
          </div>
        ))}
      </Container>
    </MainLayout>
  );
}
