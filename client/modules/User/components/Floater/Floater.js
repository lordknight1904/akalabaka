import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';

import { getName, getYearOfBirth, getFollow, getJobHistory, getLikes, getGender, getNationality, getAvatarUrl, getAddress, getIsFee, getFee } from '../../UserReducer';

import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

const style = {
  marginLeft: 20,
  marginRight: 20,
};
class Floater extends Component{
  constructor(props){
    super(props);
    this.state = {
      isNationalityDialog: false,
      isNameDialog: false,
      isGenderDialog: false,
      isYearOfBirthDialog: false,
      isAddressDialog: false,
      isFeeDialog: false,
      open: false,
      file: '',
      imagePreviewUrl: '',
      base64image: '',
      isAllow: true,
    };
  }
  render(){
    const url = this.props.avatarUrl;
    const avatarUrl = (url.substr(url.lastIndexOf('.')).length <= 5) ? ('/images/' + url) : url;
    return (
      <div>
        <div style={{ margin: '20px', textAlign: 'center'}}>
          <Avatar
            size={150}
            src={avatarUrl}
            >
          </Avatar>
        </div>
        <Paper style={style} zDepth={3}>
          <List>
            <ListItem insetChildren primaryText={<FormattedMessage id="name" values={{ name: this.props.name }} />} />
            <ListItem insetChildren primaryText={<FormattedMessage id="nationality" values={{ nationality: this.props.nationality }} />} />
            <ListItem insetChildren primaryText={<FormattedMessage id="gender" values={{ gender: <FormattedMessage id={this.props.gender}/> }} />} />
            <ListItem insetChildren primaryText={<FormattedMessage id="yearOfBirth" values={{ yearOfBirth: this.props.yearOfBirth }} />} />
            <ListItem
              insetChildren
              primaryText={
                <span>
                  <FormattedMessage id='address'/>
                  {
                    (this.props.address.city !== '') ? (
                      <FormattedMessage id={this.props.address.city}/>
                    ) : ''
                  }
                  ,
                  {
                    (this.props.address.city !== '') ? (
                      <FormattedMessage id={this.props.address.district}/>
                    ) : ''
                  }
                </span>}
            />
            <ListItem onTouchTap={this.handleOpensFee} insetChildren primaryText={<FormattedMessage id="fee" values={{ fee: this.props.fee.toString() }} />} />
          </List>
          <Divider />
          <List>
            <ListItem insetChildren primaryText={<FormattedMessage id="likes" values={{ likes: this.props.likes.length.toString() }} />} />
            <ListItem insetChildren primaryText={<FormattedMessage id="follows" values={{ follows: this.props.follows.length.toString() }} />} />
          </List>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    name: getName(state),
    gender: getGender(state),
    isFee: getIsFee(state),
    fee: getFee(state),
    address: getAddress(state),
    yearOfBirth: getYearOfBirth(state),
    nationality: getNationality(state),
    jobHistory: getJobHistory(state),
    likes: getLikes(state),
    follows: getFollow(state),
    avatarUrl: getAvatarUrl(state),
  };
}
Floater.propTypes = {
  intl: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  isFee: PropTypes.bool.isRequired,
  fee: PropTypes.number.isRequired,
  address: PropTypes.object.isRequired,
  yearOfBirth: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  jobHistory: PropTypes.array.isRequired,
  likes: PropTypes.array.isRequired,
  follows: PropTypes.array.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};
Floater.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Floater);
