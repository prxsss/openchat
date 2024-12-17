import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useFriendStore } from '../stores/friend';
import { useChatStore } from '../stores/chat';

const useListenUnfriend = () => {
  const { socket } = useSocketContext();
  const friends = useFriendStore((state) => state.friends);
  const setFriends = useFriendStore((state) => state.setFriends);
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);

  useEffect(() => {
    socket?.on('friendRemoved', (friend) => {
      setFriends(friends.filter((f) => f._id !== friend._id));
      setChats(chats.filter((c) => c.participants[0]._id !== friend._id));
    });
  }, [chats, friends, setChats, setFriends, socket]);
};
export default useListenUnfriend;
