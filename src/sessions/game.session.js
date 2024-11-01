import Game from '../classes/models/game.class.js';
import { gameSessions } from './sessions.js';

export const addGameSession = (id) => {
  const session = new Game(id);
  gameSessions.push(session);
  return session;
};

export const removeGameSession = () => {
  delete gameSessions[0]; // 지금은 게임 세션 하나만 들고 올거라서 0번째
};

export const getGameSession = () => {
  return gameSessions[0]; // 지금은 게임 세션 하나만 들고 올거라서 0번째
};
