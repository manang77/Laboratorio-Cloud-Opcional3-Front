import React from 'react';
import { ApplicationContext } from 'common-app/context';
import { LabDashboardComponent } from './lab.dashboard.component';
import { DashboardItemProps } from 'common/components';
import TvIcon from '@material-ui/icons/Tv';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import { linkRoutes } from 'core/router';

export const LabDashboardContainer: React.FC = () => {
  const {
    setRickAndMortySearchText,
    setRickAndMortyNavigationPage,
    setEpisodesSearchText,
    setEpisodesNavigationPage
  } = React.useContext(ApplicationContext);

  const items: DashboardItemProps[] = React.useMemo(
    (): DashboardItemProps[] => [
      {
        title: 'Rick And Morty Characters',
        linkTo: linkRoutes.rickyMortyCharacters,
        icon: RecentActorsIcon,
      },
      {
        title: 'Ricky and Morthy Episodes',
        linkTo: linkRoutes.episodes,
        icon: TvIcon,
      },
    ],
    []
  );
  React.useEffect(() => {
    setEpisodesSearchText('');
    setEpisodesNavigationPage(0);
    setRickAndMortySearchText('');
    setRickAndMortyNavigationPage(0);
  }, []);
  return <LabDashboardComponent items={items} />;
};
