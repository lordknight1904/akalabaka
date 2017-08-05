import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { FormattedMessage } from 'react-intl';

import { getName, getId, getFollow, getJobHistory, getLikes, getGender } from '../../../App/AppReducer';
import { updateYearOfBirth } from '../../../App/AppActions';

class YearOfBirthDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      yearOfBirth: this.props.yearOfBirth,
      default: this.props.yearOfBirth,
    };
  }

  handleYearOfBirth = (event, index, value) => this.setState({ yearOfBirth: value });
  handleSave = () => {
    const yearOfBirth = {
      id: this.props.id,
      yearOfBirth: this.state.yearOfBirth,
    };
    this.props.dispatch(updateYearOfBirth(yearOfBirth)).then((res) => {
      if(res.user.code == 'success') {
        this.props.handleCloseYearOfBirthDialog();
      }
    });
  };
  render(){
    const today = new Date();
    const maxYear = today.getFullYear();
    const items = [];
    for (let i = 1980; i < maxYear; i++ ) {
      items.push(<MenuItem value={i.toString()} key={i} primaryText={i} />);
    }
    const actions = [
      <FlatButton
        label={
          (this.state.default !== this.state.yearOfBirth) ? (
              <FormattedMessage id="save" />
            ) : (
              <FormattedMessage id="cancel" />
            )
        }
        primary={true}
        keyboardFocused={true}
        onTouchTap={
          (this.state.default !== this.state.yearOfBirth) ? (
              this.handleSave
            ) : (
              this.props.handleCloseYearOfBirthDialog
            )
        }
      />,
    ];
    return (
      <div>
        <Dialog
          title={<span><FormattedMessage id="yearOfBirthDialog" /></span>}
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          <DropDownMenu maxHeight={300} value={this.state.yearOfBirth} onChange={this.handleYearOfBirth}>
            {items}
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
YearOfBirthDialog.propTypes = {
  intl: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseYearOfBirthDialog: PropTypes.func.isRequired,
  yearOfBirth: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
YearOfBirthDialog.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(YearOfBirthDialog);
