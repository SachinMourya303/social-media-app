import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';
import { ConnectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import userDetailsRoutes from './routes/userDetailsRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on('send_message', (data) => {
    io.to(data.roomId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use('/auth', authRoutes);
app.use('/users', userDetailsRoutes);
app.use('/post', postsRoutes);
app.use('/message', messagesRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server & Socket running on http://localhost:${PORT}`);
    });
    await ConnectDB();
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
