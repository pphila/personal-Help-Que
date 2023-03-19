import React from "react";
import HelpQuestionOne from "./HelpQuestionOne";
import HelpQuestionTwo from "./HelpQuestionTwo";
import HelpQuestionThree from "./HelpQuestionThree";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";

class TicketControl extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      helpQuestionOne: false,
      helpQuestionTwo: false,
      helpQuestionThree: false,
      mainTicketList: [],
      selectedTicket: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
  if (this.state.selectedTicket != null){
    this.setState({
      formVisibleOnPage: false,
      selectedTicket: null
    });
  } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleQ1Click = () => {
    this.setState(prevState => ({
      helpQuestionOne: !prevState.helpQuestionOne
    }));
  }

  handleQ2Click = () => {
    this.setState(prevState => ({
      helpQuestionTwo: !prevState.helpQuestionTwo
    }));
  }

  handleQ3Click = () => {
    this.setState(prevState => ({
      helpQuestionThree: !prevState.helpQuestionThree
    }));
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({
      mainTicketList: newMainTicketList,
      formVisibleOnPage: false 
    });
  }

  handleFormReset = () => {
    this.setState({
      formVisibleOnPage: false,
      helpQuestionOne: false,
      helpQuestionTwo: false,
      helpQuestionThree: false
    })
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeleteTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    let button = null;
    let buttonNo = null;

    const buttonStyles = {
      padding: '50px',
      margin: '200px',
      alignElements: 'center'
    }
    
    if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeleteTicket} />
      buttonText = "Return To Ticket List";
      button = <button onClick={this.handleClick}>{buttonText}</button>
    } else if (this.state.formVisibleOnPage) {
        
      if (!this.state.helpQuestionOne) {
          currentlyVisibleState = <HelpQuestionOne />;
          buttonText = "Yes";
          button = <button onClick={this.handleQ1Click}>{buttonText}</button>;
          buttonNo = <button onClick={this.handleFormReset}>No</button>;
        } else if (!this.state.helpQuestionTwo) {
          currentlyVisibleState = <HelpQuestionTwo />;
          buttonText = "Yes";
          button = <button onClick={this.handleQ2Click}>{buttonText}</button>;
          buttonNo = <button onClick={this.handleFormReset}>No</button>;
        } else if (!this.state.helpQuestionThree) {
          currentlyVisibleState = <HelpQuestionThree />;
          buttonText = "Yes";
          button = <button onClick={this.handleQ3Click}>{buttonText}</button>;
          buttonNo = <button onClick={this.handleFormReset}>No</button>;
        } else {
          currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
          buttonText = "Return to Ticket List";
          button = <button onClick={this.handleFormReset}>{buttonText}</button>;
        }
    } else {
        currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
        buttonText = "Add Ticket";
        button = <button onClick={this.handleClick}>{buttonText}</button>
    }

    return (
      <React.Fragment>
        <div style={buttonStyles}>
          {currentlyVisibleState}
          {button}
          <br />
          {buttonNo}
        </div>
      </React.Fragment>
    );
  }

}

export default TicketControl;