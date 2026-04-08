import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useCallback, useMemo } from "react";

import { ColorModeContextProvider, type ColorMode } from "../../contexts/ColorModeContext";
import { getDesignTokens } from "./theme";

type Props = { children: React.ReactNode };

const CustomThemeProvider = ({ children }: Props) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>("light");

  const theme = React.useMemo(() => createTheme(getDesignTokens(colorMode)), [colorMode]);
  const toggleColorMode = useCallback(() => {
    setColorMode((s) => (s === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      colorMode,
      toggleColorMode
    }),
    [colorMode, toggleColorMode]
  );

  return (
    <ColorModeContextProvider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContextProvider>
  );
};

export default CustomThemeProvider;
