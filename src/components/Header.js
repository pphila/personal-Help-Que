import React from "react";
import ticketsImage from "./../img/tickets-image.png";

function Header() {
  const headerStyling = {
    textAlign: "center",
    paddingTop: "50px"
  }
  
  return (
    <React.Fragment>
      <div style={headerStyling}>
        <h1>Help Queue</h1>
        <img src={ticketsImage} alt="An image of tickets"/>
      </div>
    </React.Fragment>
  );
}

export default Header;