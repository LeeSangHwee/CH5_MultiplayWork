import { HANDLER_IDS } from '../constants/HandlerIds.js';
import locationUpdateHandler from './game/locationUpdate.handler.js';
import initialHandler from './user/initial.handler.js';

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: initialHandler,
    protoType: 'initial.InitialPacket',
  },
  [HANDLER_IDS.LOCATION_UPDATE]: {
    handler: locationUpdateHandler,
    protoType: 'game.LocationUpdatePayload',
  },
};

export const getHandlerByHId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw Error();
  }
  return handlers[handlerId].handler;
};

// 이것도 나중에 전역 처리
export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw Error();
  }
  return handlers[handlerId].protoType;
};
