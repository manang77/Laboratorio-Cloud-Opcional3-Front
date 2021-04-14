import { EpisodeDetailApiModel, CharacterDataApi } from './api';
import { EpisodeDetailVm, EpisodeCharVm } from './episode-detail.vm';
import { getCharacterData  } from './api';

export const mapEpisodeFromApiToVM = async (
  episodeDetailApi: EpisodeDetailApiModel
): Promise<EpisodeDetailVm> => {
  const characterData = await episodeCharactersFromApiToVm(episodeDetailApi.characters);
  const episodeyDetailVm: EpisodeDetailVm = {
    id: episodeDetailApi.id.toString(),
    name: episodeDetailApi.name,
    air_date: episodeDetailApi.air_date,
    episode: episodeDetailApi.episode,
    characters: characterData,
    url: episodeDetailApi.url,
    created: episodeDetailApi.created
  };
  return episodeyDetailVm;
};

const getEpisodeCharactersData = async (urlCharacter: string): Promise<EpisodeCharVm> => {
  const characterId: string = urlCharacter.split("/")[urlCharacter.split("/").length - 1];
  const characterName: string = await getCharacterName(characterId);

  const character: EpisodeCharVm = {
    id: characterId,
    name: characterName,
    image: `${process.env.BASE_SERVER_URL}/avatar/${characterId}.jpeg`,
  }
  return character;
}

const episodeCharactersFromApiToVm = async (charactersApi: string[]): Promise<EpisodeCharVm[]> => {
  const charactersVM = [];
  await charactersApi.reduce(async (previous, character, index) => {
    await previous;
    const data = await getEpisodeCharactersData(character);
    charactersVM.push(data);
    return Promise.resolve();
  }, Promise.resolve());
  return charactersVM;
}

const getCharacterName = async (id: string): Promise<string> => {
  const character: CharacterDataApi = await getCharacterData(id);
  return character.name;
}
