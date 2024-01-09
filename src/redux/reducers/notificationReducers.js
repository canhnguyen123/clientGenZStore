const initialState = {
  listNotification: [],
};
const acctionReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GETLISTNOTIFICATION':
      return {
        ...state,
        listNotification: action.payload,
      };
    
    default:
      return state;
  }
};

export default acctionReducers;
