import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WeatherStateProps {
  favorites: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
}

export const useWeatherStore = create<WeatherStateProps>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (city) =>
        set((state) => ({
          favorites: [...state.favorites, city],
        })),
      removeFavorite: (city) =>
        set((state) => ({
          favorites: state.favorites.filter((c) => c !== city),
        })),
    }),
    {
      name: "weather-storage",
    }
  )
);
