import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from '../../../styles.css'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import styles from '../../../../App/App.css';
import { FormattedMessage } from 'react-intl';
import Divider from 'material-ui/Divider';

import { getReading, getListening, getWriting, getSpeaking, getId } from '../../../../App/AppReducer';
import { updateMarks } from '../../../../App/AppActions';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Marks extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  handleReading = (event, index, value) => {
    const marks = {
      id: this.props.id,
      reading: value,
      writing: this.props.writing,
      listening: this.props.listening,
      speaking: this.props.speaking,
    };
    this.props.dispatch(updateMarks(marks)).then((res) => {
      console.log(res);
    })
  };
  handleListening = (event, index, value) => {
    const marks = {
      id: this.props.id,
      reading: this.props.reading,
      writing: this.props.writing,
      listening: value,
      speaking: this.props.speaking,
    };
    this.props.dispatch(updateMarks(marks)).then((res) => {
      console.log(res);
    })
  };
  handleSpeaking = (event, index, value) => {
    const marks = {
      id: this.props.id,
      reading: this.props.reading,
      writing: this.props.writing,
      listening: this.props.listening,
      speaking: value,
    };
    this.props.dispatch(updateMarks(marks)).then((res) => {
      console.log(res);
    })
  };
  handleWriting= (event, index, value) => {
    const marks = {
      id: this.props.id,
      reading: this.props.reading,
      writing: value,
      listening: this.props.listening,
      speaking: this.props.speaking,
    };
    this.props.dispatch(updateMarks(marks)).then((res) => {
      console.log(res);
    })
  };
  render(){
    let items = [];
    for (let i = 4.5; i <= 9.2; i=i+0.5 ) {
      items.push(<MenuItem value={i.toString()} key={i} primaryText={i} />);
    }
    return (
      <Card expanded onExpandChange={this.handleEdit} style={{ marginBottom: '20px' }}  >
        <CardHeader
          style={{fontWeight: 'bold'}}
          title={<FormattedMessage id='marks' />}
        />
        <CardText>
          Reading:
          <DropDownMenu value={this.props.reading} onChange={this.handleReading}>
            {items}
          </DropDownMenu>
          Listening:
          <DropDownMenu value={this.props.listening} onChange={this.handleListening}>
            {items}
          </DropDownMenu>
          Speaking:
          <DropDownMenu value={this.props.speaking} onChange={this.handleSpeaking}>
            {items}
          </DropDownMenu>
          Writing:
          <DropDownMenu value={this.props.writing} onChange={this.handleWriting}>
            {items}
          </DropDownMenu>
        </CardText>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    id: getId(state),
    reading: getReading(state),
    listening: getListening(state),
    writing: getWriting(state),
    speaking: getSpeaking(state),
  };
}
Marks.propTypes = {
  intl: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  reading: PropTypes.string.isRequired,
  listening: PropTypes.string.isRequired,
  writing: PropTypes.string.isRequired,
  speaking: PropTypes.string.isRequired,
};
Marks.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Marks);
