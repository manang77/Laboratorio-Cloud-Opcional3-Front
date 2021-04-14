import { generatePath } from 'react-router';

interface SwitchRoutes {
  root: string;
  labDashboard: string;
  rickyMortyCharacters: string;
  rickAndMortyCharacterDetail: string;
  episodes: string;
  episodeDetail: string;
}

export const switchRoutes: SwitchRoutes = {
  root: '/',
  labDashboard: '/dashboard',
  rickyMortyCharacters: '/ricky-and-morthy-characters',
  rickAndMortyCharacterDetail: '/ricky-and-morthy-detail/:id',
  episodes: '/episodes',
  episodeDetail: '/episode-detail/:id',
};

type NavigationFunction = (id: string) => string;

interface LinkRoutes extends Omit<SwitchRoutes, 'rickAndMortyCharacterDetail' | 'episodeDetail'> {
  rickAndMortyCharacterDetail: NavigationFunction;
  episodeDetail: NavigationFunction;
}

export const linkRoutes: LinkRoutes = {
  ...switchRoutes,
  rickAndMortyCharacterDetail: id =>
    generatePath(switchRoutes.rickAndMortyCharacterDetail, { id }),
  episodeDetail: id => generatePath(switchRoutes.episodeDetail, { id }),
};
