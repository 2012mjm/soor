import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import configStore from "../../lib/configureStore";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { loggedIn } from "../../actions/auth";
import { setAuthorizationToken } from "../../lib/utils";
import MainAdminScreen from "../Admin/Main/MainScreen";
// import AdminLoginScreen from '../Admin/Login/LoginScreen'
import InitialScreen from "../InitialScreen";
import theme from './theme'

class App extends Component {
  constructor(props) {
    super(props);
    const { store, history } = configStore();
    this.state = {
      store: store,
      history: history
    };
  }

  componentWillMount() {
    if (window.localStorage.auth) {
      const auth = JSON.parse(window.localStorage.auth);
      setAuthorizationToken(auth.token);
      this.state.store.dispatch(loggedIn(auth));
    }
  }

  render() {
    const { history, store } = this.state;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <div>
              <Route path="/" exact component={InitialScreen} />
              {/* <Route path="/admin/login" exact component={AdminLoginScreen} /> */}
              <Route path="/admin" component={MainAdminScreen} />
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
