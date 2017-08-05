import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBannerUrl } from '../../UserReducer';

class Banner extends Component{
  constructor(props){
    super(props);
  }
  render(){
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
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
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
