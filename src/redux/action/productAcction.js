export const getProductHome = (items) => ({
    type: 'GET_LIST_PRODUCT',
    payload: items,
});
export const getProductInTL= (items) => ({
    type: 'GET_LIST_PRODUCT_CASE',
    payload: items,
});
export const getDeatilProduct= (items) => ({
    type: 'GET_PRODUCT_DEATIL',
    payload: items,
});
export const getListCmt= (items) => ({
    type: 'GET_LIST_CMT',
    payload: items,
});
export const appenListCmt= (items) => ({
    type: 'ADD_COMMENT',
    payload: items,
});
export const updateRepLyId= (items) => ({
    type: 'UPDATE_REPLYID',
    payload: items,
});
export const updateReqText= (items) => ({
    type: 'UPDATE_REPLYACTIVE',
    payload: items,
});
export const getListProductAll= (items) => ({
    type: 'PRODUCTLISTALL',
    payload: items,
});
export const updateTotal= (items) => ({
    type: 'UPDATETOTAL',
    payload: items,
});
export const getListPage= (items) => ({
    type: 'UPDATEPAGE',
    payload: items,
});
export const updateLimit= (items) => ({
    type: 'UPDATELIMIT',
    payload: items,
});