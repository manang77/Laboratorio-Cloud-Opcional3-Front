import { EpisodesApiModel, Episode } from './api';
import {
  EpisodesVm,
  EpisodesDataVm,
  getNewEpisodesVm
} from './episodes.vm';

const mapEpisodeFromApiToVM = (
  apiEpisodeData: Episode
): EpisodesDataVm => {
  const episodeDataVm: EpisodesDataVm = {
    id: apiEpisodeData.id.toString(),
    name: apiEpisodeData.name,
    air_date: apiEpisodeData.air_date,
    episode: apiEpisodeData.episode
  }
  return episodeDataVm;
};

export const mapEpisodesFromApiToVM = (
  episodesApiData: EpisodesApiModel
): EpisodesVm => {
  const episodesVM: EpisodesVm = getNewEpisodesVm();
  episodesVM.config.pages = episodesApiData.info.pages;
  episodesVM.config.count = episodesApiData.info.count;
  episodesVM.EpisodesData = episodesApiData.results.map(
    episode => mapEpisodeFromApiToVM(episode)
  );
  return episodesVM;
};
