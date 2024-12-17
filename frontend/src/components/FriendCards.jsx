import FriendCard from './FriendCard';

const FriendCards = ({ friends, loading }) => {
  return (
    <div className="px-2">
      {loading ? (
        <span className="loading loading-spinner loading-lg mx-auto mt-4 block text-base-300"></span>
      ) : (
        <>
          {friends.map((friend, index) => (
            <FriendCard key={index} friend={friend} />
          ))}
        </>
      )}
    </div>
  );
};
export default FriendCards;
