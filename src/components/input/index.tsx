import { useHaptics } from '@/src/hooks';
import { useTheme } from '@/src/hooks/useTheme';
import { m } from '@/src/utils/metrics';
import { Feather, FontAwesome5, Octicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { debounce } from "lodash";
import React, { useEffect, useState } from 'react';
import { Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeInDown, ZoomIn
} from 'react-native-reanimated';
import { strings } from './constants';
import { useThemedStyles } from './styles';

interface InputProps {
    value?: string;
    placeHolder?: string;
    isAdvisoUI?: boolean;
    isChatUI?: boolean;
    onEnter: (text: string) => void;
    fontSize?: number;
}

const Input: React.FC<InputProps> = ({ value = '', placeHolder = strings.placeHolder, isAdvisoUI = false, isChatUI = false, onEnter, fontSize = m(16) }) => {
    const styles = useThemedStyles();
    const colors = useTheme();
    const [text, setText] = useState(value);
    const { selection } = useHaptics();
    const [key, setKey] = useState(0);
    const [visibleText, setVisibleText] = useState('');
    const typingSpeed = 30;

    useEffect(() => {
        if (!isAdvisoUI) {
            return
        }
        const textToAnimate = value || placeHolder;
        setText("")
        setVisibleText("");
        let currentIndex = 0;
        const chars = [...textToAnimate];
        let interval: ReturnType<typeof setInterval>;

        interval = setInterval(() => {
            setVisibleText((prev) => {
                const nextChar = chars[currentIndex];
                currentIndex++;

                if (currentIndex >= chars.length) {
                    clearInterval(interval);
                }

                return prev + (nextChar ?? "");
            });
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [value, placeHolder, typingSpeed]);

    const debouncedSearch = React.useMemo(
        () => debounce((query: string) => {
            onEnter(query.trim().toLowerCase());
        }, 300),
        [onEnter]
    );

    React.useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleChange = (value: string) => {
        setText(value);
        if (value.trim().length === 0) {
            setVisibleText("");
            !isChatUI && onEnter('');
        } else {
            (!isChatUI && !isAdvisoUI) && debouncedSearch(value);
        }
    };

    const handleSend = () => {
        setKey(prev => prev + 1);
        if (text.trim().length > 0) {
            selection();
            onEnter(text.trim());
            isChatUI && setText('');
            (!isChatUI && !isAdvisoUI) && Keyboard.dismiss()
        }
    };

    const handleFocus = () => {

    };

    const handleBlur = () => {

    };

    return (
        <View style={[styles.wrapper]}>
            <Animated.View
                entering={FadeInDown.duration(300)} style={[styles.container]}>
                <BlurView intensity={40} tint='extraLight' style={styles.blur}>
                    <Octicons name="search" size={m(20)} color={colors.text} />
                    <TextInput
                        placeholder={isAdvisoUI ? visibleText || placeHolder : placeHolder}
                        placeholderTextColor={colors.black_7}
                        style={[styles.input, { fontSize: fontSize }]}
                        value={text}
                        onChangeText={handleChange}
                        onSubmitEditing={handleSend}
                        returnKeyType="send"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    //multiline
                    />
                    {isChatUI &&
                        <TouchableOpacity
                            onPress={handleSend}
                            style={styles.sendButton}
                        >
                            <Animated.View
                                key={`send-icon-${key}`}
                                entering={ZoomIn.duration(250)}
                            >
                                <Feather name="send" size={m(20)} color={colors.text} />
                            </Animated.View>
                        </TouchableOpacity>
                    }
                    {isAdvisoUI &&
                        <TouchableOpacity
                            onPress={handleSend}
                            style={styles.sendButton}
                        >
                            <Animated.View
                                key={`send-icon-${key}`}
                                entering={ZoomIn.duration(250)}
                            >
                                <FontAwesome5 name="brain" size={m(20)} color={colors.appSecondary} />
                            </Animated.View>
                        </TouchableOpacity>
                    }

                </BlurView>
            </Animated.View>
        </View>
    );
};

export default Input;
