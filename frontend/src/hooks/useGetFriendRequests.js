import { useState, useEffect } from 'react';
import axios from 'axios';
import { useFriendStore } from '../stores/friend';

const useGetFriendRequests = () => {
  // const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const setFriendRequests = useFriendStore((state) => state.setFriendRequests);
  const friendRequests = useFriendStore((state) => state.friendRequests);

  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        setLoading(true);

        const response = await axios.get('/api/friends/requests');

        if (response.data.error) {
          alert(response.data.error);
          return;
        } else {
          setFriendRequests(response.data.friendRequests);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFriendRequests();
  }, []);

  return { friendRequests, loading };
};
export default useGetFriendRequests;
