import React from 'react';
import { ApplicationContext } from 'common-app/context';
import { RickAndMortyDataVm } from './rick-and-morty.vm';
import { RickAndMorthyCharacterComponent } from './components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import * as rickAndMortyClasses from './rick-and-morty.styles';

interface Props {
  rickAndMortyCharacters: RickAndMortyDataVm[];
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

export const RickAndMortyComponent: React.FC<Props> = props => {
  const {
    rickAndMortySearchText,
    setRickAndMortySearchText,
  } = React.useContext(ApplicationContext);

  const [searchText, setSearchText] = React.useState(rickAndMortySearchText);
  const { rickAndMortyCharacters, updateSearchText } = props;
  const classes = useStyles();

  const setInputSearchText = (newSearchValue: string) => {
    setSearchText(newSearchValue);
    updateSearchText(newSearchValue);
    setRickAndMortySearchText(newSearchValue);
  };

  return (
    <>
      <div className={rickAndMortyClasses.searchContainer}>
        <div>
          <TextField
            id="search-text"
            value={searchText}
            onChange={e => setInputSearchText(e.target.value)}
            label="Search"
          />
        </div>
      </div>
      <div className={rickAndMortyClasses.cardsContainer}>
        <Grid
          className={classes.root}
          container
          spacing={2}
          wrap={'wrap'}
          justify={'flex-start'}
        >
          {rickAndMortyCharacters.map((character, index) => (
            <Grid key={index} item xs={3}>
              <RickAndMorthyCharacterComponent
                key={index}
                rickAndMortyCharacter={character}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
