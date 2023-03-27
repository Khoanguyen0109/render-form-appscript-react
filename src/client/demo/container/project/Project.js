import React, { useState, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, Select, Input } from 'antd';
import { Switch, NavLink, Route, Link, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import axios from 'axios';
import { debounce } from 'lodash';
import { ProjectHeader, ProjectSorting } from './style';
import Grid from './overview/Grid';
import List from './overview/List';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';

const { Search } = Input;

function Project(props) {
  const { path } = useRouteMatch();
  const { list, loading } = props;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [data, setData] = useState(list);
  const onChangeCategory = (value) => {
    setCategory(value);
  };

  const onSearch = (value) => {
    // setSearch(value);
    if (value) {
      setData(list.filter((d) => d.name_form.toLowerCase().includes(value.toLowerCase())));
    } else {
      setData(list);
    }
  };
  useEffect(() => {
    setData(list);
  }, [list]);

  return (
    <>
      <ProjectHeader>
        <PageHeader
          ghost
          title="Biểu mẫu"
          subTitle={<>Tổng số biểu mẫu {data.length}</>}
        />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <ProjectSorting>
              <div className="project-sort-bar">
                <div className="project-sort-nav">
                  <nav>
                    <ul>
                      <li
                        className={category === 'all' ? 'active' : 'deactivate'}
                      >
                        <Link onClick={() => onChangeCategory('all')} to="#">
                          All
                        </Link>
                      </li>
                      <li
                        className={
                          category === 'progress' ? 'active' : 'deactivate'
                        }
                      >
                        <Link
                          onClick={() => onChangeCategory('progress')}
                          to="#"
                        >
                          In Progress
                        </Link>
                      </li>
                      <li
                        className={
                          category === 'complete' ? 'active' : 'deactivate'
                        }
                      >
                        <Link
                          onClick={() => onChangeCategory('complete')}
                          to="#"
                        >
                          Complete
                        </Link>
                      </li>
                      <li
                        className={
                          category === 'late' ? 'active' : 'deactivate'
                        }
                      >
                        <Link onClick={() => onChangeCategory('late')} to="#">
                          Late
                        </Link>
                      </li>
                      <li
                        className={
                          category === 'early' ? 'active' : 'deactivate'
                        }
                      >
                        <Link onClick={() => onChangeCategory('early')} to="#">
                          Early
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="project-sort-search">
                  <Search
                    // value={search}
                    onSearch={onSearch}
                    placeholder="Tìm kiếm"
                    patterns
                    allowClear
                  />
                </div>
                <div className="project-sort-group">
                  <div className="sort-group">
                    {/* <span>Sort By:</span>
                    <Select onChange={onSorting} defaultValue="category">
                      <Select.Option value="category">
                        Project Category
                      </Select.Option>
                      <Select.Option value="rate">Top Rated</Select.Option>
                      <Select.Option value="popular">Popular</Select.Option>
                      <Select.Option value="time">Newest</Select.Option>
                      <Select.Option value="price">Price</Select.Option>
                    </Select> */}
                    <div className="layout-style">
                      <NavLink to={`${path}/grid`}>
                        <FeatherIcon icon="grid" size={16} />
                      </NavLink>
                      <NavLink to={`${path}/list`}>
                        <FeatherIcon icon="list" size={16} />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </ProjectSorting>
            <div>
              <Grid data={data} {...props} />
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
}

Project.propTypes = {
  match: propTypes.object,
};

export default Project;
