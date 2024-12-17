import UserListings from '../components/UserListings';
import useGetFriends from '../hooks/useGetFriends';

const PeoplePage = () => {
  // const users = 24;
  const { friends, loading } = useGetFriends();

  return (
    <div>
      {/* <div className="px-4 pb-4 pt-2 font-semibold">Active now ({users})</div> */}
      <UserListings users={friends} loading={loading} showMessage={false} />
    </div>
  );
};
export default PeoplePage;
