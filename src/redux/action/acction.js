export const openModal = (id) => ({
    type: 'OPEN_MODAL',
    payload: id,
});
export const closeModal = () => ({
    type: 'CLOSE_MODAL',
});
export const Listsearch = (list) => ({
  type: 'SEARCH',
  payload: list,
});
export const saveSearchValue = (value) => ({
  type: 'SAVE_SEARCH_VALUE',
  payload: value,
});
export const toggleSearch = () => ({
  type: 'TOGGLE_SEARCH',
});
export const addToCart = (data) => ({
  type: 'ADD_TO_HEART',
  payload: data,
});
export const deleteToCart = (position) => ({
  type: 'DELETE_TO_HEART',
  payload: position,
});
export const deafulCart = () => ({
  type: 'DEAFULHEART'
});
export const deafulHeartAPI = () => ({
  type: 'DEAFULHEARTAPI'
});
export const getListHeartApi = (data) => ({
  type: 'LISTHEARTAPI',
  payload: data,
});
