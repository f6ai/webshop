// root reducer represents the overall reducer based on all of the reducers that comes in
import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer
});