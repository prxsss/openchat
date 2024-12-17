import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
// import { useAuthStore } from '../stores/auth';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  // const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem('user', JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
export default useLogin;
