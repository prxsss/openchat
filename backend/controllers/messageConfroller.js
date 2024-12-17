import Message from '../models/message.model.js';
import Chat from '../models/chat.model.js';
import User from '../models/user.model.js';
import { io, getReceiverSocketId } from '../socket/socket.js';
// import axios from 'axios';

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;
    const message = req.body.message;

    const sender = await User.findById(senderId).select('-password');
    const receiver = await User.findById(receiverId).select('-password');

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!sender.friends.includes(receiverId)) {
      return res.status(400).json({ error: 'Friend not found' });
    }

    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      chat.messages.push(newMessage);
      chat.lastMessage = newMessage;
    }

    await Promise.all([chat.save(), newMessage.save()]);

    // Emit the new message to the receiver (socket.io)
    const receiverSocketId = getReceiverSocketId(receiverId);

    io.to(receiverSocketId).emit('newMessage', newMessage);

    res.status(200).json({ newMessage });
  } catch (error) {
    console.log('Error in sendMessage controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;

    const sender = await User.findById(senderId).select('-password');
    const receiver = await User.findById(receiverId).select('-password');

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the chat between the two users
    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate('messages');

    // If the chat does not exist, return an empty array
    if (!chat) {
      return res.status(200).json({ messages: [] });
    }

    res.status(200).json({ messages: chat.messages });
  } catch (error) {
    console.log('Error in getMessages controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
