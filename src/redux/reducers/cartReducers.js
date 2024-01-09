const initialState = {
  card_id: 0,
  list_cart: [],
  card_id:0,
};
const acctionReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GETLISTCART':
      return {
        ...state,
        list_cart: action.payload,
      };
   default:
      return state;
  }
};

export default acctionReducers;
