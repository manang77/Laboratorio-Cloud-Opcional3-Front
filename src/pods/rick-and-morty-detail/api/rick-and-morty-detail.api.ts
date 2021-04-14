import Axios from 'axios';
import { RickAndMortyCharacterDataApi, RickAndMortyCharacterDataApiForUpdate } from './rick-and-morty-detail.api.model';

export const getRickAndMorthyCharacterDetail = async (
  id: string
): Promise<RickAndMortyCharacterDataApi> => {
  const urlBase = `${process.env.BASE_SERVER_URL}/characters/${id}`;
  const { data } = await Axios.get<RickAndMortyCharacterDataApi>(urlBase);
  return data;
};

export const saveRickAndMortyCharacter = async (rickAndMortyCharacter: RickAndMortyCharacterDataApiForUpdate): Promise<boolean> => {
  const urlBase = `${process.env.BASE_SERVER_URL}/characters/${rickAndMortyCharacter.id}`;
  await Axios.patch<RickAndMortyCharacterDataApiForUpdate>(urlBase, rickAndMortyCharacter);
  return true;
}
