import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Banner from '../components/Banner/Banner';
import Floater from '../components/Floater/Floater';
import Setting from '../components/Setting/Setting';

import { getId } from '../../App/AppReducer';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render(){
    if(this.props.id === '') return null;
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
    id: getId(state),
  };
}
Profile.propTypes = {
  id: PropTypes.string.isRequired,
};
Profile.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Profile);
