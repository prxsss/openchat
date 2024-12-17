import { Link, useLocation } from 'react-router';
import { useChatStore } from '../stores/chat';
import { useSocketContext } from '../context/SocketContext';
import { useAuthContext } from '../context/AuthContext';
import extractTime from '../utils/extractTime.js';

const UserListing = ({
  user,
  showMessage = false,
  showMutalFriends = false,
}) => {
  const selectedChat = useChatStore((state) => state.selectedChat);
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();

  const location = useLocation();
  const pathName = location.pathname;

  let isSelected;
  let isOnline;
  let isSender;
  let userData;

  if (pathName.startsWith('/chats')) {
    userData = user.participants[0];
    userData.lastMessage = user.lastMessage;
    isSelected = userData._id === selectedChat?._id;
    isOnline = onlineUsers.includes(userData._id);
    isSender = userData.lastMessage.senderId._id === authUser?._id;
  } else {
    userData = user;
    isOnline = onlineUsers.includes(userData._id);
  }

  return (
    <Link
      to={`/chats/${userData._id}`}
      className={`flex items-center gap-3 rounded-lg p-4 hover:cursor-pointer ${isSelected ? 'bg-primary bg-opacity-10' : 'hover:bg-gray-100 active:bg-gray-200'}`}
    >
      <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
        <div className="skeleton w-14 rounded-full">
          <img src={userData.profilePicture} />
        </div>
      </div>
      <div>
        <div className="text-lg font-semibold">
          {userData.firstName} {userData.lastName}
        </div>
        {showMessage && (
          <div className="text-base">
            {isSender ? 'You: ' : ''}
            {userData.lastMessage.message} &#183;{' '}
            {extractTime(userData.lastMessage.createdAt)}
          </div>
        )}
        {showMutalFriends && <div>Mutal Friends</div>}
      </div>
    </Link>
  );
};
export default UserListing;
