// imports
// lib
import express from 'express'
import { Request, Response } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { YSocketIO } from 'y-socket.io/dist/server';
//Script
const app = express();
const server = createServer(app);
const cors = {
  origin: ['http://localhost:8080'],
}
const io = new Server(server, {
  cors:cors,
});

const ysocketio = new YSocketIO(io, {
  // authenticate: (auth) => auth.token === 'valid-token',
  // levelPersistenceDir: './storage-location',
  // gcEnabled: true,
})

// ysocketio.on('document-loaded', (doc: Document) => console.log(`The document ${doc.name} was loaded`))
// ysocketio.on('document-update', (doc: Document, update: Uint8Array) => console.log(`The document ${doc.name} is updated`))
// ysocketio.on('awareness-update', (doc: Document, update: Uint8Array) => console.log(`The awareness of the document ${doc.name} is updated`))
// ysocketio.on('document-destroy', async (doc: Document) => console.log(`The document ${doc.name} is being destroyed`))
// ysocketio.on('all-document-connections-closed', async (doc: Document) => console.log(`All clients of document ${doc.name} are disconected`))

ysocketio.initialize()


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