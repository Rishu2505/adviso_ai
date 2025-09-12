import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Message = {
  id: string;
  text: string;
  isSender: boolean;
  isLoading?: boolean;
};

type ChatStore = {
  chats: Record<string, Message[]>;
  setMessages: (agentId: string, messages: Message[]) => void;
  getMessages: (agentId: string) => Message[];
  clearMessages: (agentId: string) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: {},

      setMessages: (agentId, messages) => {
        set((state) => ({
          chats: {
            ...state.chats,
            [agentId]: messages,
          },
        }));
      },

      getMessages: (agentId) => {
        return get().chats[agentId] || [];
      },

      clearMessages: (agentId) => {
        set((state) => {
          const updated = { ...state.chats };
          delete updated[agentId];
          return { chats: updated };
        });
      },
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
