import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';

import { getAddress, getId, getCities, getDistricts2 } from '../../../App/AppReducer';
import { updateAddress, fetchCity, fetchDistrict2 } from '../../../App/AppActions';

class AddressDialog extends Component{
  constructor(props){
    super(props);
    this.state = {
      address: this.props.address,

      city: this.props.address.city,
      district: this.props.address.district,

      default: this.props.address.city,
      default2: this.props.address.district,
    };
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   this.setState({ city: nextProps.city, district: nextProps.district });
  // }
  componentWillMount() {
    this.props.dispatch(fetchCity());
  }
  componentDidMount() {
    if (this.props.address.city !== '') {
      this.props.dispatch(fetchDistrict2(this.props.cities.filter((city) => { return city.value === this.props.address.city})[0]._id));
    }
  }
  handleAddress = (event) => { event.preventDefault(); this.setState({ address: event.target.value }); };
  handleSave = () => {
    const address = {
      id: this.props.id,
      city: this.state.city,
      district: this.state.district,
    };
    console.log(address);
    this.props.dispatch(updateAddress(address)).then((res) => {
      if(res.user.code == 'success') {
        this.props.handleCloseAddressDialog();
      }
    });
  };

  handleCity = (event, index, value) => {
    this.setState({ city: value });
    this.props.dispatch(fetchDistrict2(this.props.cities.filter((city) => { return city.value === value})[0]._id));
  };
  handleDistrict = (event, index, value) => this.setState({ district: value });
  render(){
    const actions = [
      <FlatButton
        label={
          (this.state.default !== this.state.city || this.state.default2 !== this.state.district) ? (
              <FormattedMessage id="save" />
            ) : (
              <FormattedMessage id="cancel" />
            )
        }
        primary={true}
        keyboardFocused={true}
        onTouchTap={
          (this.state.default !== this.state.city || this.state.default2 !== this.state.district) ? (
              this.handleSave
            ) : (
              this.props.handleCloseAddressDialog
            )
        }
      />,
    ];
    return (
      <div>
        <Dialog
          title={<span><FormattedMessage id="addressDialog" /></span>}
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          <DropDownMenu
            value={this.state.city}
            onChange={this.handleCity}
            autoWidth={false}
          >
            {
              this.props.cities.map((city, index) => (
                <MenuItem key={index} value={city.value} primaryText={<FormattedMessage id={city.value} />} />
              ))
            }
          </DropDownMenu>

          <DropDownMenu
            value={this.state.district}
            onChange={this.handleDistrict}
            autoWidth={false}
          >
            {
              this.props.districts.map((district, index) => (
                <MenuItem key={index} value={district.value} primaryText={<FormattedMessage id={district.value} />} />
              ))
            }
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
    cities: getCities(state),
    districts: getDistricts2(state),
  };
}
AddressDialog.propTypes = {
  intl: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseAddressDialog: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  cities: PropTypes.array.isRequired,
  districts: PropTypes.array.isRequired,
};
AddressDialog.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(AddressDialog);
