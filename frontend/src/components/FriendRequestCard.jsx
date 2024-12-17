import { useState } from 'react';
import axios from 'axios';
import getMutalFriends from '../utils/getMutalFriends';
import { useAuthContext } from '../context/AuthContext';

const FriendRequestCard = ({ friendRequest, isAddFriend = false }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const { authUser } = useAuthContext();

  const mutalFriends = getMutalFriends(authUser, friendRequest);

  const handleConfirm = async () => {
    try {
      await axios.post('/api/friends/accept', {
        senderId: friendRequest._id, // ID of the person who sent the friend request
      });

      setActionMessage('Request accepted');
      setIsButtonClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post('/api/friends/reject', {
        senderId: friendRequest._id, // ID of the person who sent the friend request})
      });

      setActionMessage('Request removed');
      setIsButtonClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-lg p-4 hover:bg-gray-100">
      <div className="avatar">
        <div className="skeleton w-16 rounded-full">
          <img src={friendRequest.profilePicture} />
        </div>
      </div>
      <div className={`w-full ${setIsButtonClicked ? '' : 'space-y-2'}`}>
        <div className="text-lg font-semibold">
          {friendRequest.firstName} {friendRequest.lastName}
        </div>
        <div className="flex flex-wrap items-center justify-between space-x-2 space-y-2">
          {isButtonClicked ? (
            <div>{actionMessage}</div>
          ) : (
            <>
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

              {/* Button group */}
              <div className="space-x-2">
                <button
                  onClick={handleConfirm}
                  className={`btn btn-primary btn-sm ${!isAddFriend ? 'w-20' : ''}`}
                >
                  Confirm
                </button>
                <button onClick={handleDelete} className="btn btn-sm w-20">
                  Delete
                </button>
              </div>
              {/* Button group */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default FriendRequestCard;
