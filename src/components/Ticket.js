import React from "react";
import PropTypes from "prop-types";

function Ticket(props){
  const ticketStyles = {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '360px'
  }
  return (
    <React.Fragment>
      <div style={ticketStyles}>
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
};

export default Ticket;

