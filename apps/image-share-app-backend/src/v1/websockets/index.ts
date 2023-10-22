import { Server } from 'socket.io';
import { healthz } from './healthz';

const io = new Server({
  perMessageDeflate: false,
  cors: {
    origin: process.env.APP_URL,
  },
});

io.use((_, next) => {
  // TODO: authorization
  next();
});

io.on('connect_error', (err) => {
  console.error(err, 'Connection error in workspace');
});

io.on('connection', (socket) => {
  healthz(socket);
});

export { io };
