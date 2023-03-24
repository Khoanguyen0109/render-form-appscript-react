import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

import Dashboard from '../../container/dashboard';
import FormDetail from '../../container/project/FormDetail';
import DetailTab from '../../container/project/overview/DetailTab';
import Project from '../../container/project/Project';

function DashboardRoutes() {
  const { path } = useRouteMatch();
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('list :>> ', list);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://script.google.com/macros/s/AKfycbwc6zsfumMrVjMwaSnku8NZxL2t5WJjtBK2LlXSkzx1CGptTvtjc4EBl5sBxnYqXJdgXQ/exec'
      );
      setData(res.data.data);
      const unique = [
        ...new Map(res.data.data.map((item) => [item.idform, item])).values(),
      ];
      setList(unique);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  console.log('path :>> ', path);
  useEffect(() => {
    getList();
  }, []);
  return (
    <Switch>
      <Route
        exact
        path={path}
        component={() => (
          <Project
            list={list}
            setList={setList}
            loading={loading}
          />
        )}
      />
      <Route
        exact
        path={`${path}/:formId`}
        component={() => (
          <FormDetail data={data} loading={loading} />
        )}
      />
    </Switch>
  );
}

export default DashboardRoutes;
