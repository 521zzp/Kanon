export function listen(action) {
  socket.on('message', (data) => {
    action(data);
  });
}