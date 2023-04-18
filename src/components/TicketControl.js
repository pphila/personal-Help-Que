import React, { useEffect, useState } from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { db, auth } from './../firebase.js'
import { collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

function TicketControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "tickets"),
      (collectionSnapshot) => {
        const tickets = [];
        collectionSnapshot.forEach((doc) => {
          tickets.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setMainTicketList(tickets);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  const handleClick = () => {
  if (selectedTicket != null){
    setFormVisibleOnPage(false); //new code
    setSelectedTicket(null);
    setEditing(false);
  } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewTicketToList = async (newTicketData) => {
    await addDoc(collection(db, "tickets"), newTicketData)
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedTicket = (id) => {
    const selection = mainTicketList.filter(ticket => ticket.id === id)[0];
    setSelectedTicket(selection);
  }

  const handleDeleteTicket = async (id) => {
    await deleteDoc(doc(db, "tickets", id));
    setSelectedTicket(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingTicketInList = async (ticketToEdit) => {
    await updateDoc(doc(db, "tickets", ticketToEdit.id), ticketToEdit);
    setEditing(false);
    setSelectedTicket(null);
  }

  const buttonStyles = {
      padding: '50px',
      margin: '200px',
      alignElements: 'center'
  }

  if (auth.currentUser == null){
    return(
      <>
        <h1>You must be signed in to access the queue</h1>
      </>
    )
  } else if (auth.currentUser !=null){
    let currentlyVisibleState = null;
    let buttonText = null ;
  
    if(error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (editing){
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
          {error ? null : <button onClick={handleClick}>{buttonText}</button>}
        </div>
      </React.Fragment>
    );
  }
}

export default TicketControl;