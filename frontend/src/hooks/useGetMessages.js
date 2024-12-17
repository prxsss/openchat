import { useState, useEffect } from 'react';
import { useChatStore } from '../stores/chat';
import axios from 'axios';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const selectedChat = useChatStore((state) => state.selectedChat);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`/api/messages/${selectedChat._id}`);

        if (response.data.error) {
          alert(response.data.error);
        } else {
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChat?._id) {
      getMessages();
    }
  }, [selectedChat?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
