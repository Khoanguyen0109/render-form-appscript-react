import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';
import Login from '../container/profile/authentication/overview/SignIn';
import SignUp from '../container/profile/authentication/overview/Signup';
import ForgotPass from '../container/profile/authentication/overview/ForgotPassword';

function NotFound() {
  return <Redirect to="/" />;
}

function FrontendRoutes() {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        {/* <Route exact path="/forgotPassword" component={ForgotPass} />
        <Route exact path="/register" component={SignUp} /> */}
        <Route exact path="/" component={Login} />
        <Route exact path="*" component={NotFound} />
      </Suspense>
    </Switch>
  );
}

export default AuthLayout(FrontendRoutes);
