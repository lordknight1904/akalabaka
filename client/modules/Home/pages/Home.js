import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Typeahead } from 'react-bootstrap-typeahead';
import { InputGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  handleChange = (e) => {
    e.preventDefault();

  };
  handleSearch = (e) => {

  };
  render() {
    const myData = [
      'abc',
      'def'
    ];
    return (
      <div>

        yo
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
// PostListPage.need = [() => { return fetchPosts(); }];

function mapStateToProps(state) {
  return {
  };
}

Home.propTypes = {
};

Home.contextTypes = {
};

export default connect(mapStateToProps)(Home);
