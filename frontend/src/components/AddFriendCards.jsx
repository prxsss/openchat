import AddFriendCard from './AddFriendCard';

const AddFriendCards = ({ users, loading }) => {
  return (
    <div className="">
      {loading ? (
        <span className="loading loading-spinner loading-lg mx-auto mt-4 block text-base-300"></span>
      ) : (
        <>
          {users.map((user, index) => (
            <AddFriendCard user={user} key={index} />
          ))}
        </>
      )}
    </div>
  );
};
export default AddFriendCards;
