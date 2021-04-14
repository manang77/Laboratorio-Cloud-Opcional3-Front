import Axios from 'axios';
import {
  RickAndMortyApiModel,
} from './rick-and-morty.api.model';

export const getRickAndMorthyCharacters = async (
  page: number,
  name: string
): Promise<RickAndMortyApiModel> => {

  const urlBase = `${process.env.BASE_SERVER_URL}/characters?_limit=${process.env.SERVER_PAGE_SIZE}&_page=${page}`
  const { data } = await Axios.get<RickAndMortyApiModel>(
    urlBase + (name ? `&name_like=${name}` : '')
  );
  return data;
};
