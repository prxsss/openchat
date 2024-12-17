import axios from 'axios';
import { useState, useEffect } from 'react';

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async (fullName = '') => {
    try {
      setLoading(true);

      const response = await axios.get(`/api/users?fullName=${fullName}`);

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, getUsers, loading };
};
export default useGetUsers;
