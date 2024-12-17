import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import getMutalFriends from '../utils/getMutalFriends';

const AddFriendCard = ({ user }) => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [isSentRequest, setIsSentRequest] = useState(
    user.friendRequests.includes(authUser?._id)
  );

  const mutalFriends = getMutalFriends(authUser, user);

  const handleSendFriendRequest = async () => {
    try {
      setLoading(true);

      const response = await axios.post('/api/friends/request', {
        receiverId: user._id,
      });

      if (response.data.error) {
        alert(response.data.error);
      } else {
        setIsSentRequest(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(`/api/friends/requests/${user._id}`);

      if (response.data.error) {
        alert(response.data.error);
      } else {
        setIsSentRequest(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-lg p-4 hover:bg-gray-100">
      <div className="avatar">
        <div className="skeleton w-16 rounded-full">
          <img src={user.profilePicture} />
        </div>
      </div>
      <div className="w-full space-y-2">
        <div className="text-lg font-semibold">
          {user.firstName} {user.lastName}
        </div>
        <div className="flex flex-wrap items-center justify-between space-x-2 space-y-2">
          {/* Avatar group with counter */}
          <div className="avatar-group -space-x-4 rtl:space-x-reverse">
            {mutalFriends.slice(0, 2).map((friend, index) => (
              <div className="avatar skeleton" key={index}>
                <div className="w-6">
                  <img src={friend.profilePicture} />
                </div>
              </div>
            ))}
            {mutalFriends.length > 2 && (
              <div className="avatar placeholder">
                <div className="w-6 bg-neutral text-neutral-content">
                  <span>+{mutalFriends.length - 2}</span>
                </div>
              </div>
            )}
          </div>
          {/* Avatar group with counter */}

          {/* <div className="space-x-2"> */}
          {isSentRequest ? (
            <button
              onClick={handleCancelFriendRequest}
              className="btn btn-primary btn-sm w-full max-w-[7.5rem]"
            >
              {loading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
              Cancel
            </button>
          ) : (
            <button
              onClick={handleSendFriendRequest}
              className="btn btn-primary btn-sm w-full max-w-[7.5rem]"
            >
              {loading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
              Add Friend
            </button>
          )}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
export default AddFriendCard;
