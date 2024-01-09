export const getTLHomeAcction = (items) => ({
    type: 'GET_LIST_THELOAI',
    payload: items,
});
export const getTLChecked = (items) => ({
  type: 'GET_LIST_THELOAI_CHECKED',
  payload: items,
});
export const getBannerHome = (items) => ({
  type: 'GET_LIST_BANNER',
  payload: items,
});
export const getCategory= (items) => ({
  type: 'GET_LIST_CATEGORY',
  payload: items,
});
export const getPhanLoai= (items) => ({
  type: 'GET_LIST_PHANLOAI',
  payload: items,
});
export const getTheLoai= (items) => ({
  type: 'GET_LIST_TL_CASE',
  payload: items,
});

  