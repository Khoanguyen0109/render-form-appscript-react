import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Row, Col, Pagination, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import GridCard from './GridCard';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { ProjectPagination } from '../style';

function Grid(props) {
  const { data, loading } = props;
  const project = useSelector((state) => state.projects.data);
  const [state, setState] = useState({
    projects: project,
    current: 0,
    pageSize: 0,
  });
  const { projects } = state;

  useEffect(() => {
    if (project) {
      setState({
        projects: project,
      });
    }
  }, [project]);

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  return (
    <Row gutter={25}>
      {loading ? (
        [...Array(10).keys()].map((key) => (
          <Cards key={key} headless>
            <Skeleton active />
          </Cards>
        ))
      ) : data.length ? (
        data.map((value) => {
          return (
            <Col key={value.id} xl={8} md={12} xs={24}>
              <GridCard value={value} />
              {/* <div>list</div> */}
            </Col>
          );
        })
      ) : (
        <Col md={24}>
          <Cards headless>
            <Heading>Data Not Found!</Heading>
          </Cards>
        </Col>
      )}
    </Row>
  );
}

export default Grid;
