/**
 * Client Socket handle
 */
const io = require('socket.io-client');
export default class ChatSocket {
  constructor() {
    this.userID = null;
    this.connected = false;
    this.socket = io.connect('http://ieltsspeakingmeetup:8000');
  }

  /**
   * Open connection and register this user to server
   * @param user: {
     *     id: userID
     * }
   */
  doConnect(user) {
    if ( this.connected === false ) {
      this.userID = user.id;
      this.socket.emit('NewUserConnect', user);
      this.connected = true;
    }
  }

  isSocketConnected() {
    return this.socket && this.socket.connected;
  }

  disconnect() {
    if ( this.connected === true ) {
      this.userID = null;
      this.connected = false;
      this.socket.disconnect();
    }
  }

  /**
   * Listen to event UpdateMessageList to update messages
   * @param callback Call function to update messages
   */
  listenMessageReceive(callback) {
    this.socket.on('UpdateMessageList', (message) => {
      callback(message);
    });
  }

  /**
   * Emit to server when message sent
   * @param message: The message sent
   */
  emitMessageSent(message) {
    this.socket.emit('MessageSent', message);
  }

  onUserConnect(callback) {
    this.socket.on('UserConnect', (userID) => {
      callback(userID);
    });
  }

  onUserDisconnect(callback) {
    this.socket.on('UserDisconnect', (userID) => {
      callback(userID);
    });
  }
}
