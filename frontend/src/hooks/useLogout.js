import { useAuthContext } from '../context/AuthContext';
// import { useAuthStore } from '../stores/auth';
import { useState } from 'react';
import axios from 'axios';

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  // const setAuthUser = useAuthStore((state) => state.setAuthUser);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);

      await axios.get('api/auth/logout');

      setAuthUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};
export default useLogout;
