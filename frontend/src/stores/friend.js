import { create } from 'zustand';

export const useFriendStore = create((set) => ({
  selectedFriend: null,
  setSelectedFriend: (friend) => {
    set({ selectedFriend: friend });
  },
  friends: [],
  setFriends: (friends) => set({ friends }),
  friendRequests: [],
  setFriendRequests: (friendRequests) => set({ friendRequests }),
}));
