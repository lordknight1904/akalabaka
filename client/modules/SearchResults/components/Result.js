import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { Panel, PanelGroup, Accordion, Button } from 'react-bootstrap';
// import { addNewChat } from '../../Chat/ChatActions';
import { getId, getAvatarUrl, getName, getLiked, getFollowed } from '../../App/AppReducer';
import { addNewChat, like, follow, unlike, unfollow } from '../../App/AppActions';
import { FormattedMessage } from 'react-intl';

class Result extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  handleLike = () => {
    const likeReq = {
      id: this.props.id,
      userId: this.props.user._id,
    };
    this.props.dispatch(like(likeReq));
  };
  handleUnlike = () => {
    const likeReq = {
      id: this.props.id,
      userId: this.props.user._id,
    };
    this.props.dispatch(unlike(likeReq));
  };
  handleFollow = () => {
    const followReq = {
      id: this.props.id,
      userId: this.props.user._id,
    };
    this.props.dispatch(follow(followReq));
  };
  handleUnfollow = () => {
    const followReq = {
      id: this.props.id,
      userId: this.props.user._id,
    };
    this.props.dispatch(unfollow(followReq));
  };
  handleChatButton = () => {
    const user = {
      _id: this.props.user._id,
      name: this.props.user.name,
      avatarUrl: this.props.user.avatarUrl,

      _id2: this.props.id,
      name2: this.props.name,
      avatarUrl2: this.props.avatarUrl,
    };
    this.props.dispatch(addNewChat(user));
  };
  handleUserPage = () => {
    this.context.router.push(`user/${this.props.user._id}`);
  };
  render(){
    const url = this.props.user.avatarUrl;
    const avatarUrl = (url.substr(url.lastIndexOf('.')).length <= 5) ? ('/images/' + url) : url;
    return (
      <Panel
        style={{ marginTop: '30px' }}
        footer={
          <div>
            <Button style={{ float: 'right' }} href={`chat/${this.props.id}`} target="_blank" >{<FormattedMessage id="chat" />}</Button>
            {
              (this.props.user.follows.indexOf(this.props.id) >= 0) ? (
                <Button bsStyle="info" style={{ float: 'right' }} onClick={this.handleUnfollow} >{<FormattedMessage id="followed" />}</Button>
              ) : (
                <Button style={{ float: 'right' }} onClick={this.handleFollow} >{<FormattedMessage id="follow" />}</Button>
              )
            }

            {
              (this.props.user.likes.indexOf(this.props.id) >= 0) ? (
                <Button bsStyle="info" style={{ float: 'right' }} onClick={this.handleUnlike} >{<FormattedMessage id="liked" />}</Button>
              ) : (
                <Button style={{ float: 'right' }} onClick={this.handleLike} >{<FormattedMessage id="like" />}</Button>
              )
            }
            <div className="clearfix"></div>
          </div>
        }
      >
        <div className='col-md-3' >
          <div className='col-md-offset-2' onClick={this.handleUserPage}>
            <Avatar
              size={100}
              style={{ textAlign: 'center' }}
              src={(avatarUrl !== '/images/') ? avatarUrl : 'https://i.imgur.com/dKw1niR.jpg'}
            >
          </Avatar>
          </div>
          <div className='col-md-offset-2' >
            <div>
              {this.props.user.name}
            </div>
            <div>
              <div>
                {<FormattedMessage id="likes" values={{ likes: this.props.user.likes.length.toString() }} />}
              </div>
              <div>
                {<FormattedMessage id="follows" values={{ follows: this.props.user.follows.length.toString() }} />}
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-9'>
          {this.props.user.about}
        </div>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    id: getId(state),
    name: getName(state),
    avatarUrl: getAvatarUrl(state),
  };
}
Result.propTypes = {
  intl: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};
Result.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Result);
