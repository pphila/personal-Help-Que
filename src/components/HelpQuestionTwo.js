import React from 'react';

function HelpQuestionTwo(props){
  const formStyling = {
    padding: '50px',
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: 'center'
  }
  
  return(
    <React.Fragment>
      <div style={formStyling}>
        <h3>Have you asked another pair for help?</h3>
      </div>
    </React.Fragment>
  )
}

export default HelpQuestionTwo;