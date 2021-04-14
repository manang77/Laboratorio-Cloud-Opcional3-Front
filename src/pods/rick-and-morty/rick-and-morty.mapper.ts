import { RickAndMortyApiModel, Character } from './api';
import {
  RickAndMortyVm,
  RickAndMortyDataVm,
  getNewRickAndMortyVm,
  getNewRickAndMortyDataVm,
} from './rick-and-morty.vm';

const mapRickAndMortyCharacterDataFromApiToVM = (
  apiCharacterData: Character
): RickAndMortyDataVm => {
  const rickAndMortyDataVm: RickAndMortyDataVm = {
    id: apiCharacterData.id.toString(),
    name: apiCharacterData.name,
    image: `${process.env.BASE_SERVER_URL}/avatar/${apiCharacterData.image}`,
  }
  return rickAndMortyDataVm;
};

export const mapRickAndMortyDataFromApiToVM = (
  rickAndMortyApiData: RickAndMortyApiModel
): RickAndMortyVm => {
  const rickAndMortyVM: RickAndMortyVm = getNewRickAndMortyVm();
  rickAndMortyVM.config.pages = rickAndMortyApiData.info.pages;
  rickAndMortyVM.config.count = rickAndMortyApiData.info.count;
  rickAndMortyVM.rickAndMortyCharactersData = rickAndMortyApiData.results.map(
    character => mapRickAndMortyCharacterDataFromApiToVM(character)
  );
  return rickAndMortyVM;
};
