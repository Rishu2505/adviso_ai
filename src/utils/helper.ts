import { Dimensions, Platform, StatusBar } from "react-native";
import normalize from "./metrics";

const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;
const STATUSBAR_IP14PRO_HEIGHT = 49;
const STATUSBAR_IP15PROMAX_HEIGHT = 50;
const STATUSBAR_IP16PRO_HEIGHT = 51;
const STATUSBAR_IP16PROMAX_HEIGHT = 52;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

const IP14PRO_WIDTH = 393;
const IP14PRO_HEIGHT = 852;

const IP14PROMAX_WIDTH = 430;
const IP14PROMAX_HEIGHT = 932;

const IP15PROMAX_WIDTH = 430;
const IP15PROMAX_HEIGHT = 932;

const IP16PRO_WIDTH = 402;
const IP16PRO_HEIGHT = 874;

const IP16PROMAX_WIDTH = 440;
const IP16PROMAX_HEIGHT = 956;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get("window");

let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;
let isIPhoneX_v = false;
let isIPhoneXMax_v = false;
let isIPhone12_v = false;
let isIPhone12Max_v = false;
let isIPhone14Pro_v = false;
let isIPhone14ProMax_v = false;
let isIPhone15ProMax_v = false;
let isIPhone16Pro_v = false;
let isIPhone16ProMax_v = false;
let isIPhoneWithMonobrow_v = false;
let isIPhoneWithDynamicIsland_v = false;

if (Platform.OS === "ios" && !Platform.isPad && !Platform.isTV) {
  if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhoneX_v = true;
    statusBarHeight = STATUSBAR_X_HEIGHT;
  } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhoneXMax_v = true;
    statusBarHeight = STATUSBAR_X_HEIGHT;
  } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhone12_v = true;
    statusBarHeight = STATUSBAR_IP12_HEIGHT;
  } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhone12Max_v = true;
    statusBarHeight = STATUSBAR_IP12MAX_HEIGHT;
  } else if (W_WIDTH === IP14PROMAX_WIDTH && W_HEIGHT === IP14PROMAX_HEIGHT) {
    isIPhoneWithDynamicIsland_v = true;
    isIPhone14ProMax_v = true;
    statusBarHeight = STATUSBAR_IP14PRO_HEIGHT;
  } else if (W_WIDTH === IP14PRO_WIDTH && W_HEIGHT === IP14PRO_HEIGHT) {
    isIPhoneWithDynamicIsland_v = true;
    isIPhone14Pro_v = true;
    statusBarHeight = STATUSBAR_IP14PRO_HEIGHT;
  } else if (W_WIDTH === IP15PROMAX_WIDTH && W_HEIGHT === IP15PROMAX_HEIGHT) {
    isIPhoneWithDynamicIsland_v = true;
    isIPhone15ProMax_v = true;
    statusBarHeight = STATUSBAR_IP15PROMAX_HEIGHT;
  } else if (W_WIDTH === IP16PRO_WIDTH && W_HEIGHT === IP16PRO_HEIGHT) {
    isIPhoneWithDynamicIsland_v = true;
    isIPhone16Pro_v = true;
    statusBarHeight = STATUSBAR_IP16PRO_HEIGHT;
  } else if (W_WIDTH === IP16PROMAX_WIDTH && W_HEIGHT === IP16PROMAX_HEIGHT) {
    isIPhoneWithDynamicIsland_v = true;
    isIPhone16ProMax_v = true;
    statusBarHeight = STATUSBAR_IP16PROMAX_HEIGHT;
  }
}

export const isIPhoneX = () => isIPhoneX_v;
export const isIPhoneXMax = () => isIPhoneXMax_v;
export const isIPhone12 = () => isIPhone12_v;
export const isIPhone12Max = () => isIPhone12Max_v;
export const isIPhone14Pro = () => isIPhone14Pro_v;
export const isIPhone14ProMax = () => isIPhone14ProMax_v;
export const isIPhone15ProMax = () => isIPhone15ProMax_v;
export const isIPhone16Pro = () => isIPhone16Pro_v;
export const isIPhone16ProMax = () => isIPhone16ProMax_v;
export const isIPhoneWithMonobrow = () => isIPhoneWithMonobrow_v;
export const isIPhoneWithDynamicIsland = () => isIPhoneWithDynamicIsland_v;

export function getStatusBarHeight(skipAndroid?: any) {
  return Platform.select({
    ios: statusBarHeight + normalize(10),
    android: skipAndroid ? 0 : (StatusBar.currentHeight ?? 0) + normalize(10),
    default: 0,
  });
}

export const HIT_SLOP = {
  tiny: { top: 5, bottom: 5, left: 5, right: 5 },
  small: { top: 10, bottom: 10, left: 10, right: 10 },
  large: { top: 20, bottom: 20, left: 20, right: 20 },
};

export function timeAgo(dateString: string): string {
  const now = new Date();
  const created = new Date(dateString);
  const seconds = Math.floor((now.getTime() - created.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  const suffixes: { [key: string]: string } = {
    year: "y",
    month: "m",
    week: "w",
    day: "d",
    hour: "h",
    minute: "m",
  };

  for (const key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) {
      return `${interval}${suffixes[key]}`;
    }
  }
  return "now";
}

export function uniqueByProductName<T extends { product_name: string }>(arr: T[]): T[] {
  const seen = new Set<string>();
  return arr.filter(item => {
    if (seen.has(item.product_name)) return false;
    seen.add(item.product_name);
    return true;
  });
}

export const truncateWithEllipsis = (text: string, maxLength: number): string => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
