import { Colors } from "@/src/theme/colors";
import React, { createContext } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext(Colors.light);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme(); // "light" | "dark"
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
