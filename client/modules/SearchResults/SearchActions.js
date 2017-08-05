import callApi from '../../util/apiCaller';

export const ACTIONS = {
  SEARCH_RESULTS: 'SEARCH_RESULTS',
};
export function addSearch(user) {
  return {
    type: ACTIONS.SEARCH_RESULTS,
    user
  };
}
export function fetchSearch(path) {
  return (dispatch) => {
    return callApi(`${path}`).then(res => {
      dispatch(addSearch(res.user));
    });
  }
}
