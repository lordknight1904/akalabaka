import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Banner from '../components/Banner/Banner';
import Floater from '../components/Floater/Floater';
import Setting from '../components/Setting/Setting';

import { fetchUser } from '../UserActions';
import { getBannerUrl } from '../UserReducer';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentWillMount() {
    const location  = this.props.location.pathname;
    console.log(location.substr(location.indexOf('/') + 1));
    this.props.dispatch(fetchUser(location.substr(location.indexOf('/') + 1))).then((res) => {
      this.setState({ loaded: true });
    });
  }
  render(){
    if(this.props.bannerUrl === '') return null;
    return (
      <div className='col-md-12' >
        <div className='col-md-12' >
          <Banner />
        </div>
        <div className='col-md-12 h3' >
          <div className='col-md-4' >
            <Floater />
          </div>
          <div className='col-md-8 h3' >
            <Setting />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bannerUrl: getBannerUrl(state),
  };
}
Profile.propTypes = {
  location: PropTypes.object.isRequired,
  bannerUrl: PropTypes.string.isRequired,
};
Profile.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Profile);
