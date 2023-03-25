import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Spin, Card, Button, Steps, Drawer } from 'antd';
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams,
  Link,
} from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { groupBy, mapValues } from 'lodash';
import qs from 'qs';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { AddUser } from './overview/style';
import DetailTab from './overview/DetailTab';
import ReferForm from './ReferForm';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';

function FormDetail(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    getList();
  }, []);
  const params = useParams();
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const formFields = data.filter((item) => item.idform === params.formId);
  const formName = formFields[0]?.name_form;
  const onBack = () => {
    history.goBack();
  };
  const grouped = mapValues(groupBy(formFields, 'steps'), (clist) => clist);
  //   var grouped = mapValues(groupBy(formFields, 'steps'), (clist) =>
  //   clist.map((item) => mapValues(groupBy(item, 'name_field'), (item) => item))
  // );

  const groupByField = Object.values(grouped).map((item) =>
    groupBy(item, 'name_field')
  );

  const next = (value) => {
    setFormData({ ...value, formData });
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onSubmit = async () => {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(formData),
      url: 'https://script.google.com/macros/s/AKfycbwc6zsfumMrVjMwaSnku8NZxL2t5WJjtBK2LlXSkzx1CGptTvtjc4EBl5sBxnYqXJdgXQ/exec',
    };
    console.log('options :>> ', options);
    await axios(options);
    setFormData({});
    enqueueSnackbar('Gửi biểu mẫu thành công', { variant: 'success' });
    history.push('/');
  };

  const steps = Object.values(groupByField).map((tab, idx) => {
    const isLast = idx === Object.values(groupByField).length - 1;
    return {
      content: (
        <DetailTab
          idx={idx}
          items={tab}
          isLast={isLast}
          formData={formData}
          onSubmit={isLast ? onSubmit : next}
          onBackTab={prev}
        />
      ),
    };
  });

  const items = Object.keys(groupByField).map((item, index) => ({
    key: index,
    // title: `Bước ${index + 1}`,
  }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',

    marginTop: 16,
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title="Biểu mẫu liên quan"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        size="large"
      >
        <ReferForm />
      </Drawer>

      <PageHeader
        ghost
        title={formName}
        onBack={() => window.history.back()}
        buttons={[
          <Button onClick={showDrawer} type="primary" key="3">
            Tìm kiếm form liên quan
          </Button>,
        ]}
      />

      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
              <Card
                title={
                  <Steps
                    size="small"
                    className=""
                    current={current}
                    items={items}
                  />
                }
              >
                {' '}
                {loading ? (
                  <div style={contentStyle}>
                    <Spin />
                  </div>
                ) : (
                  <div style={contentStyle}>{steps[current]?.content}</div>
                )}
              </Card>
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default FormDetail;
