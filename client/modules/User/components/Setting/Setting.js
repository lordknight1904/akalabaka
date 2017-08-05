import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import About from './About/About';
import JobHistory from './JobHistory/JobHistory';
import Marks from './Marks/Marks';
import Checkbox from 'material-ui/Checkbox';

import { getIsStudent, getTeachingAbility } from '../../UserReducer';

const style = {
  marginLeft: 20,
  marginRight: 20,
};
class Setting extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  handleEdit = () => {
    console.log('click');
  };
  render(){
    return (
      <div>
        <About />
        <div style={{ marginTop: '20px', marginBottom: '20px' }}></div>
        <Marks />
        <JobHistory />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    isStudent: getIsStudent(state),
    teachingAbility: getTeachingAbility(state),
  };
}
Setting.propTypes = {
  isStudent: PropTypes.bool.isRequired,
  teachingAbility: PropTypes.bool.isRequired,
};
Setting.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Setting);
