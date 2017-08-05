import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from '../../../styles.css'
import styles from '../../../../App/App.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import { getId } from '../../../../App/AppReducer';
import { updateJobHistory } from '../../../../App/AppActions';

class JobHistoryEdit extends Component{
  constructor(props){
    super(props);
    this.state = {
      isEdit: false,
      from: '',
      to: '',
      job: '',
      workPlace: '',
    };
  }

  handleJob = (event) => {this.setState({ job: event.target.value }); };
  handleWorkPlace = (event) => {this.setState({ workPlace: event.target.value }); };
  handleFrom = (event, date) => {this.setState({ from: date.toISOString() }); };
  handleTo= (event, date) => {this.setState({ to: date.toISOString() }); };
  handleSave = () => {
    const jobHistory = {
      id: this.props.id,
      job: this.state.job,
      workPlace: this.state.workPlace,
      from: this.state.from,
      to: this.state.to,
    };
    this.props.dispatch(updateJobHistory(jobHistory)).then((res) => {
      if(res.user.code == 'success') {
        this.setState({ isEdit: false });
        this.props.handleEdit();
      }
    })
  };
  render(){
    return (
      <Paper zDepth={2}>
        <div
          className={style.datesNewlineOne}
        >
          <TextField
            hintText="Job"
            onChange={this.handleJob}
            style={{ width: '35%', marginRight: '20px', marginLeft: '20px' }}
          />
          <TextField
            hintText="Workplace"
            onChange={this.handleWorkPlace}
            style={{ width: '35%', marginRight: '20px' }}
          />
        </div>
        <div
          className={style.datesNewlineTwo}
        >
          <DatePicker
            textFieldStyle={{ width: '80%' }}
            style={{ width: '35%', marginRight: '20px', marginLeft: '20px', display: 'inline-block' }}
            hintText="From"
            container="inline"
            mode="landscape"
            onChange={this.handleFrom}
          />
          <DatePicker
            textFieldStyle={{ width: '80%' }}
            style={{ width: '35%', display: 'inline-block' }}
            hintText="To"
            container="inline"
            mode="landscape"
            onChange={this.handleTo}
            minDate={new Date(this.state.from)}
          />
          <IconButton
            style={{ display: 'inline-block' }}
            tooltip="Save"
            onTouchTap={this.handleSave}
          >
            <i className={`material-icons ${styles.size18}`}>input</i>
          </IconButton>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: getId(state),
  };
}
JobHistoryEdit.propTypes = {
  id: PropTypes.string.isRequired,

  handleEdit: PropTypes.func.isRequired,
};
JobHistoryEdit.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(JobHistoryEdit);
