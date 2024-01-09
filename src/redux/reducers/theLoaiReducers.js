const initialState = {
  theloaiList: [],
  theloaiChecked: [],
  banner: [],
  phanLoai: [],
  category: [],
  listTheLoai: [],
};
const theLoaiReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIST_THELOAI':
      return {
        ...state,
        theloaiList: action.payload,
      };
    case 'GET_LIST_THELOAI_CHECKED':
      return {
        ...state,
        theloaiChecked: action.payload,
      };
    case 'GET_LIST_BANNER':
      return {
        ...state,
        banner: action.payload,
      };
    case 'GET_LIST_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    case 'GET_LIST_PHANLOAI':
      return {
        ...state,
        phanLoai: action.payload,
      };
    case 'GET_LIST_TL_CASE':
      return {
        ...state,
        listTheLoai: action.payload,
      };
    default:
      return state;
  }
};

export default theLoaiReducers;
