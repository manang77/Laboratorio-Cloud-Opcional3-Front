export interface RickAndMortyDetailVm {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
  bestSentences: string[];
}

export const getNewRickAndMortyDetailVm = (): RickAndMortyDetailVm => {
  return {
    id: '',
    name: '',
    status: '',
    species: '',
    gender: '',
    origin: '',
    location: '',
    image: '',
    bestSentences: [],
  };
};
