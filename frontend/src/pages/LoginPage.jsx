import { Link } from 'react-router';
import { useState } from 'react';
import useLogin from '../hooks/useLogin';

import { HiArrowRight } from 'react-icons/hi2';

const LoginPage = () => {
  // const navigate = useNavigate();
  const { login, loading } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex h-screen max-w-3xl flex-col p-4"
    >
      <div className="flex-1 px-4">
        <h1 className="py-8 text-3xl font-semibold text-primary">Login</h1>
        <div className="space-y-4">
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                placeholder=""
                className="input w-full rounded-full bg-base-200"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder=""
                className="input w-full rounded-full bg-base-200"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="flex justify-end">
            <span className="text-xs">Forgot Password?</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/register" className="btn btn-ghost">
          Sign Up
        </Link>
        <button type="submit" className="btn btn-circle btn-primary">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <HiArrowRight className="text-base-100" size={21} />
          )}
        </button>
      </div>
    </form>
  );
};
export default LoginPage;
