import React from "react";
import HelpQuestionOne from "./HelpQuestionOne";
import HelpQuestionTwo from "./HelpQuestionTwo";
import HelpQuestionThree from "./HelpQuestionThree";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { connect } from 'react-redux';

class TicketControl extends React.Component{

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      formVisibleOnPage: false,
      // mainTicketList: [],
      selectedTicket: null,
      editing: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
  if (this.state.selectedTicket != null){
    this.setState({
      formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    });
  } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue} = newTicket;
    const action = {
      type: "ADD_TICKET",
      id: id,
      names: names,
      location: location,
      issue: issue
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false});
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
    const { dispatch } = this.props;
    const action = {
      type: "DELETE_TICKET",
      id: id
    }
    dispatch(action);
    this.setState({
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicketToEdit;
    const action = {
      type: "ADD_TICKET",
      id: id,
      names: names,
      location, location,
      issue: issue
    }
    dispatch(action);
    this.setState({
      editing: false,
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
    
    if (this.state.editing){
      currentlyVisibleState = <EditTicketForm 
                                ticket = {this.state.selectedTicket}
                                onEditTicket = {this.handleEditingTicketInList} />
      buttonText= "Return to Ticket List";
      button = <button onClick={this.handleClick}>{buttonText}</button>
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail 
                                ticket = {this.state.selectedTicket} 
                                onClickingDelete = {this.handleDeleteTicket} 
                                onClickingEdit = {this.handleEditClick} />
      buttonText = "Return To Ticket List";
      button = <button onClick={this.handleClick}>{buttonText}</button>
    } else if (this.state.formVisibleOnPage) {
          currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
          buttonText = "Return to Ticket List";
          button = <button onClick={this.handleFormReset}>{buttonText}</button>;
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

TicketControl = connect()(TicketControl);

export default TicketControl;