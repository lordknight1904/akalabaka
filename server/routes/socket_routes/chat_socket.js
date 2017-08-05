/**
 * Server socket handle
 */
import SocketIO from 'socket.io';
import User from '../../models/user';
import mongoose from 'mongoose';
/**
 * Store list user connected
 * {
 *   'userID00': {
 *     sockets: [
 *        0: 'socketID00',
 *        1: 'socketID01',
 *        ...
 *     ],
 *     supportState: READY/BUSY
 *   },
 *   'userID01': {
 *     sockets: [
 *        0: 'socketID02',
 *        1: 'socketID03',
 *        ...
 *     ],
 *     supportState: READY/BUSY
 *   },
 *   ...
 * }
 * @type {{}}
 */
const state = {
  READY: 'READY',
  BUSY: 'BUSY',
  OFFLINE: 'OFFLINE',
};
const socketIDs = {};
// Store Session timeout list of user disconnect events
var socketSessionTimeout = {};
var io = {};
// Store static instance for another file import
export var serverSocketStaticInstance = null;
/**
 * Check the user is online or not
 * @param userIDs
 * @returns {Promise}
 */
export function getUsersOnlineState(userIDs) {
  return new Promise((resolve)=> {
    let results = [];
    userIDs.map((userID)=> {
      // Check user exists on socketIDs list?
      let onlineState = false;
      if (isUserOnline(userID)) {
        onlineState = true;
      }
      results.push({
        userID,
        onlineState
      });
    });
    resolve(results);
  });
}

/**
 * Check have socket connection of userID?
 * @param userID
 * @returns {boolean}
 */
function isUserOnline(userID) {
  return socketIDs[userID] && socketIDs[userID].sockets && socketIDs[userID].sockets.length > 0;
}
function changeUserSupportState(userID, supportState) {
  if (isUserOnline(userID)) {
    socketIDs[userID].supportState = supportState;
  }
}

export function getUserSupportState(userID) {
  if (isUserOnline(userID)) {
    return socketIDs[userID].supportState;
  }
  return state.OFFLINE;
}

export default class ServerSocketIO {
  constructor(httpServer) {
    io = new SocketIO(httpServer);
    socketSessionTimeout = {};
  }

  beginListen() {
    // Using Socket.io Communication
    io.sockets.on('connection', (socket) => {
      /**
       * When a message send success
       */
      socket.on('MessageSent', (message) => {
        console.log('MessageSent');
        console.log(message);
        message.members.map((mem) => {
          if (isUserOnline(mem._id)) {
            socketIDs[mem._id].sockets.map((socketID) => {
              io.to(socketID).emit('UpdateMessageList', message);
            });
          }
          User.findById(mem._id, (err, user) => {
            if (err) console.log(err);
            else {
              // get the chat history of specific group chat by cuid
              const chatHistory = user.chatHistory.filter((his) => {
                return his.cuid === message.cuid;
              })[0];
              // read all the above messages
              if (chatHistory !== undefined) {
                for (let i = chatHistory.messages.length-1; i >= 0; i--) {
                  if (chatHistory.messages[i].new) {
                    chatHistory.messages[i].new = false;
                  } else {
                    break;
                  }
                }
                // append new message to history
                chatHistory.messages.push({userSend: message.userSend, message: message.message, new: (message.userSend !== mem._id) });
              } else {
                const members = message.members.map((mem) => { return mongoose.Types.ObjectId(mem._id)});
                const newChatHistory = {
                  cuid: message.cuid,
                  members: members,
                  messages: [{
                    userSend: message.userSend,
                    message: message.message,
                  }],
                };
                user.chatHistory.push(newChatHistory);
              }
            }
            user.save((err2, updatedTank) => {
              if (err2) console.log(err2);
            });
          });
        });
      });
      /**
       * When have new user connect, register it
       */
      socket.on('NewUserConnect', (user) => {
        // Check if have sessionTimeout of this user, remove it
        let userID = user.id;
        // If user has disconnect request before and timeout was not clear
        if (socketSessionTimeout[userID]) {
          console.log('Clear timeout when user reconnect', userID);
          clearTimeout(socketSessionTimeout[userID]);
        }
        // Because if have user connect in the time waiting, this user can not know current user online or not
        // So, Emit to all user connected, exclude current user, that current user is connect to system
        socket.broadcast.emit('UserConnect', userID);
        socket._id = userID;
        this.addSocketToUser(userID, socket.id);
        // updateUserStatus(userID, true);
        console.log('NewUserConnect', userID);
        console.log(socketIDs);
        console.log('------------------------------');
      });

      /**
       * When user disconnect, logout it from users connected list
       */
      socket.on('disconnect', () => {
        console.log('disconnect');
        // Remove user when disconnect
        let userID = socket.id;
        if (socketSessionTimeout[userID]) {
          console.log('Clear timeout when user Disconnect and have socketSessionTimeout before', userID);
          clearTimeout(socketSessionTimeout[userID]);
        }
        // Remove this socket from user
        this.removeSocketFormUser(userID, socket.id);
        // Check this user have connection on others device
        // If not have any socket of this user, then set timeout to emit disconnect event
        if (!isUserOnline(userID)) {
          // Set timeout for wait for user reconnect, if user not reconnect, remove this user from online list
          socketSessionTimeout[userID] = setTimeout(() => {
            // Push this user for all connect to remove this user form these online users list
            // Emit to all user connected, exclude current user
            socket.broadcast.emit('UserDisconnect', userID);
            // updateUserStatus(userID, false);
            console.log('User disconnect with UserID: ', userID);
            console.log(socketIDs);
            console.log('------------------------------');
            delete socketSessionTimeout[userID];
          }, global.socketSessionTimeout);
        }
      });
    });
    serverSocketStaticInstance = this;
  }

  /**
   * Emit data to all sockets of userID
   * @param userID
   * @param action
   * @param data
   */
  emitToUser(userID, action, data) {
    if (isUserOnline(userID)) {
      socketIDs[userID].sockets.map((socketID)=> {
        io.to(socketID).emit(action, data);
      });
    }
  }

  /**
   * Emit data to all sockets of userID, exclude current socketID
   * @param userID
   * @param socketID, the socket will exclude
   * @param action
   * @param data
   */
  emitToUserExclude(userID, socketID, action, data) {
    if (isUserOnline(userID)) {
      socketIDs[userID].sockets.map((socketIDItem)=> {
        if (socketIDItem !== socketID) {
          console.log('found user socket Id');
          console.log(socketIDItem);
          io.to(socketIDItem).emit(action, data);
        }
      });
    }
  }

  /**
   * Add more socketID to User
   * @param userID
   * @param socketID
   */
  addSocketToUser(userID, socketID) {
    if (isUserOnline(userID)) {
      // Add new one
      socketIDs[userID].sockets.push(socketID);
    } else {
      // Init new one
      socketIDs[userID] = {
        sockets: [socketID],
        // Because user just connect, so it is not have any connection
        supportState: state.READY
      };
    }
  }

  /**
   * Remove socketID of userID
   * @param userID
   * @param socketID
   */
  removeSocketFormUser(userID, socketID) {
    // If have connections
    if (isUserOnline(userID)) {
      socketIDs[userID].sockets.map(function (socket, index) {
        // If the socket is correct socket want to remove
        if (socket === socketID) {
          socketIDs[userID].sockets.splice(index, 1);
          // If have no socket in list, remove this list
          if (socketIDs[userID].sockets.length <= 0) {
            delete socketIDs[userID];
          }
          return false;
        }
      });
    }
  }

  /**
   * Remove static instance of SocketObject
   */
  removeStaticInstance() {
    serverSocketStaticInstance = null;
  }
}
