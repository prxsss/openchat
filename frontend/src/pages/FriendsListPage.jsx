import useGetFriends from '../hooks/useGetFriends';
import useListenUnfriend from '../hooks/useListenUnfriend';

// import UserListings from '../components/UserListings';
import FriendCards from '../components/FriendCards';

const FriendRequestsPage = () => {
  const { friends, loading } = useGetFriends();

  useListenUnfriend();

  return (
    <div className="px-2">
      {/* <UserListings users={friends} loading={loading} showMutalFriends={true} /> */}
      <FriendCards friends={friends} loading={loading} />
    </div>
  );
};
export default FriendRequestsPage;
