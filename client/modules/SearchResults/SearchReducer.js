// Import Actions
import { ACTIONS } from './SearchActions';
import {REHYDRATE} from 'redux-persist/constants'

// Initial State
const initialState = {
  search: [],
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      const incoming = action.payload.app;
      return {...state};
    case ACTIONS.SEARCH_RESULTS:
      return {
        ...state,
        search: action.user,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getSearch = state => state.search.search;
// Export Reducer
export default SearchReducer;
