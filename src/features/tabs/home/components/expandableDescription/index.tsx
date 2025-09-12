import { HIT_SLOP } from "@/src/utils/helper";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
  Easing,
  FadeInLeft,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { strings } from "./constants";
import { useThemedStyles } from "./styles";

const MAX_LENGTH = 75;

export default function ExpandableDescription({
  description,
  expanded,
  onToggleExpand,
  index,
}: {
  description: string;
  expanded: boolean;
  onToggleExpand: () => void;
  index: number
}) {
  const styles = useThemedStyles();
  const shouldTruncate = description.length > MAX_LENGTH;
  const preview = description.slice(0, MAX_LENGTH);
  const rest = description.slice(MAX_LENGTH);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(expanded ? 1 : 0, {
      duration: 1500,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  return (
    <Animated.View layout={LinearTransition.springify().damping(15).stiffness(90)} style={styles.storeDescContainer}>
      <Animated.Text entering={FadeInLeft.delay(index * 200).duration(800)} style={styles.storeDesc}>
        {shouldTruncate && !expanded ? (
          <>
            {preview}...
            {!expanded && shouldTruncate && (
              <Animated.View exiting={FadeOut.duration(250)}>
                <TouchableOpacity
                  onPress={onToggleExpand}
                  hitSlop={HIT_SLOP.small}
                >
                  <Text style={styles.more}>{strings.more}</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </>
        ) : (
          <>
            {preview}
            {shouldTruncate && (
              <Animated.Text style={[styles.storeDesc, animatedStyle]}>
                {rest}
              </Animated.Text>
            )}
          </>
        )}
      </Animated.Text>
    </Animated.View>
  );
}
