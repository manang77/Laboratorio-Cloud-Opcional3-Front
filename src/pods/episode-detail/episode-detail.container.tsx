import React from 'react';
import { useParams } from 'react-router-dom';
import { getEpisode } from './episode-detail.api.vm';
import { EpisodeDetailComponent } from './episode-detail.component';
import Alert from '@material-ui/lab/Alert';
import { EpisodeDetailVm, getNewEpisodeDetailVm } from './episode-detail.vm';
import * as episodeStyles from './episode-detail.styles';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface EpisodeDetailParams {
  id: string;
}

export const EpisodeDetailContainer: React.FC = () => {
  const { id } = useParams<EpisodeDetailParams>();
  const history = useHistory();
  const [episodeDetail, setEpisodeDetail] = React.useState<EpisodeDetailVm>(
    getNewEpisodeDetailVm()
  );
  const [dataState, setDataState] = React.useState(true);
  const [messageState, setMessageState] = React.useState(true);
  const [messageText, setMessageText] = React.useState('');

  const loadEpisode = async () => {
    try {
      const episodeDetailVM: EpisodeDetailVm = await getEpisode(id);
      setEpisodeDetail(episodeDetailVM);
      setDataState(false);
    } catch (err) {
      setMessageText(`An error has occurred: ${err}`);
      setMessageState(false);
    }
  };

  const handleExitClickButton = () => {
    history.goBack();
  };

  React.useEffect(() => {
    loadEpisode();
  }, []);

  return (
    <>
      <div className={episodeStyles.charactersContainer}>
        <div hidden={messageState} className={episodeStyles.messageContainer}>
          <Alert
            variant="filled"
            severity="info"
            action={
              <IconButton onClick={() => handleExitClickButton()}>
                <ExitToAppIcon fontSize="small" color="primary" />
              </IconButton>
            }
          >
            {messageText}
          </Alert>
        </div>
        <div hidden={dataState} className={episodeStyles.characterList}>
          <div>
            <EpisodeDetailComponent episode={episodeDetail} />
          </div>
        </div>
      </div>
    </>
  );
};
