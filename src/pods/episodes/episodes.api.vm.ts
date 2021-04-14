import { EpisodesVm, getNewEpisodesVm } from './episodes.vm';
import { EpisodesApiModel, getEpisodes } from './api';
import { mapEpisodesFromApiToVM } from './episodes.mapper';

export const getEpisodesData = async (
  page: number,
  name: string
): Promise<EpisodesVm> => {
  try {
  const episodesApi: EpisodesApiModel = await getEpisodes(
    page,
    name
  );
  const episodesVm: EpisodesVm = mapEpisodesFromApiToVM(
    episodesApi
  );
  return episodesVm;
  } catch (err) {
    if (!err.message.includes('404')) {
      throw err.message;
    } else {
      return getNewEpisodesVm();
    }
  }
};
