const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));


function evaluateExpression(expr) {
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
    throw new Error('Invalid characters in expression');
  }

  const result = eval(expr); // Note: use with extreme caution in production
  return result;
}

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('calculate', ({ expression }) => {
    const result = evaluateExpression(expression);
    socket.emit('result', result);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
