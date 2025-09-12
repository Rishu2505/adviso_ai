import { HIT_SLOP } from "@/src/utils/helper";
import { h, m } from "@/src/utils/metrics";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { useThemedStyles } from "./styles";

interface ScreenHeaderProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;

  // Left
  showLeftIcon?: boolean;
  leftIconName?: keyof typeof Feather.glyphMap;
  onLeftPress?: () => void;

  // Right Icon
  showRightIcon?: boolean;
  rightIconName?: keyof typeof Feather.glyphMap;
  onRightPress?: () => void;

  // Right User Image
  showUserImage?: boolean;
  userImage?: string;
  onUserPress?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  containerStyle,
  titleStyle,

  showLeftIcon = false,
  leftIconName = "arrow-left",
  onLeftPress,

  showRightIcon = false,
  rightIconName = "more-horizontal",
  onRightPress,

  showUserImage = false,
  userImage,
  onUserPress,
}) => {
  const styles = useThemedStyles();

  return (
    <View style={[styles.container, containerStyle]}>

      {showLeftIcon && (
        <Pressable onPress={onLeftPress} hitSlop={HIT_SLOP.small}>
          <BlurView intensity={50} tint="extraLight" style={styles.leftIconContainer}>
            <Feather name={leftIconName} size={m(22)} color={styles.icon.color} />
          </BlurView>
        </Pressable>
      )}


      <Text
        style={[
          styles.title,
          !showLeftIcon && { textAlign: "left", flex: 1 },
          titleStyle,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>


      <View style={styles.rightRow}>
        {showRightIcon ? (
          <Pressable onPress={onRightPress} hitSlop={HIT_SLOP.small} style={{ marginRight: showUserImage && userImage ? h(12) : 0 }}>
            <BlurView intensity={50} tint="extraLight" style={styles.rightIconContainer}>
              <Feather name={rightIconName} size={m(22)} color={styles.icon.color} />
            </BlurView>
          </Pressable>
        )
          :
          <View style={{ marginRight: showUserImage && userImage ? h(12) : 0 }}>
            <BlurView intensity={50} tint="extraLight" style={[styles.rightIconContainer,{opacity:0}]}></BlurView>
          </View>
        }
        {showUserImage && userImage && (
          <Pressable onPress={onUserPress}>
            <BlurView intensity={50} tint="extraLight" style={styles.userImageContainer}>
              <Image source={{ uri: userImage }} style={styles.userImage} />
            </BlurView>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default ScreenHeader;
