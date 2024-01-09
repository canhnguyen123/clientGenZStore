import { combineReducers } from 'redux';
import reducers from './reducers';
import theLoaiReducers from './theLoaiReducers';
import productReducers from './productReducers';
import acctionReducers from './acctionReducers';
import cartReducers from './cartReducers';
import notificationReducers from './notificationReducers';
const rootReducer = combineReducers({
  reducers: reducers, 
  theLoai: theLoaiReducers, 
  product:productReducers,
  account:acctionReducers,
  cart:cartReducers,
  notification:notificationReducers
});

export default rootReducer;
