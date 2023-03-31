import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import { NavLink, Link, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import axios from 'axios';
import { ProjectHeader, ProjectSorting } from './style';
import Grid from './overview/Grid';

import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';

const { Search } = Input;

function Project(props) {
  const { path } = useRouteMatch();
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        // 'https://script.google.com/macros/s/AKfycbwc6zsfumMrVjMwaSnku8NZxL2t5WJjtBK2LlXSkzx1CGptTvtjc4EBl5sBxnYqXJdgXQ/exec'
        `https://render-form.herokuapp.com/api/form-template`,
      );
      setData(res.data.data);
      const unique = [...new Map(res.data.data.map((item) => [item.id_form_template, item])).values()];
      setList(unique);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  const [category, setCategory] = useState('all');
  const [formList, setFormList] = useState([]);
  const onChangeCategory = (value) => {
    setCategory(value);
  };

  const onSearch = (value) => {
    // setSearch(value);
    if (value) {
      setFormList(list.filter((d) => d.name_form.toLowerCase().includes(value.toLowerCase())));
    } else {
      setFormList(list);
    }
  };
  useEffect(() => {
    setFormList(list);
  }, [list]);

  return (
    <>
      <ProjectHeader>
        <PageHeader ghost title="Biểu mẫu" subTitle={<>Tổng số biểu mẫu {data.length}</>} />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <ProjectSorting>
              <div className="project-sort-bar">
                <div className="project-sort-nav">
                  {/* <nav>
                    <ul>
                      <li className={category === 'all' ? 'active' : 'deactivate'}>
                        <Link onClick={() => onChangeCategory('all')} to="#">
                          All
                        </Link>
                      </li>
                      <li className={category === 'progress' ? 'active' : 'deactivate'}>
                        <Link onClick={() => onChangeCategory('progress')} to="#">
                          In Progress
                        </Link>
                      </li>
                      <li className={category === 'complete' ? 'active' : 'deactivate'}>
                        <Link onClick={() => onChangeCategory('complete')} to="#">
                          Complete
                        </Link>
                      </li>
                      <li className={category === 'late' ? 'active' : 'deactivate'}>
                        <Link onClick={() => onChangeCategory('late')} to="#">
                          Late
                        </Link>
                      </li>
                      <li className={category === 'early' ? 'active' : 'deactivate'}>
                        <Link onClick={() => onChangeCategory('early')} to="#">
                          Early
                        </Link>
                      </li>
                    </ul>
                  </nav> */}
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
              <Grid data={formList} loading={loading} {...props} />
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
