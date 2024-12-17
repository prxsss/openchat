import useGetFriendRequests from '../hooks/useGetFriendRequests';

import FriendRequestCards from '../components/FriendRequestCards';
// import { useFriendStore } from '../stores/friend';

const FriendRequestsPage = () => {
  const { friendRequests, loading } = useGetFriendRequests();

  return (
    <FriendRequestCards friendRequests={friendRequests} loading={loading} />
  );
};
export default FriendRequestsPage;
