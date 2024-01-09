// src/redux/reducers/reducers.js
const initialState = {
  modalProduct: false,
  product_id: 0,
  searchList: [],
  searchValue: '',
  isSearch: false,
  heartLoveList: [],
  heartLoveListAPI: [],
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modalProduct: true,
        product_id: action.payload,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalProduct: false,

      };
    case 'SEARCH':
      return {
        ...state,
        searchList: action.payload
      };
    case 'SAVE_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload,
      };
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        isSearch: true,
      };
      case 'ADD_TO_HEART':
        const newItem = action.payload;
        const existingItem = state.heartLoveList.find(item => item.id === newItem.id);
        if (existingItem) {
          return state; 
        } else {
          return {
            ...state,
            heartLoveList: [...state.heartLoveList, newItem],
          };
        }
      
    case 'DELETE_TO_HEART':
      return {
        ...state,
        heartLoveList: state.heartLoveList.filter((item, index) => index !== action.payload),
      };
    case 'DEAFULHEART':
      return {
        ...state,
        heartLoveList: [],
      };
    case 'DEAFULHEARTAPI':
      return {
        ...state,
        heartLoveListAPI: [],
      };
    case 'LISTHEARTAPI':
      return {
        ...state,
        heartLoveListAPI:action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
