import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import 'antd/dist/antd.less';
import actions from './redux/authentication/actions';
import { serverFunctions } from '../utils/serverFunctions';

const { theme } = config;

function ProviderConfig() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, topMenu, darkMode } = useSelector((state) => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  const getUser = async () => {
    const username = localStorage.getItem('username');
    if (username) {
      const range = 'user!A2:C';
      const result = await serverFunctions.mainReadData(
        '1QChy36UZeI144jl5NrCASWJsi5s74M28F1iwfcYInnE',
        range
      );
      const match = result.find((item) => item[1] === username);

      dispatch(actions.loginSuccess({ id: match[0], username }));
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     history.push('/admin');
  //   }
  // }, [isLoggedIn]);
  return (
    <ConfigProvider>
      <ThemeProvider theme={{ ...theme, topMenu, darkMode }}>
        {!isLoggedIn ? (
          <Route path="/" component={Auth} />
        ) : (
          <ProtectedRoute path="/admin" component={Admin} />
        )}
        {isLoggedIn &&
          (path === process.env.PUBLIC_URL ||
            path === `${process.env.PUBLIC_URL}/`) && <Redirect to="/admin" />}
      </ThemeProvider>
    </ConfigProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={2000}>
        <Router basename={process.env.PUBLIC_URL}>
          <ProviderConfig />
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
