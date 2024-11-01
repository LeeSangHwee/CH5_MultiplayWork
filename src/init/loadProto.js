import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { packetNames } from '../protobuf/PacketNames.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const protoDir = path.join(_dirname, '../protobuf');
const protoMessages = {};

const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === '.proto') {
      fileList.push(filePath);
    }
  });

  return fileList;
};
const protoFiles = getAllProtoFiles(protoDir);

export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();

    await Promise.all(protoFiles.map((file) => root.load(file)));

    for (const [packetName, types] of Object.entries(packetNames)) {
      protoMessages[packetName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[packetName][type] = root.lookupType(typeName);
      }
    }

    console.log('Protobuf 파일이 로드 되었습니다.');
  } catch (err) {
    console.error('Protobuf 파일 로드 중 오류가 발생했습니다.', err);
  }
};

// 자료가 바뀌지 않게 object freeze 하는 방법 찾기
export const getProtoMessages = () => {
  return { ...protoMessages };
};
