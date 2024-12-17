import { useSocketContext } from '../context/SocketContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useFriendStore } from '../stores/friend';
import { useAuthContext } from '../context/AuthContext';
import getMutalFriends from '../utils/getMutalFriends';

import { HiUserMinus } from 'react-icons/hi2';

const FriendCard = ({ friend }) => {
  const navigate = useNavigate();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(friend._id);
  const friends = useFriendStore((state) => state.friends);
  const setFriends = useFriendStore((state) => state.setFriends);
  const { authUser } = useAuthContext();

  const mutalFriends = getMutalFriends(authUser, friend);

  const handleNavigate = (e) => {
    // navigate(`/chats/${friend._id}`);
    if (e.target === e.currentTarget) {
      navigate(`/chats/${friend._id}`);
    }
  };

  const handleUnfriend = async () => {
    try {
      if (confirm(`Are you sure you want to unfriend ${friend.firstName}?`)) {
        await axios.delete(`/api/friends/${friend._id}`);
        setFriends(friends.filter((f) => f._id !== friend._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // to={`/chats/${friend._id}`}
  return (
    <div
      onClick={handleNavigate}
      className="flex items-center gap-3 rounded-lg p-4 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200"
    >
      <div
        className={`avatar pointer-events-none ${isOnline ? 'online' : 'offline'}`}
      >
        <div className="skeleton w-14 rounded-full">
          <img src={friend.profilePicture} />
        </div>
      </div>
      <div className="pointer-events-none flex flex-1 items-center justify-between">
        <div className="">
          <div className="text-lg font-semibold">
            {friend.firstName} {friend.lastName}
          </div>
          <div>{mutalFriends.length} mutual friends</div>
        </div>
        <button
          onClick={handleUnfriend}
          className="btn btn-circle btn-outline btn-error btn-sm pointer-events-auto"
        >
          <HiUserMinus className="pointer-events-none" />
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
