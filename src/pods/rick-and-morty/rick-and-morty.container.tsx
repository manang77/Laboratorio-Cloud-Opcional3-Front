import React from 'react';
import { ApplicationContext } from 'common-app/context';
import { RickAndMortyVm, RickAndMortyDataVm } from './rick-and-morty.vm';
import { getRickAndMortyData } from './rick-and-morty.api.vm';
import { RickAndMortyComponent } from './rick-and-morty.component';
import { ItemsPagination } from 'common/components/pagination';
import {
  ServerPagesCalculation,
  calculateServerPages,
  pageSize,
} from './rick-and-morty.utils';
import { useDebounce } from 'use-debounce';
import Alert from '@material-ui/lab/Alert';
import * as rickAndMortyDetailStyles from './rick-and-morty.styles';

export const RickAndMortyContainer: React.FC = () => {
  const {
    rickAndMortySearchText,
    rickAndMortyNavigationPage,
    setRickAndMortyNavigationPage,
  } = React.useContext(ApplicationContext);

  const [charactersData, setCharactersData] = React.useState({});
  const [displayedCharacters, setdisplayedCharacters] = React.useState([]);
  const [displayedPages, setDisplayedPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchText, setSearchText] = React.useState(rickAndMortySearchText);
  const [messageState, setMessageState] = React.useState(true);
  const [messageText, setMessageText] = React.useState('');
  const [initialPageLoad, setInitialPageLoad] = React.useState(true);
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [totalChars, setTotalChars] = React.useState(0);
  const [charactersToDisplay, setCharactersToDisplay] = React.useState(true);

  const updateServerPages = (page: number, data: RickAndMortyDataVm[]) => {
    const dataServerNewPage = {};
    dataServerNewPage[page] = data;
    const newServerData = { ...charactersData, ...dataServerNewPage };
    setCharactersData({ ...newServerData });
  };

  const loadNewServerDataPage = async (
    page: number
  ): Promise<RickAndMortyVm> => {
    try {
      const newServerDataPage = await getRickAndMortyData(
        page,
        debouncedSearchText
      );
      return newServerDataPage;
    } catch (err) {
      setDisplayedPages(0);
      setCurrentPage(0);
      setMessageText(`An error has occurred: ${err}`);
      setMessageState(false);
      setCharactersToDisplay(true);
    }
  };

  const getDataFromServerPages = async (
    page: number,
    ind1: number,
    ind2: number
  ): Promise<RickAndMortyDataVm[]> => {
    const dataServerPage = charactersData[page];
    if (dataServerPage) {
      return dataServerPage.slice(ind1, ind2);
    } else {
      const newServerDataPage = await loadNewServerDataPage(page);
      updateServerPages(page, newServerDataPage.rickAndMortyCharactersData);
      return newServerDataPage.rickAndMortyCharactersData.slice(ind1, ind2);
    }
  };

  const loadConfigData = async (page: number) => {
    setdisplayedCharacters([]);
    const serverPages: ServerPagesCalculation = calculateServerPages(page);
    try {
      const firstDataPage = await getRickAndMortyData(
        serverPages.dataPage1,
        debouncedSearchText
      );
      const totalCharactersCount = firstDataPage.config.count;
      setTotalChars(totalCharactersCount);

      if (totalCharactersCount > 0) {
        updateServerPages(
          serverPages.dataPage1,
          firstDataPage.rickAndMortyCharactersData
        );
        if (serverPages.dataPage1 !== serverPages.dataPage2) {
          const secondServerPage = await loadNewServerDataPage(
            serverPages.dataPage2
          );
          updateServerPages(
            serverPages.dataPage2,
            secondServerPage.rickAndMortyCharactersData
          );
        }
        setCurrentPage(page);
        setMessageState(true);
        setCharactersToDisplay(false);
        setDisplayedPages(Math.ceil(totalCharactersCount / pageSize));
      } else {
        setDisplayedPages(0);
        setCurrentPage(0);
        setMessageText(`There is no characters for search criteria`);
        setMessageState(false);
        setCharactersToDisplay(true);
      }
    } catch (err) {
      setDisplayedPages(0);
      setCurrentPage(0);
      setMessageText(`An error has occurred: ${err}`);
      setMessageState(false);
      setCharactersToDisplay(true);
    }
  };

  const loadVisualizationPage = async (page: number) => {
    const serverPages: ServerPagesCalculation = calculateServerPages(
      page,
      totalChars
    );
    const characterData1 = await getDataFromServerPages(
      serverPages.dataPage1,
      serverPages.pos11,
      serverPages.pos12
    );
    if (serverPages.dataPage1 === serverPages.dataPage2) {
      setdisplayedCharacters([...characterData1]);
    } else {
      const characterData2 = await getDataFromServerPages(
        serverPages.dataPage2,
        serverPages.pos21,
        serverPages.pos22
      );
      setdisplayedCharacters([...characterData1, ...characterData2]);
    }
  };

  React.useEffect(() => {
    setCharactersData({});
    setCurrentPage(-1);
  }, [debouncedSearchText]);

  React.useEffect(() => {
    if (currentPage === -1) {
      if (initialPageLoad) {
        loadConfigData(
          rickAndMortyNavigationPage === 0 ? 1 : rickAndMortyNavigationPage
        );
        setInitialPageLoad(false);
      } else {
        loadConfigData(1);
      }
    } else if (currentPage > 0) {
      loadVisualizationPage(currentPage);
      setRickAndMortyNavigationPage(currentPage);
    }
  }, [currentPage]);

  React.useEffect(() => {
    if (rickAndMortyNavigationPage !== 0) {
      setCurrentPage(-1);
    }
  }, []);

  const setPageContainer = React.useCallback((newPage: number) => {
    setRickAndMortyNavigationPage(newPage);
    setCurrentPage(newPage);
  }, []);

  const updateSearchText = React.useCallback((newText: string) => {
    setSearchText(newText);
  }, []);

  return (
    <>
      <div
        className={rickAndMortyDetailStyles.noCharactersAlert}
        hidden={messageState}
      >
        <Alert variant="filled" severity="info">
          {messageText}
        </Alert>
      </div>
      <div className={rickAndMortyDetailStyles.cardsListContainer}>
        <RickAndMortyComponent
          rickAndMortyCharacters={displayedCharacters}
          updateSearchText={updateSearchText}
        />
      </div>
      <div hidden={charactersToDisplay}>
        <ItemsPagination
          pages={displayedPages}
          currentPage={currentPage}
          setPageContainer={setPageContainer}
        />
      </div>
    </>
  );
};
