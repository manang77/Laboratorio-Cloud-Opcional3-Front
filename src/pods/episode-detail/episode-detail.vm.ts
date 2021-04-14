export interface EpisodeCharVm {
  id: string;
  name: string;
  image: string;
}

export interface EpisodeDetailVm {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: EpisodeCharVm[];
  url: string;
  created: string;
}

export const getNewEpisodeDetailVm = (): EpisodeDetailVm => {
  return {
    id: '',
    name: '',
    air_date: '',
    episode: '',
    characters: [],
    url: '',
    created: '',
  };
};
