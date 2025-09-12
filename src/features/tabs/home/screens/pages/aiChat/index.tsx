import { IMAGES } from '@/src/assets';
import { CustomScreenHeader, Input } from '@/src/components';
import { useAIChat, useAIResponse, useHaptics } from '@/src/hooks';
import { useGlobalThemedStyles } from '@/src/styles';
import { v } from '@/src/utils/metrics';
import { getRandomResponseByPrompt } from '@/src/utils/responseUtils';
import { FlashList } from '@shopify/flash-list';
import { ImageBackground } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  UIManager
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChatMessageBubble } from '../../../components';
import { strings } from './constants';
import { useThemedStyles } from './styles';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Message = {
  id: string;
  text: string;
  isSender: boolean;
  isLoading?: boolean;
};

export function AIChat() {
  const { item } = useLocalSearchParams<{ item: string }>();
  const parsedItem = item ? JSON.parse(item) : null;
  const prompt: string = parsedItem?.title || parsedItem?.product?.description || parsedItem?.text || parsedItem?.prompt || "";
  const { getResponse, } = useAIResponse();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlashList<Message>>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const { selection } = useHaptics();
  const { save } = useAIChat('ai-chat');
  const styles = useThemedStyles();
  const globalStyles = useGlobalThemedStyles();


  useEffect(() => {
    if (messages?.length > 0) {
      save(messages);
    }
  }, [messages, save]);

  const scrollToBottom = () => {
    if (messages.length === 0) return;
    requestAnimationFrame(() => {
      listRef.current?.scrollToIndex({
        index: messages.length - 1,
        animated: true,
      });
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isTypingComplete]);

  const generateResponse = async (text: string, replaceLast = false) => {
    setLoading(true);
    const typingId = `typing-${Date.now()}`;

    if (replaceLast) {

      setMessages(prev => {
        const reversed = [...prev].reverse();
        const index = reversed.findIndex(m => !m.isSender);
        if (index !== -1) {
          const actualIndex = prev.length - 1 - index;
          const newMessages = [...prev];
          newMessages[actualIndex] = {
            id: typingId,
            text: '',
            isSender: false,
            isLoading: true,
          };
          return newMessages;
        }
        return prev;
      });

    } else {
      setMessages(prev => [
        ...prev,
        { id: typingId, text: '', isSender: false, isLoading: true },
      ]);
    }
    const live_OPENAI_API = true;
    //scrollToBottom();
    if (!live_OPENAI_API) {
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    const response = !live_OPENAI_API ? await getRandomResponseByPrompt(text) : await getResponse(text);

    setMessages(prev => {
      const index = prev.findIndex(m => m.id === typingId);
      if (index === -1) return prev;

      const updated = [...prev];
      updated[index] = {
        id: `response-${Date.now()}`,
        text: response ?? 'Hang on — we’re resolving a temporary issue.',
        isSender: false,
      };
      return updated;
    });

    setLoading(false);
    selection()
    //scrollToBottom();
  };

  useEffect(() => {
    if (!prompt) return;

    const init = async () => {
      setLoading(true);
      const initial: Message[] = [
        {
          id: `prompt-${Date.now()}`,
          text: prompt,
          isSender: true,
        },
      ];
      setMessages(initial);
      await generateResponse(prompt);
    };

    init();
  }, [prompt]);

  const handleSend = (msg: string) => {
    const newId = `user-${Date.now()}`;
    setMessages(prev => [
      ...prev,
      {
        id: newId,
        text: msg,
        isSender: true,
      },
    ]);
    generateResponse(msg);
  };


  const handleRegenerate = () => {
    const lastUserPrompt = [...messages].reverse().find(m => m.isSender)?.text;
    if (lastUserPrompt) {
      selection()
      generateResponse(lastUserPrompt, true);
    }
  };

  const header_UIContainer = () => {
    return (
      <CustomScreenHeader
        title={strings.title}
        onLeftPress={() => router.back()}
        showLeftIcon
      />
    )
  }

  return (
    <ImageBackground contentFit={'cover'} source={IMAGES.BG} style={globalStyles.mainContainer}>
      {header_UIContainer()}
      <KeyboardAvoidingView
        style={styles.mainView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? -insets.bottom + v(40) : 0
        }
      >
        {messages?.length > 0 &&
          <FlashList
            ref={listRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
              const isLastAI =
                !item.isSender &&
                !item.isLoading &&
                !messages.slice(index + 1).some(m => !m.isSender);
              return (
                <ChatMessageBubble
                  message={item.text}
                  isSender={item.isSender}
                  isLoading={item.isLoading}
                  isLastAIMessage={isLastAI}
                  onRegenerate={isLastAI ? handleRegenerate : undefined}
                  onTypingComplete={() => setIsTypingComplete(!isTypingComplete)}
                  index={index}
                />
              );
            }}
            estimatedItemSize={100}
            contentContainerStyle={styles.chatList}
            showsVerticalScrollIndicator={false}
          />
        }
        <Input placeHolder={strings.placeholder} onEnter={handleSend} isChatUI={true} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
