import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';

import { userLoginRequest } from '../../../../AppActions';

class SignInForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',

      emailError: '',
      passwordError: '',
    };
  }
  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleEmail = (event) => {this.setState({email: event.target.value,})};
  handlePassword = (event) => {this.setState({password: event.target.value,})};
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
  handleLogin = () => {
    if ( this.state.emailError == '' && this.state.passwordError == '' ) {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.dispatch(userLoginRequest(user)).then((res) => {
        switch (res.user.code){
          case 'success': {
            console.log('close');
            this.props.handleCloseAuthForm();
            this.setState({
              emailError: '',
              passwordError: '',
            });
            break;
          }
          case 'Wrong password': {
            this.setState({passwordError: 'Wrong password'});
            break;
          }
          case 'Invalid email': {
            this.setState({emailError: 'Invalid email'});
            break;
          }
        }
      });
    }
  };
  render(){
    return (
      <div>
        <TextField
          floatingLabelText={<FormattedMessage id="email"/>}
          onChange={this.handleEmail}
          fullWidth={true}
          errorText={this.state.emailError}
          onBlur={this.handleEmailBlur}
        /><br />
        <TextField
          floatingLabelText={<FormattedMessage id="password"/>}
          onChange={this.handlePassword}
          fullWidth={true}
          errorText={this.state.passwordError}
          onBlur={this.handlePasswordBlur}
        /><br />
        <RaisedButton label={<FormattedMessage id="signIn"/>} fullWidth={true} onTouchTap={this.handleLogin} />
      </div>
    );
  }
}


SignInForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleCloseAuthForm: PropTypes.func.isRequired,
};
SignInForm.contextTypes = {
  router: PropTypes.object,
};

export default SignInForm;
