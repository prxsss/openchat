import axios from 'axios';
import { useState } from 'react';
import { useChatStore } from '../stores/chat';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const selectedChat = useChatStore((state) => state.selectedChat);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const setChats = useChatStore((state) => state.setChats);

  const sendMessage = async (message) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `/api/messages/send/${selectedChat._id}`,
        { message }
      );

      const chats = await axios.get('/api/chats');

      setMessages([...messages, response.data.newMessage]);
      setChats(chats.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
