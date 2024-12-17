import UserListing from './UserListing';
// import useGetFriends from '../hooks/useGetFriends';

const UserListings = ({ users, loading, showMessage, showMutalFriends }) => {
  // const { friends, loading } = useGetFriends();

  return (
    <div className="px-2">
      {loading ? (
        <span className="loading loading-spinner loading-lg mx-auto mt-4 block text-base-300"></span>
      ) : (
        <>
          {users.map((user, index) => (
            <UserListing
              user={user}
              key={index}
              showMessage={showMessage}
              showMutalFriends={showMutalFriends}
            />
          ))}
        </>
      )}
    </div>
  );
};
export default UserListings;
