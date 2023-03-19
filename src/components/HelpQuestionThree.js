import React from 'react';

function HelpQuestionThree(props){
  const formStyling = {
    padding: '50px',
    marginLeft: "auto",
    marginRight: "auto"
  }
  
  return(
    <React.Fragment>
      <div style={formStyling}>
        <h3>Have you spent 15 minutes going through the problem documentation every step?</h3>
      </div>
    </React.Fragment>
  )
}

export default HelpQuestionThree;