import React from "react";
import PropTypes from 'prop-types';

export default function ToggleTheme(props) {
  const { toggleTheme } = props;
  
  return (
    <>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <hr/>
    </>
  )
}

ToggleTheme.propTypes = {
  toggleTheme: PropTypes.func
}