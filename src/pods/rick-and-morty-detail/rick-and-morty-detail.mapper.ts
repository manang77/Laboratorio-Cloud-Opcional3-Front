import { RickAndMortyCharacterDataApi, RickAndMortyCharacterDataApiForUpdate } from './api';
import { RickAndMortyDetailVm } from './rick-and-morty-detail.vm';

export const mapRickAndMortyCharacterDataFromApiToVM = (
  rickAndMortyCharacterDataApi: RickAndMortyCharacterDataApi
): RickAndMortyDetailVm => {
  const rickAndMortyDetailVm: RickAndMortyDetailVm = {
    id: rickAndMortyCharacterDataApi.id.toString(),
    name: rickAndMortyCharacterDataApi.name,
    status: rickAndMortyCharacterDataApi.status,
    species: rickAndMortyCharacterDataApi.species,
    gender: rickAndMortyCharacterDataApi.gender,
    origin: rickAndMortyCharacterDataApi.origin.name,
    location: rickAndMortyCharacterDataApi.location.name,
    image: `${process.env.BASE_SERVER_URL}/avatar/${rickAndMortyCharacterDataApi.image}`,
    bestSentences: rickAndMortyCharacterDataApi.bestSentences,
  };
  return rickAndMortyDetailVm;
};

export const mapRickAndMortyCharacterDataFromVMToApi = (
  rickAndMortyCharacterDataVM: RickAndMortyDetailVm
): RickAndMortyCharacterDataApiForUpdate => {
  const rickAndMortyDetailApiForUpdate: RickAndMortyCharacterDataApiForUpdate = {
    id: parseInt(rickAndMortyCharacterDataVM.id),
    bestSentences: rickAndMortyCharacterDataVM.bestSentences,
  };
  return rickAndMortyDetailApiForUpdate;
};
