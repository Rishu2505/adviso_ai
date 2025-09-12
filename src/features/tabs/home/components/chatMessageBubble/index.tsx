import { IMAGES, SVGIcons } from '@/src/assets';
import { useClipboard, useHaptics, useShare } from '@/src/hooks';
import { useTheme } from '@/src/hooks/useTheme';
import { HIT_SLOP } from '@/src/utils/helper';
import { h, v } from '@/src/utils/metrics';
import { Entypo, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeIn,
    FadeInUp,
    LinearTransition
} from 'react-native-reanimated';
import { TypingDots } from '..';
import { strings } from './constants';
import { useThemedStyles } from './styles';

interface ChatMessageProps {
    message: string;
    isSender?: boolean;
    isLoading?: boolean;
    onRegenerate?: () => void;
    onTypingComplete?: () => void;
    isLastAIMessage?: boolean;
    index: number;
}

const ChatMessageBubble: React.FC<ChatMessageProps> = ({
    message,
    isSender = false,
    isLoading = false,
    onRegenerate,
    isLastAIMessage = false,
    index,
    onTypingComplete,
}) => {
    const { copyToClipboard } = useClipboard();
    const { share } = useShare();
    const { selection } = useHaptics();
    const [visibleText, setVisibleText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const typingSpeed = 10;
    const styles = useThemedStyles()
    const colors = useTheme()


    useEffect(() => {
        if (!isLoading && !isSender && message) {
            setVisibleText("");
            setIsTypingComplete(false);

            let currentIndex = 0;
            const chars = [...message];

            let interval: ReturnType<typeof setInterval>;
            const delayTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {
                interval = setInterval(() => {
                    setVisibleText((prev) => {
                        const nextChar = chars[currentIndex];
                        currentIndex++;
                        if (currentIndex >= chars.length) {
                            clearInterval(interval);
                            setIsTypingComplete(true);

                        }
                        return prev + (nextChar ?? "");
                    });
                }, typingSpeed);
            }, 0);

            return () => {
                clearTimeout(delayTimeout);
                clearInterval(interval);
            };
        }
    }, [message, isLoading, isSender]);


    useEffect(() => {
        if (isTypingComplete) {
            onTypingComplete?.();
        }
    }, [isTypingComplete]);


    const copyAImessageToClipboard = (content: string) => () => {
        selection()
        copyToClipboard(content)
    }

    const shareIntent = (content: string) => () => {
        selection()
        share('Canvas AI', content, 'https://canvasx.ai/')
    }

    return (
        <View style={styles.messageContainer}>
            {/* === SENDER === */}
            {isSender && (
                <Animated.View
                    entering={FadeInUp.delay(index * 100).duration(500)}
                    style={styles.senderRow}
                >
                    <BlurView intensity={70} tint='light' style={[styles.blurredSenderContainer, { alignItems: message?.length >= 100 ? 'flex-start' : 'center' }]}>
                        <SVGIcons.USER height={v(32)} width={h(32)} />
                        <Text style={styles.promptText}>{message?.trim()}</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity accessible={true}
                            accessibilityLabel="Edit prompt clicked"
                            accessibilityHint={"Edit prompt"}
                            accessibilityRole="button" hitSlop={HIT_SLOP.small} onPress={() => selection()}>
                            <Feather name="edit" size={v(15)} color={colors.appBlack} />
                        </TouchableOpacity>
                    </BlurView>
                </Animated.View>
            )}

            {/* === AI RESPONSE === */}
            {!isSender && (
                <>
                    <Animated.View
                        entering={FadeInUp.delay(index * 100).duration(500)}
                        layout={LinearTransition.springify().damping(15).stiffness(90)}
                        style={styles.aiContainer}
                    >
                        <BlurView intensity={70} tint='light' style={styles.blurredAIContainer}>
                            <View style={styles.aiHeader}>
                                <Image source={IMAGES.LOGO} style={styles.aiLogo} />
                                {isLoading && <TypingDots />
                                }
                                <View style={{ flex: 1 }} />
                                <TouchableOpacity accessible={true}
                                    accessibilityLabel="Copy AI response"
                                    accessibilityHint={"Copy"}
                                    accessibilityRole="button" hitSlop={HIT_SLOP.small} onPress={copyAImessageToClipboard(visibleText)}>
                                    <Feather name="copy" size={v(15)} color={colors.appBlack} />
                                </TouchableOpacity>
                                <TouchableOpacity accessible={true}
                                    accessibilityLabel="Share AI response"
                                    accessibilityHint={"Sharing Sheet"}
                                    accessibilityRole="button" hitSlop={HIT_SLOP.small} onPress={shareIntent(visibleText)} style={styles.margin}>
                                    <Entypo name="share" size={v(16)} color={colors.appBlack} />
                                </TouchableOpacity>
                            </View>

                            <Animated.View style={styles.responseBox}>
                                {isLoading ? (
                                    null
                                ) : (
                                    visibleText && visibleText?.length > 0 && <Text style={styles.responseText}>{visibleText?.trim()}</Text>
                                )}
                            </Animated.View>
                        </BlurView>
                    </Animated.View>

                    {!isLoading && isLastAIMessage && isTypingComplete && (
                        <Animated.View
                            entering={FadeIn.delay(index * 100 + 100).duration(500)}
                            style={styles.regenerateContainer}
                        >
                            <TouchableOpacity accessible={true}
                                accessibilityLabel="Regenerate response clicked"
                                accessibilityHint={"Regenerate AI response"}
                                accessibilityRole="button" onPress={() => {
                                    setVisibleText('');
                                    onRegenerate?.();
                                }} style={styles.regenerateButton}>
                                <BlurView intensity={30} tint='extraLight' style={styles.blurContainer}>
                                    <Feather name="refresh-ccw" size={v(15)} color={colors.appBlack} />
                                    <Text style={styles.regenerateText}>{strings.regenerateResponse}</Text>
                                </BlurView>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                </>
            )}
        </View>
    );
};

export default ChatMessageBubble
