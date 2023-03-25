import { Spin } from 'antd';
import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import FormDetail2 from '../../container/project/FormDetail2';

// import FormDetail from '../../container/project/FormDetail';
// import DetailTab from '../../container/project/overview/DetailTab';
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
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        {/* <Route exact path={`${path}/:formId`} component={FormDetail2} /> */}
        <Route
          exact
          path={path}
          render={() => (
            <Project list={list} setList={setList} loading={loading} />
          )}
          // render={() => <FormDetail2 />}
        />
        {/* <Route
          exact
          path={`${path}/:formId`}
          render={() => <FormDetail2 />}
        ></Route> */}
      </Suspense>
    </Switch>
  );
}

export default DashboardRoutes;
