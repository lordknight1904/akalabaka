import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import styles from '../../../../App/App.css';
import { FormattedMessage } from 'react-intl';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

import { getAbout, getId } from '../../../../App/AppReducer';
import { updateAbout } from '../../../../App/AppActions';

const style = {
  marginLeft: 20,
  marginRight: 20,
};
class About extends Component{
  constructor(props){
    super(props);
    this.state = {
      isEdit: false,
      about: this.props.about,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ about: nextProps.about });
  }
  render(){
    return (
      <Card expanded>
        <CardHeader
          style={{fontWeight: 'bold'}}
          title={<FormattedMessage id='about' />}
          showExpandableButton={false}
        />
        <Divider />
        <CardText expandable={true}>
          {
            (this.props.about)
          }
        </CardText>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    about: getAbout(state),
    id: getId(state),
    intl: state.intl,
  };
}
About.propTypes = {
  intl: PropTypes.object.isRequired,
  about: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
About.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(About);
