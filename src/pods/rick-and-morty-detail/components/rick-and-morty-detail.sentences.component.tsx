import React from 'react';
import * as rickyAndMortyDetailClasses from '../rick-and-morty-detail.styles';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { CharacterNewSentenceComponent } from '../components';

interface Props {
  characterName: string;
  characterBestSentences: string[];
  updateCharacterSentences: (updatedSentences: string[]) => Promise<boolean>;
}

export const RickAndMortyBestSentencesComponent: React.FC<Props> = (props) => {
  const {
    characterName,
    characterBestSentences,
    updateCharacterSentences,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [sentenceToEdit, setSentenceToEdit] = React.useState('');
  const [index, setIndex] = React.useState(-1);
  const [bestSentences, setBestSentences] = React.useState([]);

  const handleNewClickButton = () => {
    setSentenceToEdit('');
    setIndex(-1);
    setOpen(true);
  };

  const handleEditClickButton = (sentenceToEdit: string, index: number) => {
    setIndex(index);
    setSentenceToEdit(sentenceToEdit);
    setOpen(true);
  };

  const handleDeleteClickButton = async (
    sentenceToDelete: string,
    index: number
  ) => {
    const newBestSentences = bestSentences.filter(
      (char, i) => char !== sentenceToDelete || i !== index
    );
    const result: boolean = await updateCharacterSentences(newBestSentences);
    if (result) {
      setBestSentences(newBestSentences);
    }
  };

  const updateSentence = async (newSentence: string) => {
    if (index === -1) {
      const newBestSentences = [...bestSentences, newSentence];
      const result: boolean = await updateCharacterSentences(newBestSentences);
      if (result) {
        setBestSentences(newBestSentences);
      }
    } else {
      const newBestSentences = bestSentences.map((char, i) => {
        if (char === sentenceToEdit && i === index) {
          return newSentence;
        } else {
          return char;
        }
      });
      const result: boolean = await updateCharacterSentences(newBestSentences);
      if (result) {
        setBestSentences(newBestSentences);
      }
    }
    setSentenceToEdit('');
    setIndex(-1);
  };

  React.useEffect(() => {
    setBestSentences([...characterBestSentences]);
  }, [characterBestSentences]);

  return (
    <>
      <CharacterNewSentenceComponent
        open={open}
        title={
          index === -1
            ? `Enter new best sentence for ${characterName}`
            : `Modify best sentence for ${characterName}`
        }
        sentence={sentenceToEdit}
        setOpen={setOpen}
        updateSentence={updateSentence}
      />
      <div className={rickyAndMortyDetailClasses.bestSentencesContainer}>
        <div
          className={rickyAndMortyDetailClasses.bestSentencesHeaderContainer}
        >
          <div>
            <p className={rickyAndMortyDetailClasses.bestSentencesTitle}>
              Best sentences
            </p>
          </div>
          <div>
            <IconButton onClick={() => handleNewClickButton()}>
              <AddBoxIcon fontSize="small" color="primary" />
            </IconButton>
          </div>
        </div>
        {bestSentences.map((item, index) => (
          <div
            key={index}
            className={rickyAndMortyDetailClasses.bestSentenceLineContainer}
          >
            <div className={rickyAndMortyDetailClasses.buttonContainer}>
              <IconButton onClick={() => handleDeleteClickButton(item, index)}>
                <DeleteIcon fontSize="small" color="primary" />
              </IconButton>
            </div>
            <div className={rickyAndMortyDetailClasses.buttonContainer}>
              <IconButton onClick={() => handleEditClickButton(item, index)}>
                <EditIcon fontSize="small" color="primary" />
              </IconButton>
            </div>
            <div
              className={rickyAndMortyDetailClasses.bestSentencesTextContainer}
            >
              <p className={rickyAndMortyDetailClasses.bestSentencesText}>
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
