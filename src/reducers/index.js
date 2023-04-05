import formVisibleReducer from "./form-visible-reducer";
import ticketListReducer from "./ticket-list-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  formVisibleReducer: formVisibleReducer,
  mainTicketList: ticketListReducer
})

export default rootReducer;