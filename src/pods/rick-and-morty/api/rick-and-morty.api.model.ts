interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

interface Origin {
  name: string;
  url: string;
}

interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
  bestSentences: string[];
}

export interface RickAndMortyApiModel {
  info: Info;
  results: Character[];
}

