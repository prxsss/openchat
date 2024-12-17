import { useAuthContext } from '../context/AuthContext';
// import { useAuthStore } from '../stores/auth';
import { useState } from 'react';
import axios from 'axios';

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  // const setAuthUser = useAuthStore((state) => state.setAuthUser);
  const [loading, setLoading] = useState(false);

  const signup = async (formData) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/auth/signup', formData);

      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem('user', JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { signup, loading };
};
export default useSignup;
