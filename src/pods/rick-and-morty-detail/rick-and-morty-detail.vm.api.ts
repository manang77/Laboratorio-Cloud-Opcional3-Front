import { RickAndMortyDetailVm } from './rick-and-morty-detail.vm';
import { RickAndMortyCharacterDataApiForUpdate, saveRickAndMortyCharacter } from './api';
import { mapRickAndMortyCharacterDataFromVMToApi } from './rick-and-morty-detail.mapper';

export const saveRickAndMortyDetailData = async (
  rickAndMortyDetailVm: RickAndMortyDetailVm
): Promise<boolean> => {
  try {
    const rickAndMortyApiForUpdate: RickAndMortyCharacterDataApiForUpdate = mapRickAndMortyCharacterDataFromVMToApi(rickAndMortyDetailVm);
    return await saveRickAndMortyCharacter(rickAndMortyApiForUpdate);
  } catch (err) {
    throw err.message
  }
};
