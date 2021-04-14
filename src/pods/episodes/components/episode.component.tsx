import React from 'react';
import { EpisodesDataVm } from '../episodes.vm';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { linkRoutes } from 'core/router';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { useHistory } from 'react-router-dom';
import * as episodeClasses from '../episodes.styles';

interface Props {
  episode: EpisodesDataVm;
}

const useStyles = makeStyles({
  root: {
    width: 360,
    height: 240,
    backgroundColor: 'oldlace',
  },
});

export const EpisodeComponent: React.FC<Props> = (props) => {
  const { episode } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleDetailClickButton = (id: string) => {
    history.push(linkRoutes.episodeDetail(id));
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <div className={episodeClasses.episodeContainer}>
            <div className={episodeClasses.headerline}>
              <p>{episode.name.slice(0, 26)}</p>
            </div>
            <div className={episodeClasses.lineElementName}>
              <div>
                <p>
                  <strong>Episode:</strong>
                </p>
              </div>
              <div>
                <p>{episode.episode}</p>
              </div>
            </div>
            <div className={episodeClasses.lineElementName}>
              <div>
                <p>
                  <strong>First Broadcast:</strong>
                </p>
              </div>
              <div>
                <p>{episode.air_date}</p>
              </div>
            </div>
            <div className={episodeClasses.lineElementIcon}>
              <IconButton onClick={() => handleDetailClickButton(episode.id)}>
                <AssignmentIndIcon fontSize="large" color="primary" />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
