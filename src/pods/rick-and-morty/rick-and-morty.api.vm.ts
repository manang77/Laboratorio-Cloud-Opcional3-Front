import { RickAndMortyVm, getNewRickAndMortyVm } from './rick-and-morty.vm';
import { RickAndMortyApiModel } from './api';
import { getRickAndMorthyCharacters } from './api';
import { mapRickAndMortyDataFromApiToVM } from './rick-and-morty.mapper';

export const getRickAndMortyData = async (
  page: number,
  name: string
): Promise<RickAndMortyVm> => {
  try {
    const rickAndMortyApi: RickAndMortyApiModel = await getRickAndMorthyCharacters(
      page,
      name
    );
    const rickAndMortyVm: RickAndMortyVm = mapRickAndMortyDataFromApiToVM(
      rickAndMortyApi
    );
    return rickAndMortyVm;
  } catch (err) {
    if (!err.message.includes('404')) {
      throw err.message;
    } else {
      return getNewRickAndMortyVm();
    }
  }
};
