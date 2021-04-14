import React from 'react';
import * as rickyAndMortyDetailClasses from '../rick-and-morty-detail.styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface Props {
  open: boolean;
  title: string;
  sentence: string;
  setOpen: (boolean) => void;
  updateSentence: (newSentence: string) => void;
}

export const CharacterNewSentenceComponent: React.FC<Props> = (props) => {
  const { open, title, setOpen, sentence, updateSentence } = props;
  const [newSentence, setNewSentence] = React.useState('');

  const handleSave = () => {
    if (newSentence !== '') {
      setOpen(false);
      updateSentence(newSentence);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Dialog open={open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <div className={rickyAndMortyDetailClasses.dialogInputContainer}>
              <TextField
                className={rickyAndMortyDetailClasses.dialogInput}
                autoFocus
                margin="normal"
                id="newSentence"
                label="Best Sentence"
                type="text"
                defaultValue={sentence}
                onChange={(e) => {
                  setNewSentence(e.target.value);
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
