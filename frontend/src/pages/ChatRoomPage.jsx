import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router';
import { useChatStore } from '../stores/chat';
import useGetMessages from '../hooks/useGetMessages';
import useListenMessages from '../hooks/useListenMessages';
import { useSocketContext } from '../context/SocketContext';

import { HiChevronLeft, HiPhone, HiVideoCamera } from 'react-icons/hi2';
import ChatInput from '../components/ChatInput';
import ChatBubble from '../components/ChatBubble';

const ChatRoomPage = () => {
  const { messages, loading } = useGetMessages();
  const { onlineUsers } = useSocketContext();
  const selectedChat = useChatStore((state) => state.selectedChat);
  const setSelectedChat = useChatStore((state) => state.setSelectedChat);
  const setMessages = useChatStore((state) => state.setMessages);
  const params = useParams();
  const lastMessageRef = useRef(null);

  const isOnline = onlineUsers.includes(selectedChat?._id);

  useListenMessages();

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const response = await fetch(`/api/friends/${params.chatId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch friend data');
        }
        const friendData = await response.json();

        setSelectedChat(friendData.friend);
        // isOnline = onlineUsers.includes(selectedChat._id);
      } catch (error) {
        console.error(error);
      }
    };

    if (params.chatId) {
      fetchFriend();
    }

    return () => {
      setSelectedChat(null);
      setMessages([]);
    };
  }, [params.chatId, setMessages, setSelectedChat]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <>
      {selectedChat ? (
        <div className="flex h-screen flex-col">
          {/* navbar */}
          <div className="navbar bg-base-100 shadow">
            {/* left side */}
            <div className="flex-1">
              <Link
                to="/chats"
                className="btn btn-circle btn-ghost btn-sm sm:hidden"
              >
                <HiChevronLeft className="text-primary" size={28} />
              </Link>
              <div className="btn btn-ghost flex items-center">
                <div
                  className={`avatar ${isOnline ? 'online' : 'offline'} mr-1`}
                >
                  <div className="skeleton w-10 rounded-full">
                    <img src={`${selectedChat?.profilePicture}`} />
                  </div>
                </div>
                <div className="text-lg font-semibold">
                  {selectedChat.firstName} {selectedChat.lastName}
                </div>
              </div>
            </div>
            {/* left side */}

            {/* right side */}
            <div className="flex-none gap-2">
              <div className="btn btn-circle btn-ghost btn-sm">
                <HiPhone className="text-primary" size={21} />
              </div>
              <div className="btn btn-circle btn-ghost btn-sm">
                <HiVideoCamera className="text-primary" size={21} />
              </div>
            </div>
            {/* right side */}
          </div>
          {/* navbar */}

          {/* content */}
          <div className="flex-1 overflow-auto px-2 pt-2">
            {loading ? (
              <span className="loading loading-spinner loading-lg mx-auto mt-4 block text-base-300"></span>
            ) : (
              <>
                {messages.map((message) => (
                  <div key={message._id} ref={lastMessageRef}>
                    <ChatBubble message={message} />
                  </div>
                ))}
              </>
            )}
          </div>
          {/* content */}

          {/* chat input */}
          <ChatInput />
          {/* chat input */}
        </div>
      ) : (
        // skeleton loading
        <div className="navbar bg-base-100 shadow">
          <div className="flex-1">
            <Link
              to="/chats"
              className="btn btn-circle btn-ghost btn-sm sm:hidden"
            >
              <HiChevronLeft className="text-primary" size={28} />
            </Link>
            <div className="btn btn-ghost flex items-center">
              <div className="avatar mr-1">
                <div className="skeleton w-10 rounded-full"></div>
              </div>
              <div className="skeleton h-4 w-44"></div>
            </div>
          </div>

          <div className="flex-none gap-2">
            <div className="btn btn-circle btn-ghost btn-sm">
              <HiPhone className="text-primary" size={21} />
            </div>
            <div className="btn btn-circle btn-ghost btn-sm">
              <HiVideoCamera className="text-primary" size={21} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ChatRoomPage;
