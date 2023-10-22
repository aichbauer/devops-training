import http from 'http';

import './dotenv';
import baseApp from './app';
import { io } from './v1/websockets';

const apiPort = process.env.API_PORT || 3000;
const websocketPort = process.env.WEBSOCKET_PORT || 3001;

(async () => {
  const app = await baseApp.getApp();
  const server = http.createServer(app);

  io.listen(Number(websocketPort));

  server.listen(apiPort, async () => {
    await baseApp.DatabaseService.start();
    console.info(`API listening on: 127.0.0.1:${apiPort} or localhost:${apiPort}`);
    console.info(
      `Websocket listening on: 127.0.0.1:${websocketPort} or localhost:${websocketPort}`,
    );
  });
})();
