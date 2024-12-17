import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $nin: [req.user._id, ...req.user.friends] },
    })
      .select('firstName lastName profilePicture friends')
      .populate({
        path: 'friends',
        select: 'firstName lastName profilePicture',
      });

    res.status(200).json({ users });
  } catch (error) {
    console.log('Error in getUsers controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchUserByFullName = async (req, res) => {
  try {
    const fullName = req.query.fullName;
    const regex = new RegExp(fullName, 'i'); // 'i' flag for case-insensitive search
    const users = await User.find({
      _id: { $nin: [req.user._id, ...req.user.friends] },
      fullName: { $regex: regex },
    })
      .select('-password -email -gender')
      .populate({
        path: 'friends',
        select: 'firstName lastName fullName profilePicture',
      });

    res.status(200).json({ users });
  } catch (error) {
    console.log('Error in searchUserByFullName controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
