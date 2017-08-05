import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

import { getName, getId, getFollow, getJobHistory, getLikes, getFee, getIsFee } from '../../../App/AppReducer';
import { updateFee } from '../../../App/AppActions';

class FeeDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      fee: this.props.fee,
      isFee: this.props.isFee,
      default: this.props.fee,
      default2: this.props.isFee,
    };
  }


  handleFee = (event, index, value) => {
    if (!isNaN(event.target.value,)) {
      this.setState({ fee: event.target.value, });
    }
  };
  handleIsFee = (event, isInputChecked) => {
    this.setState({ isFee: isInputChecked });
  };
  handleSave = () => {
    const fee = {
      id: this.props.id,
      isFee: this.state.isFee,
      fee: this.state.fee,
    };
    this.props.dispatch(updateFee(fee)).then((res) => {
      if(res.user.code == 'success') {
        this.props.handleCloseFeeDialog();
      }
    });
  };
  render(){
    const actions = [
      <FlatButton
        label={
          (this.state.default !== this.state.fee || this.state.default2!== this.state.isFee) ? (
              <FormattedMessage id="save" />
            ) : (
              <FormattedMessage id="cancel" />
            )
        }
        primary={true}
        keyboardFocused={true}
        onTouchTap={
          (this.state.default !== this.state.fee || this.state.default2!== this.state.isFee) ? (
              this.handleSave
            ) : (
              this.props.handleCloseFeeDialog
            )
        }
      />,
    ];
    return (
      <div>
        <Dialog
          title={<span><FormattedMessage id="feeDialog" /></span>}
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          <Checkbox
            label={<FormattedMessage id="feeCheckBox" />}
            checked={this.state.isFee}
            onCheck={this.handleIsFee}
          />
          {
            (this.state.isFee) ? (
              <TextField
                value={this.state.fee}
                onChange={this.handleFee}
                floatingLabelText={<FormattedMessage id="yourFee" />}
                fullWidth
              />
            ) : ''
          }
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    id: getId(state),
  };
}
FeeDialog.propTypes = {
  intl: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseFeeDialog: PropTypes.func.isRequired,
  fee: PropTypes.number.isRequired,
  isFee: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
FeeDialog.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(FeeDialog);
