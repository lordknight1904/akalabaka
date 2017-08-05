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
  handleAbout = (event) => { event.preventDefault(); this.setState({ about: event.target.value }); };
  handleEdit = () => {this.setState({isEdit: !this.state.isEdit});};
  handleSave = () => {
    const about = {
      id: this.props.id,
      about: this.state.about,
    };
    this.props.dispatch(updateAbout(about)).then((res) => {
      if(res.user.code == 'success') {
        this.setState({ isEdit: false });
      }
    });
  };
  render(){
    return (
      <Card expanded onExpandChange={this.handleEdit}>
        <CardHeader
          style={{fontWeight: 'bold'}}
          title={<FormattedMessage id='about' />}
          showExpandableButton
          openIcon={
            <i className={`material-icons ${styles.size18}`}>mode_edit</i>
          }
        />
        <Divider />
        <CardText expandable={true}>
          {
            (this.state.isEdit) ? (
              <div>
                <TextField
                  value={this.state.about}
                  onChange={this.handleAbout}
                  floatingLabelText={<FormattedMessage id='editAbout' />}
                  fullWidth
                  multiLine={true}
                  rows={2}
                />
                <div style={{ textAlign: 'right' }} >
                  <IconButton
                    tooltip="Save"
                    onTouchTap={this.handleSave}
                  >
                    <i className={`material-icons ${styles.size18}`}>input</i>
                  </IconButton>
                </div>
              </div>
              ) : (this.props.about)
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
