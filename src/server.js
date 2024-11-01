import net from 'net';
import { HOST, PORT } from './constants/env.js';
import { onConnections } from './events/onConnections.js';
import initServer from './init/index.js';

const server = net.createServer(onConnections);

initServer()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`서버가 ${HOST}:${PORT}에서 실행 중입니다.`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
