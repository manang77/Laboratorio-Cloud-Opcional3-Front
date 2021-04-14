export interface RickAndMortyDataVm {
  name: string;
  image: string;
  id: string;
}

export interface ConfigDataVM {
  count: number;
  pages: number;
}

export interface RickAndMortyVm {
  config: ConfigDataVM;
  rickAndMortyCharactersData: RickAndMortyDataVm[];
}

export const getNewRickAndMortyVm = (): RickAndMortyVm => {
  const configDataVM: ConfigDataVM = {
    count: 0,
    pages: 0,
  };
  return { config: configDataVM, rickAndMortyCharactersData: [] };
};

export const getNewRickAndMortyDataVm = (): RickAndMortyDataVm => {
  return {
    name: '',
    image: '',
    id: '',
  };
};
