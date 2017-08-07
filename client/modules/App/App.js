import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import Footer from './components/Footer/Footer';
import SocketController from './components/SocketController';

import ChatFrame from '../../components/ChatFrame/ChatFrame';

// Import Actions
import { fetchCity } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
    this.muiThemeSetting = getMuiTheme(null, { userAgent: 'all' });
  }
  componentWillMount() {
    this.props.dispatch(fetchCity());
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiThemeSetting}>
        <div style={{ height: '100%' }} >
          {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
          <SocketController />
          <div className='col-md-12' style={{ minHeight: '100%', position: 'relative', paddingLeft: '0px', paddingRight: '0px' }} >
            <div className='col-md-12' >
              <Helmet
                title="Ielts Speaking Meetup"
                titleTemplate="%s - Beta"
                meta={[
                  { charset: 'utf-8' },
                  {
                    'http-equiv': 'X-UA-Compatible',
                    content: 'IE=edge',
                  },
                  {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                  },
                ]}
              />
            </div>
            <Header
              switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
              intl={this.props.intl}
              dispatch={this.props.dispatch}
            />
            <SearchBar />
            <div className='col-md-12' style={{ marginBottom: '50px' }} >
              {this.props.children}
            </div>
            <div className='col-md-12'
               style={{
                 position: 'absolute',
                 bottom: '0',
                 width: '100%',
                 background: 'lightblue', }}
            >
              <Footer />
            </div>
            {/*<ChatFrame />*/}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
