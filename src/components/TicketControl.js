import React, { useState } from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";

function TicketControl() {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formVisibleOnPage: false,
  //     helpQuestionOne: false,
  //     helpQuestionTwo: false,
  //     helpQuestionThree: false,
  //     mainTicketList: [],
  //     selectedTicket: null,
  //     editing: false
  //   };
  //   this.handleClick = this.handleClick.bind(this);
  // }

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
  if (this.state.selectedTicket != null){
    setFormVisibleOnPage(false); //new code
    setSelectedTicket(null);
    setEditing(false);
  } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = mainTicketList.concat(newTicket);
    setMainTicketList(newMainTicketList);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedTicket = (id) => {
    const selection = mainTicketList.filter(ticket => ticket.id === id)[0];
    setSelectedTicket(selection);
  }

  const handleDeleteTicket = (id) => {
    const newMainTicketList = mainTicketList.filter(ticket => ticket.id !== id);
    setMainTicketList(newMainTicketList);
    setSelectedTicket(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = mainTicketList
      .filter(ticket => ticket.id !== selectedTicket.id)
      .concat(ticketToEdit);
    setMainTicketList(editedMainTicketList);
    setEditing(false);
    setSelectedTicket(null);
  }

  
  let currentlyVisibleState = null;
  let buttonText = null;

  const buttonStyles = {
      padding: '50px',
      margin: '200px',
      alignElements: 'center'
  }
    
  if (editing){
      currentlyVisibleState = <EditTicketForm 
                                ticket = {selectedTicket}
                                onEditTicket = {handleEditingTicketInList} />
      buttonText= "Return to Ticket List";
  } else if (selectedTicket != null) {
      currentlyVisibleState = <TicketDetail 
                                ticket = {selectedTicket} 
                                onClickingDelete = {handleDeleteTicket} 
                                onClickingEdit = {handleEditClick} />
      buttonText = "Return To Ticket List";
  } else if (formVisibleOnPage) {
        currentlyVisibleState = 
        <NewTicketForm 
          onNewTicketCreation={handleAddingNewTicketToList} />;
        buttonText = "Return to Ticket List";
  } else {
        currentlyVisibleState = 
        <TicketList 
          ticketList={mainTicketList} 
          onTicketSelection={handleChangingSelectedTicket} />;
        buttonText = "Add Ticket";
  }

    return (
      <React.Fragment>
        <div style={buttonStyles}>
          {currentlyVisibleState}
          <button onClick={handleClick}>{buttonText}</button>
        </div>
      </React.Fragment>
    );

}

export default TicketControl;