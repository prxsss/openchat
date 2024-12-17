import { useAuthContext } from '../context/AuthContext';
// import { useAuthStore } from '../stores/auth';
import { useChatStore } from '../stores/chat';
import extractTime from '../utils/extractTime';

const ChatBubble = ({ message }) => {
  const { authUser } = useAuthContext();
  // const authUser = useAuthStore((state) => state.authUser);
  const selectedChat = useChatStore((state) => state.selectedChat);

  const isSender = () => {
    return authUser._id === message.senderId;
  };

  return (
    <div className={`chat ${isSender() ? 'chat-end' : 'chat-start'}`}>
      <div className={`avatar chat-image ${isSender() ? 'hidden' : ''}`}>
        <div className="skeleton w-10 rounded-full">
          <img alt="" src={selectedChat.profilePicture} />
        </div>
      </div>
      <div
        className={`chat-bubble ${isSender() ? 'chat-bubble-primary' : 'bg-base-200'}`}
      >
        <div className={`${isSender() ? 'text-white' : 'text-black'}`}>
          {message.message}
        </div>
      </div>
      <div className="chat-footer text-xs opacity-50">
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
};
export default ChatBubble;
