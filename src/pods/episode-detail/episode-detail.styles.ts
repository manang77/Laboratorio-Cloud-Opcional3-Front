import { css } from '@emotion/css';

export const cardBlockContainer = css`
  display: flex;
  flex-direction: row;
  gap: 1.4em;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

export const imageContainer = css`
  height: 13em;
  width: 13em;
  border: 1px solid darkgray;
  box-shadow: 9px 9px 10px dimgray;
`;

export const characterImage = css`
  height: 100%;
`;

export const characterName = css`
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const cardHeaderContainer = css`
  text-align: center;
  font-weight: bold;
  font-size: 10em;
`;

export const lineButtonIcon = css`
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0px;
  padding-left: 92%;
`;

export const charactersContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const characterList = css`
  width: 90%;
`;

export const messageContainer = css`
  width: 100%;
`;
