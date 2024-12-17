import { Outlet, useParams } from 'react-router';
import useGetChats from '../hooks/useGetChats';

import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import SearchInput from '../components/SearchInput';
import UserListings from '../components/UserListings';

const ChatLayout = () => {
  const { chatId } = useParams();
  const { chats, loading } = useGetChats();
  const isChatSelected = chatId ? true : false;

  return (
    <div className="flex h-screen">
      {/* left column */}
      <div
        className={`relative h-full w-full transition-width duration-300 sm:w-1/2 sm:border-r md:w-2/5 lg:w-1/3 ${isChatSelected ? 'hidden sm:flex sm:flex-col' : 'flex flex-col'}`}
      >
        <Navbar pageName="Chats" />
        <SearchInput />
        <div className="flex-1 overflow-auto">
          <UserListings users={chats} loading={loading} showMessage={true} />
        </div>
        <BottomNavigation />
      </div>
      {/* left column */}

      {/* right column */}
      <div
        className={`h-full flex-1 ${isChatSelected ? 'block' : 'hidden sm:block'}`}
      >
        <Outlet />
      </div>
      {/* right column */}
    </div>
  );
};
export default ChatLayout;
