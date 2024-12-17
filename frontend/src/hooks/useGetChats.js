import { useState, useEffect } from 'react';
import axios from 'axios';
import { useChatStore } from '../stores/chat';

const useGetChats = () => {
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);

        const response = await axios.get('/api/chats');

        setChats(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [setChats]);

  return { chats, loading };
};
export default useGetChats;
