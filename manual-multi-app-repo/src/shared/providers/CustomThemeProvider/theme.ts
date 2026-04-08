import { alpha, type PaletteMode, type ThemeOptions } from "@mui/material";
import { red } from "@mui/material/colors";

import { brandColors, commonColors } from "./colors";

declare module "@mui/material/styles" {
  interface Palette {
    brand: typeof brandColors;
  }

  interface TypeBackground {
    dark: string;
    light: string;
  }
}

const IS_TEST_ENV = process.env.NODE_ENV === "test";

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          brand: brandColors,
          primary: {
            main: brandColors.saphire,
            dark: brandColors.saphire,
            light: brandColors.saphire,
            contrastText: brandColors.cloud
          },
          secondary: {
            main: brandColors.aquamarine,
            dark: brandColors.aquamarine,
            light: brandColors.aquamarine,
            contrastText: brandColors.peacock
          },
          background: {
            default: commonColors.white,
            paper: commonColors.white,
            dark: brandColors.peacock,
            light: commonColors.solitude
          },
          text: {
            primary: brandColors.obsidian,
            secondary: alpha(brandColors.obsidian, 0.6),
            disabled: alpha(brandColors.obsidian, 0.38)
          }
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#4384BF",
            light: "#266798",
            dark: "#12183E",
            contrastText: "#fff"
          },
          secondary: {
            main: "#e57373",
            light: "#ffa4a2",
            dark: "#af4448",
            contrastText: "rgba(0, 0, 0, 0.87)"
          },
          background: {
            default: "#052B4E",
            paper: "#021F3D"
          },
          text: {
            primary: "#fff",
            secondary: "#98ccfb"
          }
        })
  },
  shape: {
    borderRadius: 4
  },

  typography: {
    fontFamily: ["Aeonik", "sans-serif"].join(","),
    h6: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 700
    },
    h4: {
      fontWeight: 700
    },
    h3: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 700
    },
    h1: {
      fontWeight: 700
    },
    button: {
      textTransform: "none"
    }
  },
  // Some styling features are not supported by JSDOM, so omitting those
  components: !IS_TEST_ENV
    ? {
        MuiCssBaseline: {
          styleOverrides: `
        @font-face {
          font-family: 'Aeonik';
        
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
            font-family: 'Aeonik';
           
            font-weight: 300;
            font-style: italic;
            font-display: swap;
        }

        @font-face {
            font-family: 'Aeonik';
          
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'Aeonik';
          
            font-weight: normal;
            font-style: italic;
            font-display: swap;
        }

        @font-face {
            font-family: 'Aeonik';
         
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'Aeonik';
           
            font-weight: bold;
            font-style: italic;
            font-display: swap;
        }
      `
        },
        MuiAppBar: {
          styleOverrides: {
            colorDefault: `
          background-color: ${brandColors.peacock};
          color: ${commonColors.white};
        `,
            root: {
              borderRadius: "0px"
            }
          }
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: "12px"
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "12px"
            }
          }
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "12px 12px 0 0",
              borderColor: "transparent",
              ":has(.Mui-focused)": {
                borderColor: brandColors.saphire
              },
              ":has(.Mui-focused.Mui-error)": {
                borderColor: red[700]
              },
              ":has(.MuiInputBase-formControl:last-child)": {
                borderWidth: "1px 1px 0px 1px"
              }
            }
          }
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              paddingLeft: "5px",
              paddingRight: "5px",
              "&.Mui-focused": {
                transform: "translate(0, 3.5px) scale(0.75)"
              }
            }
          }
        },
        MuiInput: {
          styleOverrides: {
            root: {
              paddingLeft: "5px",
              paddingRight: "5px"
            }
          }
        },
        MuiFormHelperText: {
          styleOverrides: {
            root: {
              paddingLeft: "5px",
              paddingRight: "5px"
            }
          }
        },
        MuiCardHeader: {
          defaultProps: {
            slotProps: {
              title: { variant: "h5" },
              subheader: { variant: "body2" }
            }
          }
        }
      }
    : {}
});
