import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { serverTimestamp } from "firebase/firestore";

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
      timeOpen: serverTimestamp()
    });
  }
  
  return(
    <React.Fragment>
      <div style={formStyling}>
        <ReusableForm
          formSubmissionHandler={handleNewTicketFormSubmission}
          buttonText="Help!" />
      </div>
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;