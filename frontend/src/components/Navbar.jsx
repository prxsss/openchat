import useLogout from '../hooks/useLogout';
import { toast } from 'react-toastify';

import { HiArrowLeftEndOnRectangle } from 'react-icons/hi2';

const Navbar = ({ pageName }) => {
  const { logout } = useLogout();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div onClick={handleLogout} className="btn btn-circle btn-ghost">
          <HiArrowLeftEndOnRectangle className="text-red-400" size={28} />
        </div>
      </div>
      <div className="navbar-center">
        <a className="text-xl font-bold">{pageName}</a>
      </div>
      <div className="navbar-end">
        <button
          onClick={() => toast.info('Feature coming soon')}
          className="btn btn-circle btn-ghost"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge indicator-item badge-primary badge-xs"></span>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Navbar;
