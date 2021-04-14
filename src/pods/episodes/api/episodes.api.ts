import Axios from 'axios';
import {
  EpisodesApiModel
} from './episodes.api.model';

export const getEpisodes = async (
  page: number,
  name: string
): Promise<EpisodesApiModel> => {

  const urlBase = `${process.env.BASE_SERVER_URL}/episodes?_limit=${process.env.SERVER_PAGE_SIZE}&_page=${page}`
  const { data } = await Axios.get<EpisodesApiModel>(
    urlBase + (name ? `&name_like=${name}` : '')
  );
  return data;
};
