const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get('/', (req, res) => {
  res.send('Serwer üstünlikli işleýär!');
});

io.on('connection', (socket) => {
  console.log('Bir ulanyjy birikdi:', socket.id);

  socket.on('hat_iber', (maglumat) => {
    io.emit('taze_hat', maglumat);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serwer ${PORT} portda işläp başlady`);
});
