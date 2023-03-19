import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";

function NewTicketForm(props){
  const formStyling = {
    padding: '25px',
    textAlign: 'center'
  }
  function handleNewTicketFormSubmission(e) {
    e.preventDefault();
    props.onNewTicketCreation({
      names: e.target.names.value,
      location: e.target.location.value,
      issue: e.target.issue.value,
      id: v4()
    });
  }
  
  return(
    <React.Fragment>
      <div style={formStyling}>
        <form onSubmit={handleNewTicketFormSubmission}>
          <input
            type="text"
            name="names"
            placeholder="Pair Names" />
            <br/>
          <input
            type="text"
            name="location"
            placeholder="Location" />
            <br/>
          <textarea
            name="issue"
            placeholder="Describe your issue." />
          <button type="submit">Help!</button>
        </form>
      </div>
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;