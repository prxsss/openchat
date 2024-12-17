import User from '../models/user.model.js';
import Chat from '../models/chat.model.js';
import { io, getReceiverSocketId } from '../socket/socket.js';

export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user._id; // ID of the person who sent the friend request
    const { receiverId } = req.body; // ID of the person who receives the friend request

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    if (receiver.friends.includes(senderId)) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    if (receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    receiver.friendRequests.push(senderId);
    await receiver.save();

    io.to(getReceiverSocketId(receiverId)).emit('friendRequest', req.user);

    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.log('Error in sendFriendRequest controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const receiverId = req.user._id; // ID of the person who received the friend request
    const { senderId } = req.body; // ID of the person who sent the friend request

    let receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the request exists
    if (!receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({ error: 'Friend request not found' });
    }

    // Remove sender from the friend requests
    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== senderId
    );

    // Remove receiver from the friend requests of the sender if it exists
    sender.friendRequests = sender.friendRequests.filter(
      (id) => id.toString() !== receiverId.toString()
    );

    receiver.friends.push(senderId);
    sender.friends.push(receiverId);

    await Promise.all([receiver.save(), sender.save()]);

    receiver = await User.findById(receiverId).populate({
      path: 'friends',
      select: 'firstName lastName fullName profilePicture',
    });

    io.to(getReceiverSocketId(senderId)).emit('friendRequestAccepted', {
      _id: receiverId,
      firstName: receiver.firstName,
      lastName: receiver.lastName,
      fullName: receiver.fullName,
      profilePicture: receiver.profilePicture,
      friends: receiver.friends,
    });

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    console.log('Error in acceptFriendRequest controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const cancelFriendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;

    const receiver = await User.findById(req.params.receiverId);

    if (!receiver) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (receiver.friends.includes(senderId)) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    if (!receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({ error: 'Friend request not found' });
    }

    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== senderId.toString()
    );

    await receiver.save();

    res.status(200).json({ message: 'Friend request canceled' });
  } catch (error) {
    console.log('Error in cancelFriendRequest controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const receiverId = req.user._id; // ID of the person who received the friend request
    const { senderId } = req.body; // ID of the person who sent the friend request

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({ error: 'Friend request not found' });
    }

    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== senderId
    );

    await receiver.save();

    res.status(200).json({ message: 'Friend request rejected' });
  } catch (error) {
    console.log('Error in rejectFriendRequest controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { friendId } = req.params;

    const loggedInUser = await User.findById(loggedInUserId);
    const friend = await User.findById(friendId);

    if (!loggedInUser || !friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (
      !loggedInUser.friends.includes(friendId) ||
      !friend.friends.includes(loggedInUserId)
    ) {
      return res.status(400).json({ error: 'Friend not found' });
    }

    loggedInUser.friends = loggedInUser.friends.filter(
      (id) => id.toString() !== friendId
    );
    friend.friends = friend.friends.filter(
      (id) => id.toString() !== loggedInUserId.toString()
    );

    await Promise.all([loggedInUser.save(), friend.save()]);

    io.to(getReceiverSocketId(friendId)).emit('friendRemoved', {
      _id: loggedInUserId,
    });

    res.status(200).json({ message: 'Friend removed' });
  } catch (error) {
    console.log('Error in removeFriend controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFriends = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const friends = await User.findById(loggedInUserId)
      .select('friends -_id')
      .populate({
        path: 'friends',
        select: 'firstName lastName fullName profilePicture friends',
        populate: {
          path: 'friends',
          select: 'firstName lastName fullName profilePicture',
        },
      });

    res.status(200).json(friends);
  } catch (error) {
    console.log('Error in getFriends controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFriend = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.friendId;

    const sender = await User.findById(senderId).select('-password');
    const receiver = await User.findById(receiverId).select('-password');

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!sender.friends.includes(receiverId)) {
      return res.status(400).json({ error: 'Friend not found' });
    }

    res.status(200).json({ friend: receiver });
  } catch (error) {
    console.log('Error in getFriend controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const friendRequests = await User.findById(loggedInUserId)
      .select('friendRequests -_id')
      .populate({
        path: 'friendRequests',
        select: '-email -password -friendRequests ',
        populate: {
          path: 'friends',
          select: 'firstName lastName fullName profilePicture',
        },
      });

    res.status(200).json(friendRequests);
  } catch (error) {
    console.log('Error in getFriendRequests controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
