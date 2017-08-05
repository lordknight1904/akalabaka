import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';

import { getName, getId, getFollow, getJobHistory, getLikes, getGender } from '../../../App/AppReducer';
import { updateName } from '../../../App/AppActions';

class NameDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      default: this.props.name,
    };
  }

  handleName = (event) => { event.preventDefault(); this.setState({ name: event.target.value }); };
  handleSave = () => {
    const name = {
      id: this.props.id,
      name: this.state.name,
    };
    this.props.dispatch(updateName(name)).then((res) => {
      if(res.user.code == 'success') {
        this.props.handleCloseNameDialog();
      }
    });
  };
  render(){
    const actions = [
      <FlatButton
        label={
          (this.state.default !== this.state.name) ? (
            <FormattedMessage id="save" />
          ) : (
            <FormattedMessage id="cancel" />
          )
        }
        primary={true}
        keyboardFocused={true}
        onTouchTap={
          (this.state.default !== this.state.name) ? (
              this.handleSave
            ) : (
              this.props.handleCloseNameDialog
            )
        }
      />,
    ];
    return (
      <div>
        <Dialog
          title={<span><FormattedMessage id="nameDialog" /></span>}
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          <TextField
            value={this.state.name}
            onChange={this.handleName}
            floatingLabelText={<FormattedMessage id="yourName" />}
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
NameDialog.propTypes = {
  intl: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseNameDialog: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
NameDialog.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(NameDialog);
