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
      console.log('before if', newMessage);

      if (selectedChat?._id === newMessage.senderId) {
        console.log('inside if', newMessage);
        setMessages([...messages, newMessage]);
      }

      console.log('after if', newMessage);

      const response = await axios.get('/api/chats');
      setChats(response.data);

      console.log('after setChats', newMessage);
    });
  }, [messages, selectedChat?._id, setChats, setMessages, socket]);
};

export default useListenMessages;
