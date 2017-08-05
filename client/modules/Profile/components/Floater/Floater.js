import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';

import { uploadAvatar } from '../../../App/AppActions';
import { getName, getYearOfBirth, getFollow, getJobHistory, getLikes, getGender, getNationality, getId, getAvatarUrl, getAddress, getIsFee, getFee } from '../../../App/AppReducer';

import Dialog from 'material-ui/Dialog';
import NameDialog from './NameDialog';
import NationalityDialog from './NationalityDialog';
import GenderDialog from './GenderDialog';
import YearOfBirthDialog from './YearOfBirthDialog';
import FeeDialog from './FeeDialog';
import AddressDialog from './AddressDialog';
import Avatar from 'material-ui/Avatar';
import styles from '../../../App/App.css';
import IconButton from 'material-ui/IconButton';
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
  handleOpenNameDialog = () => { this.setState({ isNameDialog: true })};
  handleOpenNationalityDialog = () => { this.setState({ isNationalityDialog: true })};
  handleOpenGenderDialog = () => { this.setState({ isGenderDialog: true })};
  handleOpensYearOfBirthDialog = () => { this.setState({ isYearOfBirthDialog: true })};
  handleOpensAddress = () => { this.setState({ isAddressDialog: true })};
  handleOpensFee = () => { this.setState({ isFeeDialog: true })};

  handleCloseNameDialog = () => { this.setState({ isNameDialog: false })};
  handleCloseNationalityDialog = () => { this.setState({ isNationalityDialog: false })};
  handleCloseGenderDialog = () => { this.setState({ isGenderDialog: false })};
  handleCloseYearOfBirthDialog = () => { this.setState({ isYearOfBirthDialog: false })};
  handleCloseAddressDialog = () => { this.setState({ isAddressDialog: false })};
  handleCloseFeeDialog = () => { this.setState({ isFeeDialog: false })};

  handleAvatar = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  _handleImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (readerEvt) => {
      this.setState({ base64image: readerEvt.target.result });
    };
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(uploadAvatar(this.state.base64image, this.props.id)).then((res) => {
      if (res === '1') this.setState({ open: false });
      else {
        this.setState({ open: false });
      }
    });
  };
  render(){
    const actions = [
      <FlatButton
        label={<FormattedMessage id="cancel" />}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    const url = this.props.avatarUrl;
    const avatarUrl = (url.substr(url.lastIndexOf('.')).length <= 5) ? ('/images/' + url) : url;
    return (
      <div>
        <div style={{ margin: '20px', textAlign: 'center'}}>
          <IconButton
            onTouchTap={this.handleAvatar}
          >
            <i className={`material-icons ${styles.size18} ${styles.bannerEdit}`}>mode_edit</i>
          </IconButton>
          <Avatar
            size={150}
            src={avatarUrl}
            >
          </Avatar>
        </div>
        <Paper style={style} zDepth={3}>
          <List>
            <ListItem onTouchTap={this.handleOpenNameDialog} insetChildren primaryText={<FormattedMessage id="name" values={{ name: this.props.name }} />} />
            <ListItem onTouchTap={this.handleOpenNationalityDialog} insetChildren primaryText={<FormattedMessage id="nationality" values={{ nationality: this.props.nationality }} />} />
            <ListItem onTouchTap={this.handleOpenGenderDialog} insetChildren primaryText={<FormattedMessage id="gender" values={{ gender: <FormattedMessage id={this.props.gender}/> }} />} />
            <ListItem onTouchTap={this.handleOpensYearOfBirthDialog} insetChildren primaryText={<FormattedMessage id="yearOfBirth" values={{ yearOfBirth: this.props.yearOfBirth }} />} />
            {/*<ListItem onTouchTap={this.handleOpensAddress} insetChildren primaryText={<FormattedMessage id="address" values={{ city: this.props.address.city, district: this.props.address.district }} />} />*/}
            <ListItem
              onTouchTap={this.handleOpensAddress}
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
            <ListItem onTouchTap={this.handleOpensFee} insetChildren primaryText={<FormattedMessage id="fee" values={{ fee: (this.props.isFee) ? this.props.fee.toString() : '0' }} />} />
          </List>
          <Divider />
          <List>
            <ListItem insetChildren primaryText={<FormattedMessage id="likes" values={{ likes: this.props.likes.length.toString() }} />} />
            <ListItem insetChildren primaryText={<FormattedMessage id="follows" values={{ follows: this.props.follows.length.toString() }} />} />
          </List>
        </Paper>
        <NameDialog open={this.state.isNameDialog} handleCloseNameDialog={this.handleCloseNameDialog} name={this.props.name} />
        <NationalityDialog open={this.state.isNationalityDialog} handleCloseNationalityDialog={this.handleCloseNationalityDialog} nationality={this.props.nationality} />
        <GenderDialog open={this.state.isGenderDialog} handleCloseGenderDialog={this.handleCloseGenderDialog} gender={this.props.gender} />
        <YearOfBirthDialog open={this.state.isYearOfBirthDialog} handleCloseYearOfBirthDialog={this.handleCloseYearOfBirthDialog} yearOfBirth={this.props.yearOfBirth} />
        <AddressDialog open={this.state.isAddressDialog} handleCloseAddressDialog={this.handleCloseAddressDialog} address={this.props.address} />
        <FeeDialog open={this.state.isFeeDialog} handleCloseFeeDialog={this.handleCloseFeeDialog} fee={this.props.fee} isFee={this.props.isFee} />

        <Dialog
          title={<span><FormattedMessage id="upload" /></span>}
          modal
          open={this.state.open}
          onRequestClose={this.handleClose}
          actions={actions}
        >
          <div>
            <form onSubmit={this.handleSubmit}>
              <input type="file" name="pic" accept="image/*" onChange={this._handleImageChange} />
              <br />
              <input type="submit" value="Submit" onClick={this.handleSubmit} />
            </form>
          </div>
        </Dialog>
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
    id: getId(state),
    avatarUrl: getAvatarUrl(state),
  };
}
Floater.propTypes = {
  intl: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
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
