import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Avatar from 'material-ui/Avatar';
import { Panel, FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
import Chip from 'material-ui/Chip';
import {blue300, green500} from 'material-ui/styles/colors';
import { FormattedMessage } from 'react-intl';

import { getId, getChatSocket, getName, getAvatarUrl, getChatList, getSelectedCuid } from '../../App/AppReducer';
import { addNewChat, readMessage, selectCuid } from '../../App/AppActions';
// import { getChatList } from '../ChatReducer';
// import { addNewChat } from '../ChatActions';

import styless from './styless.css';

const styles = {
  left: {
    wordWrap: 'break-word',
    maxWidth: '80%',
    clear: 'both',
    float: 'left',
    margin: 4,
    textAlign: 'left',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    color: 'red',
  },
  right: {
    maxWidth: '80%',
    clear: 'both',
    float: 'right',
    margin: 4,
    textAlign: 'right',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
  chip: {
    margin: 4,
    flexWrap: 'wrap',
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};
class Chat extends Component{
  constructor(props){
    super(props);
    this.state = {
      content: '',
    };
  }
  componentWillUnmount () {
    this.props.dispatch(selectCuid(''));
  }
  componentDidUpdate() {
    const objDiv = document.getElementById('chat_content');
    if (objDiv !== null) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }
  handleSelectGroup = (cuid) => {
    // this.setState({ selectedCuid: cuid });
    this.props.dispatch(selectCuid(cuid));
    const chatFrame = this.props.chatList.filter((list) => { return list.cuid === cuid; })[0];
    if (chatFrame.messages.filter((mess) => { return mess.new; }).length > 0) {
      const read = {
        id: this.props.id,
        cuid,
      };
      this.props.dispatch(readMessage(read));
    }
  };
  handleSend = () => {
    if (this.state.content !== '' && this.props.selectedCuid !== '') {
      const chatFrame = this.props.chatList.filter((list) => {
        return list.cuid === this.props.selectedCuid;
      })[0];
      const message = {
        cuid: chatFrame.cuid,
        userSend: this.props.id,
        members: chatFrame.members,
        message: this.state.content,
      };
      this.props.chatSocket.emitMessageSent(message);
      this.setState({content: ''});
    }
  };
  handleContent = (event) => {
    this.setState({ content: event.target.value });
  };
  handleKeyPress = (target) => {
    if(target.charCode == 13){
      if (this.state.content !== '' && this.props.selectedCuid !== '') {
        const chatFrame = this.props.chatList.filter((list) => {
          return list.cuid === this.props.selectedCuid;
        })[0];
        const message = {
          cuid: chatFrame.cuid,
          userSend: this.props.id,
          members: chatFrame.members,
          message: this.state.content,
        };
        this.props.chatSocket.emitMessageSent(message);
        this.setState({content: ''});
      }
    }
  };
  render(){
    const chatFrame = this.props.chatList.filter((list) => { return list.cuid === this.props.selectedCuid; })[0];
    // console.log(chatFrame);
    if(this.props.id === '') return (
      <div>
        please login
      </div>
    );
    return (
      <div className='col-md-12' >
        <div className='col-md-4' style={{ maxHeight: 'calc(100vh - 164px)', minHeight: 'calc(100vh - 164px)', paddingTop: '15px', overflow: 'auto' }} >
          <List>
            {
              this.props.chatList.map((list, index) => (
                <ListItem
                  key={index}
                  primaryText={list.members.length > 2 ? list.cuid : list.members[0].name}
                  leftAvatar={
                    <Avatar
                      src={
                        list.members.length > 2 ?
                          'https://d30y9cdsu7xlg0.cloudfront.net/png/64410-200.png' :
                          `/images/${list.members.filter((mem) => { return mem._id !== this.props.id; })[0].avatarUrl}`
                      }
                    />
                  }
                  rightIcon={<CommunicationChatBubble />}
                  onTouchTap={() => {this.handleSelectGroup(list.cuid)}}
                />
              ))
            }

          </List>
        </div>
        <div className='col-md-8' style={{ maxHeight: 'calc(100vh - 175px)', minHeight: 'calc(100vh - 175px)', paddingTop: '15px' }}>
          <Panel
            header={
              (chatFrame !== undefined) ? (
                (chatFrame.members.length > 2) ? (
                  `${this.props.intl.messages.group} ${chatFrame.cuid}`
                ) : (
                  `${this.props.intl.messages.chatWith} ${chatFrame.members.filter((mem) => { return mem.id !== this.props.id; })[0].name}`
                )
              ) : ''
            }
            footer={
              (this.props.selectedCuid !== '') ? (
                <FormGroup>
                  <InputGroup>
                    <FormControl type="text" onChange={this.handleContent} value={this.state.content} onKeyPress={this.handleKeyPress} />
                    <InputGroup.Addon
                      style={{ padding: '0 0 0 0' }}
                    >
                      <Button onClick={this.handleSend} >
                        <Glyphicon glyph="glyphicon glyphicon-send" />
                      </Button>
                    </InputGroup.Addon>
                  </InputGroup>
                </FormGroup>
              ) : ''
            }
          >
            <div id="chat_content" style={{ maxHeight: 'calc(100vh - 324px)', minHeight: 'calc(100vh - 324px)', overflow: 'auto' }} >
              {
                (chatFrame !== undefined) ? (
                  chatFrame.messages.map((mess, index) => (
                    (mess.userSend === this.props.id) ? (
                        <Chip
                          key={index}
                          className={styless.rightChat}
                          backgroundColor={blue300}
                        >
                          {mess.message}
                        </Chip>
                      ) : (
                        <Chip
                          key={index}
                          className={styless.leftChat}
                          backgroundColor={green500}
                        >
                          {mess.message}
                        </Chip>
                      )
                  ))
                  ) : ''
              }
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    id: getId(state),
    chatList: getChatList(state),
    chatSocket: getChatSocket(state),
    userName: getName(state),
    avatarUrl: getAvatarUrl(state),
    selectedCuid: getSelectedCuid(state),
  };
}
Chat.propTypes = {
  intl: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  selectedCuid: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  chatSocket: PropTypes.object.isRequired,
  chatList: PropTypes.array.isRequired,
};
Chat.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Chat);
