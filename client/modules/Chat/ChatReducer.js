// Import Actions
import { ACTIONS } from './ChatActions';
import cuid from 'cuid';
import update from 'react-addons-update';

const initialState = {
  chatList: [],
};
/*
  chatList: [
    cuid,
    members: [ {id, name, avatarUrl}],
    messages: [
      senderName,
      content,
    ]
  ]
*/

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getChatList = state => state.chat.chatList;
// Export Reducer
export default ChatReducer;
