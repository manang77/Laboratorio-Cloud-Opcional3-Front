import React from 'react';
import { RickAndMortyContainer } from 'pods/rick-and-morty';
import { AppLayout } from 'layouts';
import { CenteredLayout } from 'layouts';

export const RickAndMortyScene: React.FC = () => {
  return (
    <>
      <AppLayout>
        <CenteredLayout>
          <RickAndMortyContainer />
        </CenteredLayout>
      </AppLayout>
    </>
  );
};
