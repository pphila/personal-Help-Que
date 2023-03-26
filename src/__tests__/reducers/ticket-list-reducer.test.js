import ticketListReducer from "../../reducers/ticket-list-reducer";

describe('ticketListReducer', () => {
  
  let action;
  const ticketData = {
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux actio is now working correctly',
    id: 1
  };
  
  test('Should return default state if there is no action type passed into reducer', () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
  });

  test('Should seuccessfully add new ticket date to mainTickelist', ()=> {
    const { names, location, issue, id } = ticketData;
    action = {
      type: "ADD_TICKET",
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  });
  
});