import { useState, useEffect } from 'react';
import axios from 'axios';
import { useFriendStore } from '../stores/friend';

const useGetFriends = () => {
  // const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const friends = useFriendStore((state) => state.friends);
  const setFriends = useFriendStore((state) => state.setFriends);

  useEffect(() => {
    const getFriends = async () => {
      try {
        setLoading(true);

        const response = await axios.get('/api/friends');

        if (response.data.error) {
          alert(response.data.error);
        } else {
          setFriends(response.data.friends);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFriends();
  }, []);

  return { friends, loading };
};
export default useGetFriends;
