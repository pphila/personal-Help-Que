import React from 'react';

function HelpQuestionOne(props){
  const formStyling = {
    padding: '50px',
    marginLeft: "auto",
    marginRight: "auto"
  }
  return(
    <React.Fragment>
      <div style={formStyling}>
        <h3>Have you gone through all the steps on the Learn How to Program debugging lessons?</h3>
      </div>
    </React.Fragment>
  )
}

export default HelpQuestionOne;