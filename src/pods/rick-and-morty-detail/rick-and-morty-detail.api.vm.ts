import { RickAndMortyDetailVm } from './rick-and-morty-detail.vm';
import {
  RickAndMortyCharacterDataApi,
  getRickAndMorthyCharacterDetail,
} from './api';
import { mapRickAndMortyCharacterDataFromApiToVM } from './rick-and-morty-detail.mapper';

export const getRickAndMortyDetailData = async (
  id: string
): Promise<RickAndMortyDetailVm> => {
  try {
    const rickAndMortyApi: RickAndMortyCharacterDataApi = await getRickAndMorthyCharacterDetail(id);
    const rickAndMortyDetailVm: RickAndMortyDetailVm = mapRickAndMortyCharacterDataFromApiToVM(rickAndMortyApi);
    return rickAndMortyDetailVm;
  } catch (error) {
    throw error.message;
  }
};
