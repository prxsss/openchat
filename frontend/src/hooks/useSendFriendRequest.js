import { useState } from 'react';
import axios from 'axios';

const useSendFriendRequest = () => {
  const [loading, setLoading] = useState(false);

  const sendFriendRequest = async (friend) => {
    try {
      setLoading(true);

      await axios.post('/api/friends/request', {
        receiverId: friend._id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendFriendRequest, loading };
};
export default useSendFriendRequest;
