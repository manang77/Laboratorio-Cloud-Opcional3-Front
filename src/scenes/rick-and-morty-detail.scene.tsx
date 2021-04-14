import React from 'react';
import { RickAndMortyDetailContainer } from 'pods/rick-and-morty-detail';
import { AppLayout } from 'layouts';
import { CenteredLayout } from 'layouts';

export const RickAndMortyDetailScene: React.FC = () => {
  return (
    <>
      <AppLayout>
        <CenteredLayout>
          <RickAndMortyDetailContainer />
        </CenteredLayout>
      </AppLayout>
    </>
  );
};
