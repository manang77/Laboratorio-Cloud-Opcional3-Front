import React from 'react';
import { RickAndMortyDataVm } from '../rick-and-morty.vm';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { linkRoutes } from 'core/router';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { useHistory } from 'react-router-dom';
import * as rickAndMortyClasses from '../rick-and-morty.styles';

interface Props {
  rickAndMortyCharacter: RickAndMortyDataVm;
}

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 315,
    backgroundColor: 'oldlace',
  },
  media: {
    height: 200,
    marginBottom: '20px',
  },
});

export const RickAndMorthyCharacterComponent: React.FC<Props> = props => {
  const { rickAndMortyCharacter } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleDetailClickButton = (id: string) => {
    history.push(linkRoutes.rickAndMortyCharacterDetail(id));
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Link
            to={linkRoutes.rickAndMortyCharacterDetail(
              rickAndMortyCharacter.id
            )}
          >
            <CardMedia
              className={classes.media}
              image={rickAndMortyCharacter.image}
            />
          </Link>
          <div>
            <div className={rickAndMortyClasses.lineElementName}>
              <Typography
                align="center"
                color="textSecondary"
                gutterBottom
                variant="body1"
              >
                {rickAndMortyCharacter.name}
              </Typography>
            </div>
            <div className={rickAndMortyClasses.lineElementIcon}>
              <IconButton
                onClick={() =>
                  handleDetailClickButton(rickAndMortyCharacter.id)
                }
              >
                <AssignmentIndIcon fontSize="large" color="primary" />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
