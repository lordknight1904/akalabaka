/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import search from './modules/SearchResults/SearchReducer';
import user from './modules/User/UserReducer';
// import chat from './modules/Chat/ChatReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  search,
  user,
  // chat,
});
