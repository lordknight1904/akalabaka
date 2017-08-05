import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import styles from '../../../App/App.css';
import { FormattedMessage } from 'react-intl';
import About from './About/About';
import JobHistory from './JobHistory/JobHistory';
import Marks from './Marks/Marks';
import Checkbox from 'material-ui/Checkbox';

import { getIsStudent, getTeachingAbility, getId } from '../../../App/AppReducer';
import { updateIsStudent, updateTeachAbility } from '../../../App/AppActions';

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
  handleCheckIsStudent = (event, isInputChecked) => {
    const isStudent = {
      id: this.props.id,
      isStudent: isInputChecked
    };
    this.props.dispatch(updateIsStudent(isStudent));
  };
  handleTeachingAbility = (event, isInputChecked) => {
    const teachingAbility = {
      id: this.props.id,
      teachingAbility: isInputChecked
    };
    this.props.dispatch(updateTeachAbility(teachingAbility));
  };
  render(){
    return (
      <div>
        <About />
        <div style={{ marginTop: '20px', marginBottom: '20px' }}></div>
        <Checkbox
          label={<FormattedMessage id="certificate" />}
          checked={this.props.isStudent}
          onCheck={this.handleCheckIsStudent}
        />
        {
          (this.props.isStudent) ? (
              <Marks />
            ) : ''
        }
        <Checkbox
          label={<FormattedMessage id="teachingAbility" />}
          checked={this.props.teachingAbility}
          onCheck={this.handleTeachingAbility}
        />
        {
          (this.props.teachingAbility) ? (
              <JobHistory />
            ) : ''
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    id: getId(state),
    isStudent: getIsStudent(state),
    teachingAbility: getTeachingAbility(state),
  };
}
Setting.propTypes = {
  id: PropTypes.string.isRequired,
  isStudent: PropTypes.bool.isRequired,
  teachingAbility: PropTypes.bool.isRequired,
};
Setting.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Setting);
