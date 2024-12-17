import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';

import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});

server.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
