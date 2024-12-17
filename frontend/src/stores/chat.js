import { create } from 'zustand';

export const useChatStore = create((set) => ({
  chats: [],
  setChats: (chats) => set({ chats }),
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));
