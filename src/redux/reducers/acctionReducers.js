const initialState = {
  user_id: false,
  user_infro: [],

};
const acctionReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user_id: action.payload,
      };
    case 'LOGOUT':
        return {
          ...state,
          user_id: action.payload,
        };
    case 'UPDATE_ID':
      return {
        ...state,
        user_id: action.payload,
      };

    default:
      return state;
  }
};

export default acctionReducers;
