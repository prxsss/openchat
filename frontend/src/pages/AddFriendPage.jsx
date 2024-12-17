import FriendRequestCard from '../components/FriendRequestCard';

const AddFriendPage = () => {
  return (
    <div className="px-2">
      {[...Array(10)].map((_, index) => (
        <FriendRequestCard key={index} />
      ))}
    </div>
  );
};
export default AddFriendPage;
