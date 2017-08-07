import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Result from '../components/Result';
import { Pagination } from 'react-bootstrap';

import { getSearch, getCurrentPage, getPages } from '../../App/AppReducer';
import { currentPage } from '../../App/AppActions';

class SearchResults extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  handleSelect = (eventKey) => {
    this.props.dispatch(currentPage(eventKey));
  };
  render(){
    return (
      <div className='col-md-8 col-md-offset-2' style={{ marginBottom: '30px' }} >
        <div>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={this.props.pages}
            maxButtons={5}
            activePage={this.props.currentPage}
            onSelect={this.handleSelect}
          />
        </div>
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
    currentPage: getCurrentPage(state),
    pages: getPages(state),
  };
}
SearchResults.propTypes = {
  intl: PropTypes.object.isRequired,
  search: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};
SearchResults.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(SearchResults);
