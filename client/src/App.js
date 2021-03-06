import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import theme from './theme';
import { getUser } from './actions';


const App = () => {
  const token = localStorage.getItem('token') || null;
  const dispatch = useDispatch();
  const { email } = useSelector(state => state.user);

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, []);

  let routes = (
    <Switch>
      <Route path="/register" component={SignUp} />
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  );

  if (email) {
    routes = (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Redirect to="/home" />
      </Switch>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
          <Dashboard>
            {routes}
          </Dashboard>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
