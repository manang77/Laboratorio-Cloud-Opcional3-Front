import React from 'react';
import { ApplicationContext } from 'common-app/context';
import { EpisodesDataVm, EpisodesVm } from './episodes.vm';
import { getEpisodesData } from './episodes.api.vm';
import { EpisodesComponent } from './episodes.component';
import { ItemsPagination } from 'common/components/pagination';
import {
  ServerPagesCalculation,
  calculateServerPages,
  pageSize,
} from './episodes.utils';
import { useDebounce } from 'use-debounce';
import Alert from '@material-ui/lab/Alert';
import * as episodeStyles from './episodes.styles';

export const EpisodesContainer: React.FC = () => {
  const {
    episodesSearchText,
    episodesNavigationPage,
    setEpisodesNavigationPage,
  } = React.useContext(ApplicationContext);

  const [episodesData, setEpisodesData] = React.useState({});
  const [displayedEpisodes, setDisplayedEpisodes] = React.useState([]);
  const [displayedPages, setDisplayedPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchText, setSearchText] = React.useState(episodesSearchText);
  const [messageState, setMessageState] = React.useState(true);
  const [messageText, setMessageText] = React.useState('');
  const [initialPageLoad, setInitialPageLoad] = React.useState(true);
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [totalEpisodes, setTotalEpisodes] = React.useState(0);
  const [episodesToDisplay, setEpisodesToDisplay] = React.useState(true);

  const updateServerPages = (page: number, data: EpisodesDataVm[]) => {
    const dataServerNewPage = {};
    dataServerNewPage[page] = data;
    const newServerData = { ...episodesData, ...dataServerNewPage };
    setEpisodesData({ ...newServerData });
  };

  const loadNewServerDataPage = async (page: number): Promise<EpisodesVm> => {
    try {
      const newServerDataPage = await getEpisodesData(
        page,
        debouncedSearchText
      );
      return newServerDataPage;
    } catch (err) {
      setDisplayedPages(0);
      setCurrentPage(0);
      setMessageText(`An error has occurred: ${err}`);
      setMessageState(false);
      setEpisodesToDisplay(true);
    }
  };

  const getDataFromServerPages = async (
    page: number,
    ind1: number,
    ind2: number
  ): Promise<EpisodesDataVm[]> => {
    const dataServerPage = episodesData[page];
    if (dataServerPage) {
      return dataServerPage.slice(ind1, ind2);
    } else {
      const newServerDataPage = await loadNewServerDataPage(page);
      updateServerPages(page, newServerDataPage.EpisodesData);
      return newServerDataPage.EpisodesData.slice(ind1, ind2);
    }
  };

  const loadConfigData = async (page: number) => {
    setDisplayedEpisodes([]);
    const serverPages: ServerPagesCalculation = calculateServerPages(page);
    try {
      const firstDataPage = await getEpisodesData(
        serverPages.dataPage1,
        debouncedSearchText
      );
      const totalEpisodesCount = firstDataPage.config.count;
      setTotalEpisodes(totalEpisodesCount);

      if (totalEpisodesCount > 0) {
        updateServerPages(serverPages.dataPage1, firstDataPage.EpisodesData);
        if (serverPages.dataPage1 !== serverPages.dataPage2) {
          const secondServerPage = await loadNewServerDataPage(
            serverPages.dataPage2
          );
          updateServerPages(
            serverPages.dataPage2,
            secondServerPage.EpisodesData
          );
        }
        setCurrentPage(page);
        setMessageState(true);
        setEpisodesToDisplay(false);
        setDisplayedPages(Math.ceil(totalEpisodesCount / pageSize));
      } else {
        setDisplayedPages(0);
        setCurrentPage(0);
        setMessageText(`There is no episodes for search criteria`);
        setMessageState(false);
        setEpisodesToDisplay(true);
      }
    } catch (err) {
      setDisplayedPages(0);
      setCurrentPage(0);
      setMessageText(`An error has occurred: ${err}`);
      setMessageState(false);
      setEpisodesToDisplay(true);
    }
  };

  const loadVisualizationPage = async (page: number) => {
    const serverPages: ServerPagesCalculation = calculateServerPages(
      page,
      totalEpisodes
    );
    const episodeData1 = await getDataFromServerPages(
      serverPages.dataPage1,
      serverPages.pos11,
      serverPages.pos12
    );
    if (serverPages.dataPage1 === serverPages.dataPage2) {
      setDisplayedEpisodes([...episodeData1]);
    } else {
      const episodeData2 = await getDataFromServerPages(
        serverPages.dataPage2,
        serverPages.pos21,
        serverPages.pos22
      );
      setDisplayedEpisodes([...episodeData1, ...episodeData2]);
    }
  };

  React.useEffect(() => {
    setEpisodesData({});
    setCurrentPage(-1);
  }, [debouncedSearchText]);

  React.useEffect(() => {
    if (currentPage === -1) {
      if (initialPageLoad) {
        loadConfigData(
          episodesNavigationPage === 0 ? 1 : episodesNavigationPage
        );
        setInitialPageLoad(false);
      } else {
        loadConfigData(1);
      }
    } else if (currentPage > 0) {
      loadVisualizationPage(currentPage);
      setEpisodesNavigationPage(currentPage);
    }
  }, [currentPage]);

  React.useEffect(() => {
    if (episodesNavigationPage !== 0) {
      setCurrentPage(-1);
    }
  }, []);

  const setPageContainer = React.useCallback((newPage: number) => {
    setEpisodesNavigationPage(newPage);
    setCurrentPage(newPage);
  }, []);

  const updateSearchText = React.useCallback((newText: string) => {
    setSearchText(newText);
  }, []);

  return (
    <>
      <div className={episodeStyles.noEpisodessAlert} hidden={messageState}>
        <Alert variant="filled" severity="info">
          {messageText}
        </Alert>
      </div>
      <div className={episodeStyles.cardsListContainer}>
        <EpisodesComponent
          episodes={displayedEpisodes}
          updateSearchText={updateSearchText}
        />
      </div>
      <div hidden={episodesToDisplay}>
        <ItemsPagination
          pages={displayedPages}
          currentPage={currentPage}
          setPageContainer={setPageContainer}
        />
      </div>
    </>
  );
};
