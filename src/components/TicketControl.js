import React from "react";
import * as a from './../actions';
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

class TicketControl extends React.Component{

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // formVisibleOnPage: false,
      // mainTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapseWaitTime(),
      1000
    )
  }

  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount() {
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapseWaitTime = () => {
    console.log("tick");
  }

  handleClick = () => {
  if (this.state.selectedTicket != null){
    this.setState({
      selectedTicket: null,
      editing: false
    });
  } else {
      const { dispatch } = this.props; // refactored with actions
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.addTicket(newTicket); // refactored with actions
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
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
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeleteTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
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
    const action = a.addTicket(ticketToEdit); // Refactored with actions
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

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
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail 
                                ticket = {this.state.selectedTicket} 
                                onClickingDelete = {this.handleDeleteTicket} 
                                onClickingEdit = {this.handleEditClick} />
      buttonText = "Return To Ticket List";
    } else if (this.state.formVisibleOnPage) {
          currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
          buttonText = "Return to Ticket List";
    } else {
        currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
        buttonText = "Add Ticket";
    }

    return (
      <React.Fragment>
        <div style={buttonStyles}>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </div>
      </React.Fragment>
    );
  }

}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    mainTicketList: state
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;