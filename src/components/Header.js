import React from "react";
import ticketsImage from "./../img/tickets-image.png";
import { Link } from "react-router-dom";

function Header() {
  const headerStyling = {
    textAlign: "center",
    paddingTop: "50px"
  }
  
  return (
    <React.Fragment>
      <div style={headerStyling}>
        <h1>Help Queue</h1>
        <ul>
          <li>
            <Link to="/">Homes</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
        <img src={ticketsImage} alt="An image of tickets"/>
      </div>
    </React.Fragment>
  );
}

export default Header;