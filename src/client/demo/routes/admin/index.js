import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from './dashboard';
import withAdminLayout from '../../layout/withAdminLayout';
import FormDetail2 from '../../container/project/FormDetail2';
import FormDetail from '../../container/project/FormDetail';

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Dashboard}></Route>
      <Route
        exact
        path={`/admin/:formId`}
        render={() => <FormDetail />}
      ></Route>
    </Switch>
  );
};

export default withAdminLayout(Admin);
