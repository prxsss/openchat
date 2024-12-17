import Chat from '../models/chat.model.js';
import User from '../models/user.model.js';
import Message from '../models/message.model.js';

export const getUserChats = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const chats = await Chat.find({ participants: loggedInUserId })
      .select('-messages')
      .populate({
        path: 'participants',
        match: { _id: { $ne: loggedInUserId } },
        select: 'firstName lastName profilePicture',
      })
      .populate({
        path: 'lastMessage',
        select: 'message senderId createdAt',
        populate: {
          path: 'senderId',
          select: 'firstName lastName profilePicture',
        },
      })
      .sort({ updatedAt: -1 })
      .exec();

    const filterChats = chats.filter((chat) =>
      req.user.friends.includes(chat.participants[0]._id)
    );

    res.status(200).json(filterChats);
  } catch (error) {
    console.log('Error in getUserChats controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserChat = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const friendId = req.params.friendId;

    const chat = await Chat.find({
      participants: { $all: [loggedInUserId, friendId] },
    })
      .select('-messages')
      .populate({
        path: 'participants',
        match: { _id: { $ne: loggedInUserId } },
        select: 'firstName lastName profilePicture',
      })
      .populate({
        path: 'lastMessage',
        select: 'message senderId createdAt',
        populate: {
          path: 'senderId',
          select: 'firstName lastName profilePicture',
        },
      })
      .exec();

    res.status(200).json(chat);
  } catch (error) {
    console.log('Error in getUserChat controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
