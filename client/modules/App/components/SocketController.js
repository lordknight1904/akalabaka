/**
 * Use to control chatSocketObj when user login/logout/page load
 * Not render any things
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { getId } from '../../App/AppReducer';
import { setChatSocket, addChat } from '../AppActions';
import { getChatSocket, getChatList } from '../AppReducer';

import chatSocketObj from '../../../util/ChatSocket';
// import { addChat } from '../../Chat/ChatActions';
// import { getChatList } from '../../Chat/ChatReducer';

console.log('SocketController');
export class SocketController extends Component {
  componentDidMount() {
    console.log('SocketController componentDidMount');
    // Init chat socket
    Promise.resolve(this.props.dispatch(setChatSocket(new chatSocketObj()))).then(()=>{
      console.log('here');
      console.log(this.props.chatSocketObj);
      this.isDidMount = true;
      this.props.chatSocketObj.listenMessageReceive((message) => {
        console.log(message);
        // console.log(this.props.chatList);
        this.props.dispatch(addChat(message));
      });
    });
  }

  render() {
    return null;
  }

  componentWillReceiveProps(props) {
    // console.log('SocketController, componentWillReceiveProps', props.chatSocketObj);
    if (this.isDidMount === false) {
      return;
    }
    let userLogin = props.userLogin;
    let userLoginID = null;
    if (userLogin && userLogin) {
      userLoginID = userLogin;
    }
    // If user Login, let connect
    if (typeof userLoginID !== 'undefined' && userLoginID !== null
      && userLoginID !== this.previousUserLoginID) {
      this.handleLoginSuccess(props, userLoginID);
    }
    // If user not Login and have previous socket connected, disconnect this
    else if (props.chatSocketObj && props.chatSocketObj.connected === true) {
      this.handleLogout(props);
    }
  }

  /**
   * Connect to Login user
   * @param props
   * @param userLoginID
   */
  handleLoginSuccess(props, userLoginID) {
    // console.log('SocketController: handleLoginSuccess', userLoginID);
    console.log('SocketController: handleLoginSuccess');
    // console.log('SocketController: this.previousUserLoginID', this.previousUserLoginID);
    props.chatSocketObj.doConnect({id: userLoginID});
    // Promise.resolve(props.dispatch(setChatSocket(null))).then(()=>{
    props.dispatch(setChatSocket(props.chatSocketObj));
    console.log(props.chatSocketObj);
    // });
    this.previousUserLoginID = userLoginID;
  }

  /**
   * Disconnect when user logout
   * @param props
   */
  handleLogout(props) {
    console.log('SocketController: handleLogout');
    props.chatSocketObj.disconnect();
    props.dispatch(setChatSocket(props.chatSocketObj));
  }
}
SocketController.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // chatList: PropTypes.array.isRequired,
};
// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    userLogin: getId(state),
    chatSocketObj: getChatSocket(state),
    // chatList: getChatList(state),
  };
}

export default connect(mapStateToProps)(SocketController);
