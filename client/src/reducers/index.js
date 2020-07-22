import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
});

export default rootReducer;
