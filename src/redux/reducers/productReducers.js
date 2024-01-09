const initialState = {
  productList: [],
  productAll: [],
  productListCase: [],
  productDeatil: [],
  listCmt: [],
  repLyId: null,
  repLyIdText: null,
  totalProductAll: 0,
  pageProductAll: 0,
  limitProductAll: 12,
};
const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIST_CMT':
      return {
        ...state,
        listCmt: action.payload,
      };
    case 'GET_LIST_PRODUCT':
      return {
        ...state,
        productList: action.payload,
      };
    case 'GET_LIST_PRODUCT_CASE':
      return {
        ...state,
        productListCase: action.payload,
      };
    case 'GET_PRODUCT_DEATIL':
      return {
        ...state,
        productDeatil: action.payload,
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        listCmt: [...state.listCmt, action.payload],
      };
    case 'UPDATE_REPLYID':
      return {
        ...state,
        repLyId: action.payload,
      };
    case 'UPDATE_REPLYACTIVE':
      return {
        ...state,
        repLyIdText: action.payload,
      };
    case 'PRODUCTLISTALL':
      return {
        ...state,
        productAll: action.payload,
      };
    case 'UPDATETOTAL':
      return {
        ...state,
        totalProductAll: action.payload,
      };
    case 'UPDATEPAGE':
      return {
        ...state,
        pageProductAll: action.payload,
      };
    case 'UPDATELIMIT':
      return {
        ...state,
        limitProductAll: action.payload,
      };
    default:
      return state;
  }
};

export default productReducers;
