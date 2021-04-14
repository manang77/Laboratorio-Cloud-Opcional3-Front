import React from 'react';
import { ApplicationContext } from 'common-app/context';
import { EpisodesDataVm } from './episodes.vm';
import { EpisodeComponent } from './components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import * as episodesClasses from './episodes.styles';

interface Props {
  episodes: EpisodesDataVm[];
  updateSearchText: (newSearchText: string) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingLeft: '60px',
    },
  })
);

export const EpisodesComponent: React.FC<Props> = props => {
  const { episodesSearchText, setEpisodesSearchText } = React.useContext(
    ApplicationContext
  );

  const [searchText, setSearchText] = React.useState(episodesSearchText);
  const { episodes, updateSearchText } = props;
  const classes = useStyles();

  const setInputSearchText = (newSearchValue: string) => {
    setSearchText(newSearchValue);
    updateSearchText(newSearchValue);
    setEpisodesSearchText(newSearchValue);
  };

  return (
    <>
      <div className={episodesClasses.searchContainer}>
        <div>
          <TextField
            id="search-text"
            value={searchText}
            onChange={(e) => setInputSearchText(e.target.value)}
            label="Search"
          />
        </div>
      </div>
      <div className={episodesClasses.cardsContainer}>
        <Grid
          className={classes.root}
          container
          spacing={2}
          wrap={'wrap'}
          justify={'flex-start'}
        >
          {episodes.map((episode, index) => (
            <Grid key={index} item xs={3}>
              <EpisodeComponent
                key={index}
                episode={episode}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
