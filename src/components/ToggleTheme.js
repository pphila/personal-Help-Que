import React from "react";
import PropTypes from 'prop-types';

export default function ToggleTheme(props) {
  const { theme, toggleTheme } = props;
  
  const styles = {
    backgroundColor: theme.buttonBackground,
    color: theme.textColor
  }

  return (
    <>
      <button styles={styles} onClick={toggleTheme}>{theme.textColor === "AntiqueWhite" ? "toggle light theme" : "toggle dark theme"}</button>
      <hr/>
    </>
  )
}

ToggleTheme.propTypes = {
  toggleTheme: PropTypes.func
}