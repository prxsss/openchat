import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useChatStore } from '../stores/chat';
import axios from 'axios';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const selectedChat = useChatStore.getState().selectedChat;
  const setChats = useChatStore((state) => state.setChats);

  useEffect(() => {
    socket?.on('newMessage', async (newMessage) => {
      if (selectedChat?._id === newMessage.senderId) {
        setMessages([...messages, newMessage]);
      }

      const response = await axios.get('/api/chats');
      setChats(response.data);
    });
  }, [messages, selectedChat?._id, setChats, setMessages, socket]);
};

export default useListenMessages;
