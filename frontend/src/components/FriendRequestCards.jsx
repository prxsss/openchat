import FriendRequestCard from './FriendRequestCard';

const FriendRequestCards = ({ friendRequests, loading, isAddFriend }) => {
  return (
    <div className="px-2">
      {loading ? (
        <span className="loading loading-spinner loading-lg mx-auto mt-4 block text-base-300"></span>
      ) : (
        <>
          {friendRequests.map((friendRequest, index) => (
            <FriendRequestCard
              friendRequest={friendRequest}
              isAddFriend={isAddFriend}
              key={index}
            />
          ))}
        </>
      )}
    </div>
  );
};
export default FriendRequestCards;
