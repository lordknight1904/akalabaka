import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { FormattedMessage } from 'react-intl';

import { getName, getId, getFollow, getJobHistory, getLikes, getGender } from '../../../App/AppReducer';
import { updateNationality } from '../../../App/AppActions';

class NationalityDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      nationality: this.props.nationality,
      default: this.props.nationality,
    };
  }

  handleNationality = (event) => { event.preventDefault(); this.setState({ nationality: event.target.value }); };
  handleSave = () => {
    const nationality = {
      id: this.props.id,
      nationality: this.state.nationality,
    };
    this.props.dispatch(updateNationality(nationality)).then((res) => {
      if(res.user.code == 'success') {
        this.props.handleCloseNationalityDialog();
      }
    });
  };
  render(){
    const actions = [
      <FlatButton
        label={
          (this.state.default !== this.state.nationality) ? (
              <FormattedMessage id="save" />
            ) : (
              <FormattedMessage id="cancel" />
            )
        }
        primary={true}
        keyboardFocused={true}
        onTouchTap={
          (this.state.default !== this.state.nationality) ? (
              this.handleSave
            ) : (
              this.props.handleCloseNationalityDialog
            )
        }
      />,
    ];
    return (
      <div>
        <Dialog
          title={<span><FormattedMessage id="nationalityDialog" /></span>}
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          <TextField
            value={this.state.nationality}
            onChange={this.handleNationality}
            floatingLabelText={<FormattedMessage id="yourNationality" />}
            fullWidth
          />
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
NationalityDialog.propTypes = {
  intl: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseNationalityDialog: PropTypes.func.isRequired,
  nationality: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
NationalityDialog.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(NationalityDialog);
