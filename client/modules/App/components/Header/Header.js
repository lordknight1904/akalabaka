import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Avatar from 'material-ui/Avatar';
// import Badge from 'material-ui/Badge';

import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Col, Image, Glyphicon, Badge } from 'react-bootstrap'

import { signOutRequest } from '../../AppActions';
import { getId, getName, getImgUrl, getSocialId, getChatList, getAvatarUrl } from '../../AppReducer';

import AuthForm from './AuthForm/AuthForm';

import styles from './Header.css';

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: 'en',
      open: false,
      openUserMenu: false,
      dataSource: [],
    };
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.switchLanguage(this.props.intl.enabledLanguages[value]);
  };
  hanldeOpenAuthForm = () => {this.setState({open: true});};
  handleCloseAuthForm = () => {this.setState({open: false});};
  handleSelect = (eventKey) => {
    switch (eventKey) {
      case 'en':
      case 'vn':{
        this.setState({ value: eventKey });
        this.props.switchLanguage(this.props.intl.enabledLanguages[this.props.intl.enabledLanguages.indexOf(eventKey)]);
        break;
      }
      case '2': {
        this.hanldeOpenAuthForm();
        break;
      }
      case '3.1': {
        this.setState({openUserMenu: false});
        this.context.router.push('/profile/' + this.props.id);
        break;
      }
      case '3.2': {
        this.setState({openUserMenu: false});
        this.props.dispatch(signOutRequest(this.props.socialId));
        break;
      }
      case '5': {
        this.context.router.push(`/chat/${this.props.id}`);
        break;
      }
      default: {
        alert(`selected /${eventKey}/`);
        break;
      }
    }
  };
  render(){
    const languageNodes =
      this.props.intl.enabledLanguages.map((lang, index) =>
        <MenuItem eventKey={lang} key={lang} value={{lang}} >{lang}</MenuItem>
    );
    const newMess = this.props.chatList.filter((list) => {
      return list.messages.filter((mess) => { return mess.new; }).length > 0;
    }).length;
    return (
      <div>
        <Navbar inverse collapseOnSelect  >
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={() => {this.context.router.push('/');}} >Ielts Speaking Meetup</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight onSelect={this.handleSelect}>
              {
                (this.props.id === '') ? (
                  <NavItem eventKey='2'>{<FormattedMessage id="authForm" />}</NavItem>
                ) : (
                <NavItem eventKey='10' className={styles.taga} disabled >
                  {
                    (this.props.imgUrl !== '') ? (
                      <Avatar
                        size={30}
                        src={this.props.imgUrl}
                        />
                    ) : (
                      <Avatar
                        size={30}
                        src={`/images/${this.props.avatarUrl}`}
                      />
                    )
                  }
                </NavItem>
                )
              }
              {
                (this.props.id !== '') ? (
                  (newMess > 0) ? (
                    <NavItem eventKey='5'>
                      <Glyphicon glyph="glyphicon glyphicon-envelope" style={{ color: 'cyan' }} />
                      <Badge style={{ marginTop: '-18px' }} >{newMess}</Badge>
                    </NavItem>
                    ) : (
                      <NavItem eventKey='5'>
                        <Glyphicon glyph="glyphicon glyphicon-envelope"/>
                        <Badge style={{ marginTop: '-18px' }} >{newMess}</Badge>
                      </NavItem>
                    )
                ) : ''
              }
              {
                (this.props.id !== '') ? (
                  <NavDropdown eventKey='3' title={ (this.props.name == 'unknown') ? <FormattedMessage id="unknown"/> : this.props.name} id="basic-nav-dropdown">
                    <MenuItem eventKey='3.1'>{<FormattedMessage id="profile"/>}</MenuItem>
                    <MenuItem eventKey='3.2'>{<FormattedMessage id="signOut"/>}</MenuItem>
                  </NavDropdown>
                ) : ''
              }
              <NavDropdown eventKey="4" title={this.state.value} id="nav-dropdown" >
                {languageNodes}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AuthForm
          open={this.state.open}
          handleCloseAuthForm={this.handleCloseAuthForm}
          dispatch={this.props.dispatch}
          intl={this.props.intl}
        />
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    id: getId(state),
    name: getName(state),
    imgUrl: getImgUrl(state),
    avatarUrl: getAvatarUrl(state),
    socialId: getSocialId(state),
    chatList: getChatList(state),
  };
}
Header.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func,

  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  socialId: PropTypes.string.isRequired,
  chatList: PropTypes.array.isRequired,
};
Header.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Header);
