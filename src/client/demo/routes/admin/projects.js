import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Project from '../../container/project/Project';

function ProjectRoutes() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/view`} component={Project} />
    </Switch>
  );
}

export default ProjectRoutes;
