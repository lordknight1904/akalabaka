import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';

import { getReading, getListening, getWriting, getSpeaking, getId } from '../../../../App/AppReducer';
import MenuItem from 'material-ui/MenuItem';

import { Col } from 'react-bootstrap';
class Marks extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
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
          <Col md={3}>
            Reading: {this.props.reading}
          </Col>
          <Col md={3}>
            Listening: {this.props.listening}
          </Col>
          <Col md={3}>
            Speaking:{this.props.speaking}
          </Col>
          <Col md={3}>
            Writing:{this.props.writing}
          </Col>
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
