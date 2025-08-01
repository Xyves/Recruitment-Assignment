/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { ThemeColors } from "@/types/ThemeColors";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors: Record<"light" | "dark", ThemeColors> = {
  light: {
    primary: "#0070ff",
    secondary: "#4688eb",
    accent: "#ffaa2a",
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: "#3399ff",
    secondary: "#5caeff",
    accent: "#ffcc66",
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
