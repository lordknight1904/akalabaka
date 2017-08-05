import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Result from '../components/Result';

import { getSearch } from '../../App/AppReducer';

class SearchResults extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render(){
    return (
      <div className='col-md-8 col-md-offset-2' style={{ marginBottom: '30px' }} >
        {
          this.props.search.map((user, index) => (
            <Result key={index} user={user} />
          ))
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    search: getSearch(state),
  };
}
SearchResults.propTypes = {
  intl: PropTypes.object.isRequired,
  search: PropTypes.array.isRequired,
};
SearchResults.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(SearchResults);
