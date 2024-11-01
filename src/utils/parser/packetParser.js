import { getProtoMessages } from '../../init/loadProto.js';
import { getProtoTypeNameByHandlerId } from '../../handler/index.js';
import { CLIENT_VERSION } from '../../constants/env.js';

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();
  const commonPacket = protoMessages.common.Packet;
  let packet;

  try {
    packet = commonPacket.decode(data);
  } catch (err) {
    console.error(err);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.version;

  // 한번에 전역으로 보내는 에러 찾기
  if (clientVersion !== CLIENT_VERSION) {
    throw Error();
  }

  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw Error();
  }

  const [namespace, typeName] = protoTypeName.split('.');
  const payloadType = protoMessages[namespace][typeName];
  let payload;

  try {
    payload = payloadType.decode(packet.payload);
  } catch (err) {
    console.error(err);
  }

  const expectedFields = Object.keys(payloadType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFields.filter((field) => !actualFields.includes(field));

  if (missingFields > 0) {
    throw Error();
  }

  return { handlerId, userId, payload };
};
