import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// logging the state after the action happened but before the root reducer
const middlewares = [logger];
// in case of multiple middlewares, we spread the array elements into the function's arguments
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;