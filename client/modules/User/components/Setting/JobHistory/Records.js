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

class Records extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }
  render(){
    const history = this.props.history;
    const from = new Date(history.from);
    const to = new Date(history.to);
    return (
      <div>
        {history.job} at {history.workPlace} from {from.getMonth() + '/' + from.getYear()} to {to.getMonth() + '/' + to.getFullYear()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}
Records.propTypes = {
  history: PropTypes.object.isRequired,
};
Records.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Records);
