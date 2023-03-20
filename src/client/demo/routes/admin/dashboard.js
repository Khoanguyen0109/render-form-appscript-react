import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

import Dashboard from '../../container/dashboard';
import Project from '../../container/project/Project';

function DashboardRoutes() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Project} />
    </Switch>
  );
}

export default DashboardRoutes;
