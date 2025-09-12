import { useContext } from "react";
import { ThemeContext } from "../components/themeProvider";

export const useTheme = () => {
  return useContext(ThemeContext);
};
