import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { FormattedMessage } from 'react-intl';

import { getName, getId, getFollow, getJobHistory, getLikes, getGender } from '../../../App/AppReducer';
import { updateGender } from '../../../App/AppActions';

class GenderDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      gender: this.props.gender,
      default: this.props.gender,
    };
  }


  handleGender = (event, index, value) => this.setState({ gender: value });
  handleSave = () => {
    const gender = {
      id: this.props.id,
      gender: this.state.gender,
    };
    this.props.dispatch(updateGender(gender)).then((res) => {
      if(res.user.code == 'success') {
        this.props.handleCloseGenderDialog();
      }
    });
  };
  render(){
    const actions = [
      <FlatButton
        label={
          (this.state.default !== this.state.gender) ? (
              <FormattedMessage id="save" />
            ) : (
              <FormattedMessage id="cancel" />
            )
        }
        primary={true}
        keyboardFocused={true}
        onTouchTap={
          (this.state.default !== this.state.gender) ? (
              this.handleSave
            ) : (
              this.props.handleCloseGenderDialog
            )
        }
      />,
    ];
    return (
      <div>
        <Dialog
          title={<span><FormattedMessage id="genderDialog" /></span>}
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          <DropDownMenu
            value={this.state.gender}
            onChange={this.handleGender}
            autoWidth={false}
          >
            <MenuItem value="male" primaryText={<FormattedMessage id="male" />} />
            <MenuItem value="female" primaryText={<FormattedMessage id="female" />} />
          </DropDownMenu>
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
GenderDialog.propTypes = {
  intl: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseGenderDialog: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
GenderDialog.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(GenderDialog);
