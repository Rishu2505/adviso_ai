import { useCallback } from "react";
import { Message, useChatStore } from "../stores/useChatStore";

export const useAIChat = (agentId: string) => {
  const setMessages = useChatStore((state) => state.setMessages);
  const getMessages = useChatStore((state) => state.getMessages);
  const clearMessages = useChatStore((state) => state.clearMessages);

  const save = useCallback(
    (messages: Message[]) => {
      setMessages(agentId, messages);
    },
    [agentId, setMessages]
  );

  const get = useCallback((): Message[] => {
    return getMessages(agentId);
  }, [agentId, getMessages]);

  const clear = useCallback(() => {
    clearMessages(agentId);
  }, [agentId, clearMessages]);

  return {
    persistedmessages: get(),
    save,
    clear,
  };
};
