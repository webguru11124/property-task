// City-related type definitions

export interface City {
  id: string;
  name: string;
  county: string;
  municipalityCode?: string;
  latitude: number;
  longitude: number;
  population?: number;
  region?: string;
}

export interface CitySearchParams {
  query: string;
  limit?: number;
}

export interface CityAutocompleteResult {
  id: string;
  name: string;
  county: string;
  label: string;
  value: string;
}