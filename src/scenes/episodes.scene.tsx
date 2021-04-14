import React from 'react';
import { EpisodesContainer } from 'pods/episodes';
import { AppLayout } from 'layouts';
import { CenteredLayout } from 'layouts';

export const EpisodesScene: React.FC = () => {
  return (
    <>
      <AppLayout>
        <CenteredLayout>
          <EpisodesContainer />
        </CenteredLayout>
      </AppLayout>
    </>
  );
};
