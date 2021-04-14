export interface EpisodesDataVm {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

export interface ConfigDataVM {
  count: number;
  pages: number;
}

export interface EpisodesVm {
  config: ConfigDataVM;
  EpisodesData: EpisodesDataVm[];
}

export const getNewEpisodesVm = (): EpisodesVm => {
  const configDataVM: ConfigDataVM = {
    count: 0,
    pages: 0,
  };
  return { config: configDataVM, EpisodesData: [] };
};

export const getNewEpisodesDataVm = (): EpisodesDataVm => {
  return {
    id: '',
    name: '',
    air_date: '',
    episode: '',
  };
};
