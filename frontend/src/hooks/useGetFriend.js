import { useState } from 'react';
import { useFriendStore } from '../stores/friend';
import axios from 'axios';

const useGetFriend = () => {
  const [loading, setLoading] = useState(false);
  const setSelectedFriend = useFriendStore((state) => state.setSelectedFriend);

  const getFriend = async (friendId) => {
    try {
      setLoading(true);

      const response = await axios.get(`/api/friends/${friendId}`);

      if (response.data.error) {
        alert(response.data.error);
        return;
      } else {
        setSelectedFriend(response.data.friend);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { getFriend, loading };
};
export default useGetFriend;
