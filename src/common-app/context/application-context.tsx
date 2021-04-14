import React from 'react';

interface ApplicationContext {
  rickAndMortySearchText: string;
  setRickAndMortySearchText: (value: string) => void;
  rickAndMortyNavigationPage: number;
  setRickAndMortyNavigationPage: (value: number) => void;
  episodesSearchText: string;
  setEpisodesSearchText: (value: string) => void;
  episodesNavigationPage: number;
  setEpisodesNavigationPage: (value: number) => void;
}

export const ApplicationContext = React.createContext<ApplicationContext>({
  rickAndMortySearchText: '',
  setRickAndMortySearchText: (value) => {},
  rickAndMortyNavigationPage: 0,
  setRickAndMortyNavigationPage: (value) => {},
  episodesSearchText: '',
  setEpisodesSearchText: (value) => {},
  episodesNavigationPage: 0,
  setEpisodesNavigationPage: (value) => {},
});

export const ApplicationContextProvider = (props) => {
  const [rickAndMortySearchText, setRickAndMortySearchText] = React.useState(
    ''
  );
  const [episodesSearchText, setEpisodesSearchText] = React.useState('');
  const [
    rickAndMortyNavigationPage,
    setRickAndMortyNavigationPage,
  ] = React.useState(0);

  const [episodesNavigationPage, setEpisodesNavigationPage] = React.useState(0);

  return (
    <ApplicationContext.Provider
      value={{
        rickAndMortySearchText,
        setRickAndMortySearchText,
        rickAndMortyNavigationPage,
        setRickAndMortyNavigationPage,
        episodesSearchText,
        setEpisodesSearchText,
        episodesNavigationPage,
        setEpisodesNavigationPage,
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};
