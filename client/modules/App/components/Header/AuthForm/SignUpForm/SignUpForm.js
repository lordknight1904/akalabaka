import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';

import { createUserRequest, facebookLogin } from '../../../../AppActions';

class SignUpForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',

      emailError: '',
      passwordError: '',
      passwordConfirmationError: '',
    };
  }
  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleSignUp = () => {
    if(this.state.emailError == '' && this.state.passwordError == '' && this.state.passwordConfirmationError == '') {
      const newUser = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.dispatch(createUserRequest(newUser)).then((res) => {
        if(res.user.code == 'success') this.props.handleCloseAuthForm();
      });
    }
  };
  handleEmail = (event) => {this.setState({email: event.target.value,})};
  handlePassword = (event) => {this.setState({password: event.target.value,})};
  handlePasswordConfirmation = (event) => {this.setState({passwordConfirmation: event.target.value,})};
  handleEmailBlur = () => {
    if(this.state.email != '') {
      this.setState({emailError: ''});
      if (!this.validateEmail(this.state.email)) this.setState({emailError: 'emailValidation'}); else this.setState({emailError: ''});
    } else this.setState({emailError: 'isRequired'});
  };
  handlePasswordBlur = () => {
    if(this.state.password == '') this.setState({passwordError: 'isRequired'});
    else this.setState({passwordError: ''});
  };
  handlePasswordConfirmationBlur = () => {
    if(this.state.passwordConfirmation != '') {
      this.setState({passwordConfirmationError: ''});
      if (this.state.password != this.state.passwordConfirmation)
        this.setState({passwordConfirmationError: 'passwordDifferent'});
      else this.setState({passwordConfirmationError: ''});
    } else this.setState({passwordConfirmationError: 'isRequired'});
  };
  handleFacebook = () => {
    this.props.dispatch(facebookLogin()).then((res) => {
      if(res.code == 'success') {
        this.props.handleCloseAuthForm();
      }
    });
  };
  render(){
    return (
      <div>
        <TextField
          floatingLabelText={<FormattedMessage id="email"/>}
          onChange={this.handleEmail}
          fullWidth={true}
          errorText={(this.state.emailError != '') ? <FormattedMessage id={this.state.emailError}/> : '' }
          onBlur={this.handleEmailBlur}
        /><br />
        <TextField
          floatingLabelText={<FormattedMessage id="password"/>}
          onChange={this.handlePassword}
          fullWidth={true}
          errorText={(this.state.passwordError != '') ? <FormattedMessage id={this.state.passwordError} /> : ''}
          onBlur={this.handlePasswordBlur}
        /><br />
        <TextField
          floatingLabelText={<FormattedMessage id="passwordConfirmation"/>}
          onChange={this.handlePasswordConfirmation}
          fullWidth={true}
          errorText={(this.state.passwordConfirmationError != '') ? <FormattedMessage id={this.state.passwordConfirmationError} /> : ''}
          onBlur={this.handlePasswordConfirmationBlur}
        /><br />
        <RaisedButton label={<FormattedMessage id="signUp"/>} fullWidth={true} onTouchTap={this.handleSignUp}/>
        <br />
        <FormattedMessage id="or" style={{height: '50px', align: 'center'}}/><br />
        <RaisedButton label={<FormattedMessage id="facebook"/>} onTouchTap={this.handleFacebook} fullWidth={true} />
        <br />
      </div>
    );
  }
}


SignUpForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleCloseAuthForm: PropTypes.func.isRequired,
};
SignUpForm.contextTypes = {
  router: PropTypes.object,
};

export default SignUpForm;
