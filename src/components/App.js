import React from "react";
import Header from "./Header";
import TicketList from "./TicketList";

function App(){
  const name = "Thato";
  const name2 = "Haley";
  return (
    <React.Fragment>
      <Header />
      <h3>3a</h3>
      <TicketList/>
    </React.Fragment>
  );
}

export default App;
