import {
  FC,
  FormEvent,
  KeyboardEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./SearchBar.module.scss";
import axios from "axios";
import { AsyncTypeahead, TypeaheadRef } from "react-bootstrap-typeahead";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const typeaheadRef = useRef<TypeaheadRef>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback((query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (query.length < 2) return;

      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        const cities = response.data.map(
          (item: any) => `${item.name}, ${item.country}`
        );
        setOptions(cities);
      } catch (error) {
        console.error("Error fetching cities", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  const handleSelect = (selected: string[]) => {
    if (selected.length > 0) {
      const city = selected[0].split(",")[0].trim();
      onSearch(city);
      setQuery("");
      typeaheadRef.current?.clear();
      typeaheadRef.current?.blur();
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && query) {
      onSearch(query);
      setQuery("");
      typeaheadRef.current?.clear();
      typeaheadRef.current?.blur();
    }
  };

  return (
    <AsyncTypeahead
      ref={typeaheadRef}
      id="city-search"
      isLoading={isLoading}
      onSearch={handleSearch}
      onChange={handleSelect as (selected: any[]) => void}
      onInputChange={(text) => setQuery(text)}
      onKeyDown={handleKeyDown}
      options={options}
      placeholder="Enter city name"
      className={styles.searchBar}
      minLength={2}
    />
  );
};
