import React from 'react';
import { EpisodeDetailContainer } from 'pods/episode-detail';
import { AppLayout } from 'layouts';
import { CenteredLayout } from 'layouts';

export const EpisodeDetailScene: React.FC = () => {
  return (
    <>
      <AppLayout>
        <CenteredLayout>
          <EpisodeDetailContainer />
        </CenteredLayout>
      </AppLayout>
    </>
  );
};
