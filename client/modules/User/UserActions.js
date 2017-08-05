import callApi from '../../util/apiCaller';

export const ACTIONS = {
  FETCH_USER: 'FETCH_USER',
  ERASE_USER: 'ERASE_USER',
};
export function addUser(user) {
  return {
    type: ACTIONS.FETCH_USER,
    user
  };
}
export function eraseUser(user) {
  return {
    type: ACTIONS.ERASE_USER,
    user
  };
}
export function fetchUser(id) {
  return (dispatch) => {
    return callApi(`user/${id}`).then(res => {
      if (res.user !== 'error') {
        dispatch(addUser(res.user));
      }
    });
  }
}
