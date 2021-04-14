import React from 'react';
import { CardContent, CardHeader, IconButton } from '@material-ui/core';
import { Card } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { EpisodeDetailVm } from './episode-detail.vm';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import * as episodeDetailClasses from './episode-detail.styles';
import { useHistory } from 'react-router-dom';
import { linkRoutes } from 'core/router';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: 'oldlace',
      width: 'auto',
      minHeight: '6em',
    },
    icon: {
      color: 'secondary',
    },
  })
);

interface Props {
  episode: EpisodeDetailVm;
}

export const EpisodeDetailComponent: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { episode } = props;
  const history = useHistory();

  const handleExitClickButton = () => {
    history.goBack();
  };

  return (
    <>
      <Card className={classes.root}>
        <div>
          <CardHeader
            className={episodeDetailClasses.cardHeaderContainer}
            title={`Characters appearing in episode '${episode.name}'`}
          />
        </div>
        <div className={episodeDetailClasses.lineButtonIcon}>
          <IconButton onClick={() => handleExitClickButton()}>
            <ExitToAppIcon fontSize="large" color="primary" />
          </IconButton>
        </div>
        <CardContent>
          <div className={episodeDetailClasses.cardBlockContainer}>
            {episode.characters.map((character, index) => (
              <div key={index}>
                <Link
                  to={linkRoutes.rickAndMortyCharacterDetail(
                    character.id
                  )}
                >
                  <div className={episodeDetailClasses.imageContainer}>
                    <img
                      className={episodeDetailClasses.characterImage}
                      src={character.image}
                      height="50"
                    />
                  </div>
                </Link>
                <div className={episodeDetailClasses.characterName}>
                  <p>{character.name}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
