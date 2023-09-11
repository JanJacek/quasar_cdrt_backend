// imports
// lib
import express from 'express'
import { Request, Response } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

//Script
const app = express();
const server = createServer(app);
const cors = {
  origin: ['http://localhost:8080'],
}
const io = new Server(server, {
  cors:cors,
});

app.get('/hello_there', (req: Request, res: Response) => {
  res.send('<h1>It\'s ok, I\'m fine</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('hello there', (resp:(msg:string)=>void)=>{
    console.log('General Kenobi');
    resp('General Kenobi')
  })

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});