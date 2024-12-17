import { Outlet, useParams } from 'react-router';
import { useAuthContext } from '../context/AuthContext';

import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';

const FriendRequestsPage = () => {
  const { chatId } = useParams();
  const isChatSelected = chatId ? true : false;
  const { authUser } = useAuthContext();

  return (
    <div className="flex h-screen">
      {/* left column */}
      <div
        className={`h-full w-full transition-width duration-300 sm:w-1/2 sm:border-r md:w-2/5 lg:w-1/3 ${isChatSelected ? 'hidden sm:flex sm:flex-col' : 'flex flex-col'}`}
      >
        <Navbar pageName="Profile" />

        <div className="mb-4 mt-4 flex flex-col items-center px-4">
          <div className="avatar">
            <div className="skeleton w-24 rounded-full">
              <img src={authUser.profilePicture} />
            </div>
          </div>
          <div className="mt-4 text-2xl font-semibold">{authUser.fullName}</div>
        </div>
        <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
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
