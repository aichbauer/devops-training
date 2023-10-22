import { Socket } from 'socket.io';

export const healthz = (socket: Socket) =>
  socket.on('healthz', () => {
    try {
      // send only to the person who is sending the request, no one else will receive
      socket.emit(
        'healthz-response',
        JSON.stringify({
          data: {
            random: (Math.random() + 1).toString(36).substring(7),
          },
        }),
      );
    } catch (err) {
      console.error(err, 'Failed on healthz');
      socket.conn.close();
    }
  });

export default healthz;
