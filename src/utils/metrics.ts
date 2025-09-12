import { Dimensions, PixelRatio, ScaledSize } from "react-native";

let { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base guideline (iPhone X)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

Dimensions.addEventListener("change", ({ window }: { window: ScaledSize }) => {
  SCREEN_WIDTH = window.width;
  SCREEN_HEIGHT = window.height;
});

const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const metrics = (
  size: number,
  based: "width" | "height" | "moderate" = "width"
) => {
  let newSize =
    based === "height"
      ? verticalScale(size)
      : based === "moderate"
      ? moderateScale(size)
      : scale(size);

  // clamp extremes
  if (SCREEN_WIDTH > 1000) newSize *= 1.2;
  if (SCREEN_WIDTH < 320) newSize *= 0.95;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// 🟢 Convenience helpers
export const h = (val: number) => metrics(val);
export const v = (val: number) => metrics(val, "height");
export const m = (val: number) => metrics(val, "moderate");

export default metrics;
