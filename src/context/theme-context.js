import React from 'react';

export const themes = {
  light: {
    backgroundColor: "AntiqueWhite",
    textColor: "DarkSlateGray",
    buttonBackground: "Lavender",
    inputBackground: "Gainsboro"
  },
  dark: {
    backgroundColor: "DarkSlateGray",
    textColor: "AntiqueWhite",
    buttonBackground: "#232b3c",
    inputBackground: "45516d"
  }
}

export const ThemeContext = React.createContext();