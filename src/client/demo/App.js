import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ConfigProvider, Spin } from 'antd';
import store from './redux/store';

// import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';
import 'antd/dist/reset.css';

import { USER_STATUS } from './contants';
import { me } from './redux/authentication/actionCreator';
import SignIn from './container/profile/authentication/overview/SignIn';
import Test from './container/Test';

const { theme } = config;

const ProviderConfig = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { rtl, user, loadingMe, topMenu, darkMode, auth } = useSelector(
    (state) => {
      return {
        darkMode: state.ChangeLayoutMode.data,
        rtl: state.ChangeLayoutMode.rtlData,
        topMenu: state.ChangeLayoutMode.topMenu,
        loadingMe: state.auth.loadingMe,
        user: state.auth.user,
        auth: state.fb.auth,
      };
    }
  );
  const isLoggedIn = user && user.status === USER_STATUS.ACTIVE;
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  const preLoadingApp = async () => {
    dispatch(me());
  };
  useEffect(() => {
    preLoadingApp();
  }, []);
  console.log('isLoggedIn :>> ', isLoggedIn);
  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme }}>
        {loadingMe ? (
          <div className="spin">
            <Spin />
          </div>
        ) : (
          <Router basename={process.env.PUBLIC_URL}>
            {!isLoggedIn ? (
              <Route path="/" component={Auth} />
            ) : (
              <Route path="/admin" component={Test}></Route>
              // <Route path="/admin" component={Admin} />
            )}
            {isLoggedIn &&
              (path === process.env.PUBLIC_URL ||
                path === `${process.env.PUBLIC_URL}/`) && (
                <Redirect to="/admin" />
              )}
          </Router>
        )}
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />;
    </Provider>
  );
}

export default App;
