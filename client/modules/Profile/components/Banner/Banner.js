import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import styles from '../../../App/App.css';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import { FormattedMessage } from 'react-intl';

import { uploadBanner } from '../../../App/AppActions';
import { getId, getBannerUrl } from '../../../App/AppReducer';

class Banner extends Component{
  constructor(props){
    super(props);
    this.state = {
      open: false,
      file: '',
      imagePreviewUrl: '',
      base64image: '',
      isAllow: true,
    };
  }
  handleBanner = () => {
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
    this.props.dispatch(uploadBanner(this.state.base64image, this.props.id)).then((res) => {
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
    return (
      <div style={{ marginTop: '20px' }}>
        <div style={{
          background: `#FFF url(/images/${this.props.bannerUrl}) center`,
          width: '80%',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        }} >
          <IconButton
            style={{ display: 'inline-block', top: '0', left: '0', marginLeft: '13%', marginTop: '2%', position: 'absolute' }}
            onTouchTap={this.handleBanner}
          >
            <i className={`material-icons ${styles.size18} ${styles.bannerEdit}`}>mode_edit</i>
          </IconButton>
        </div>
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
    id: getId(state),
    bannerUrl: getBannerUrl(state),
  };
}
Banner.propTypes = {
  intl: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  bannerUrl: PropTypes.string.isRequired,
};
Banner.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Banner);
