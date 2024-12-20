import { useState, useEffect } from 'react';
import axios from 'axios';
import { useChatStore } from '../stores/chat';

const useGetChats = () => {
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);
  const [loading, setLoading] = useState(false);

  const fetchChats = async (fullName = '') => {
    try {
      setLoading(true);

      const response = await axios.get(`/api/chats?fullName=${fullName}`);

      setChats(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return { chats, fetchChats, loading };
};
export default useGetChats;
