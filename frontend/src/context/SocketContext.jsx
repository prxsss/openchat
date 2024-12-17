import { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import { useFriendStore } from '../stores/friend';

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const setFriendRequests = useFriendStore((state) => state.setFriendRequests);
  const setFriends = useFriendStore((state) => state.setFriends);

  useEffect(() => {
    if (authUser) {
      const socket = io('https://openchat-mwj5.onrender.com', {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      socket.on('getOnlineUsers', (users) => setOnlineUsers(users));
      socket.on('friendRequest', (sender) => {
        const friendRequests = useFriendStore.getState().friendRequests;

        setFriendRequests([...friendRequests, sender]);
        toast.info(`${sender.fullName} sent you a friend request.`);
      });
      socket.on('friendRequestAccepted', (receiver) => {
        const friends = useFriendStore.getState().friends;

        setFriends([...friends, receiver]);
        toast.info(`${receiver.fullName} accepted your friend request.`);
      });

      return () => {
        socket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
