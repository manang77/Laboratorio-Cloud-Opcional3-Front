import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { switchRoutes } from './routes';
import { RickAndMortyScene, RickAndMortyDetailScene, EpisodesScene, DashboardScene, EpisodeDetailScene } from 'scenes';

export const RouterComponent: React.FunctionComponent = () => {
  return (
    <HashRouter>
      <Switch>
        <Route
          exact={true}
          path={[switchRoutes.root, switchRoutes.labDashboard]}
          component={DashboardScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.rickyMortyCharacters]}
          component={RickAndMortyScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.rickAndMortyCharacterDetail]}
          component={RickAndMortyDetailScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.episodes]}
          component={EpisodesScene}
        />
        <Route
          exact={true}
          path={[switchRoutes.episodeDetail]}
          component={EpisodeDetailScene}
        />
      </Switch>
    </HashRouter>
  );
};
