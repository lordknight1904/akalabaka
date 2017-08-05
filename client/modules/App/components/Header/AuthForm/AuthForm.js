import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { FormattedMessage } from 'react-intl';

import SignInForm from './SignInForm/SignInForm';
import SignUpForm from './SignUpForm/SignUpForm';

import localStorage from 'localStorage';

import { reloginAttempt } from '../../../AppActions';

class AuthForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      isSignUp: true,
    };
  }
  componentWillMount() {
    if(localStorage.getItem('token') != null) {
      this.props.dispatch(reloginAttempt(localStorage.getItem('token'))).then((res) => {
        if(res.user === 'none'
        ) {
          this.context.router.push('/');
        }
      });
    }
  }
  handleOpenSignUp = () => {this.setState({isSignUp: true})};
  handleOpenSignIn = () => {this.setState({isSignUp: false})};
  render(){
    return (
      <div>
        <Dialog
          open={this.props.open}
          onRequestClose={this.props.handleCloseAuthForm}
        >
          <div className='row'>
            <div className='col-md-6'>
              <FlatButton
                label={<FormattedMessage id="signUp"/>}
                onTouchTap={this.handleOpenSignUp}
                fullWidth={true}
              />
            </div>
            <div className='col-md-6'>
              <FlatButton
                label={<FormattedMessage id="signIn"/>}
                onTouchTap={this.handleOpenSignIn}
                fullWidth={true}
              />
            </div>
          </div>
          <div className='row'>
            {
              (this.state.isSignUp) ? (
                <SignUpForm
                  dispatch={this.props.dispatch}
                  handleCloseAuthForm={this.props.handleCloseAuthForm}
                />
                ) : ( <SignInForm
                  dispatch={this.props.dispatch}
                  handleCloseAuthForm={this.props.handleCloseAuthForm}
                /> )
            }
          </div>
        </Dialog>
      </div>
    );
  }
}


AuthForm.propTypes = {
  intl: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseAuthForm: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
AuthForm.contextTypes = {
  router: PropTypes.object,
};

export default AuthForm;
