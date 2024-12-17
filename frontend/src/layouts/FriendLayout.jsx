import { Outlet, useParams, NavLink } from 'react-router';

import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import SearchInput from '../components/SearchInput';
import AddFriendButton from '../components/AddFriendButton';

const FriendRequestsPage = () => {
  const { chatId } = useParams();
  const isChatSelected = chatId ? true : false;

  const linkClass = ({ isActive }) =>
    isActive
      ? 'btn btn-primary btn-sm rounded-full'
      : 'btn btn-sm rounded-full';

  return (
    <div className="flex h-screen">
      {/* left column */}
      <div
        className={`relative h-full w-full transition-width duration-300 sm:w-1/2 sm:border-r md:w-2/5 lg:w-1/3 ${isChatSelected ? 'hidden sm:flex sm:flex-col' : 'flex flex-col'}`}
      >
        <Navbar pageName="Friends" />

        <SearchInput />
        <div className="mb-4 flex space-x-2 px-4">
          <NavLink to="/friends/list" className={linkClass}>
            Your Friends
          </NavLink>
          <NavLink to="/friends/requests" className={linkClass}>
            Friend Requests
          </NavLink>
        </div>
        <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
        <AddFriendButton />
        <BottomNavigation />
      </div>
      {/* left column */}

      {/* right column */}
      <div
        className={`h-full flex-1 ${isChatSelected ? 'block' : 'hidden sm:block'}`}
      >
        <div className="flex h-screen items-center justify-center text-center">
          Select a person&apos;s name to start a new conversation!
        </div>
      </div>
      {/* right column */}
    </div>
  );
};
export default FriendRequestsPage;
