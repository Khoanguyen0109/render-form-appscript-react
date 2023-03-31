/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Card, Col, Input, Row, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';
import { ProjectList } from './style';
import ViewForm from './ViewForm';

const { Search } = Input;

function ReferForm(props) {
  const { open, list, data } = props;
  const [search, setSearch] = useState('');
  const [formList, setFormList] = useState([]);
  const [defaultFormList, setDefaultFormList] = useState([]);
  const columns = [
    {
      title: 'Tên biểu mẫu',
      dataIndex: 'formName',
      key: 'formName',
    },
    {
      title: 'Tên người tạo biểu mẫu',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
  ];

  const [formSelected, setFormSelected] = useState(null);
  const [formTemplateIdSelected, setFormTemplateIdSelected] = useState();

  const dataSource = [];

  const getForms = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_END_POINT}/api/form-list`);
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getForms();
  }, []);
  const reset = () => {
    setFormSelected(null);
  };
  if (formList.length)
    formList.map((value) => {
      const { formId, idFormTemplate, formName, username, createdDate } = value;
      return dataSource.push({
        key: formId,
        formName: (
          <Typography
            onClick={() => {
              setFormSelected(formId);
              setFormTemplateIdSelected(idFormTemplate);
            }}
          >
            {formName}
          </Typography>
        ),
        username,
        createdDate,
      });
    });

  const onSearch = (value) => {
    // setSearch(value);
    if (value) {
      setFormList(defaultFormList.filter((d) => d.formName.toLowerCase().includes(value.toLowerCase())));
    } else {
      setSearch('');
      setFormList(defaultFormList);
    }
  };
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const formSelectedName = formList.find((form) => form.formId === formSelected)?.formName;
  return (
    <Row gutter={25}>
      <Col xs={24}>
        {formSelected && (
          <div style={{ display: 'flex' }}>
            {' '}
            <Button type="text" style={{ padding: 0, marginBottom: '12px', marginRight: '8px' }} onClick={reset}>
              <FeatherIcon size={16} icon="arrow-left" />
            </Button>
            <Typography style={{ fontWeight: 500 }}>{formSelectedName}</Typography>
          </div>
        )}

        {!formSelected && (
          <>
            <Search
              value={search}
              onChange={onChange}
              placeholder="Tìm kiếm biểu mẫu"
              onSearch={onSearch}
              style={{ width: '100%', marginBottom: '20px' }}
            />

            <ProjectList>
              <div className="table-responsive">
                <Table pagination={false} dataSource={dataSource} columns={columns} />
              </div>
            </ProjectList>
          </>
        )}
        {formSelected && (
          <ViewForm
            formTemplateData={data}
            reset={reset}
            formSelected={formSelected}
            formTemplateIdSelected={formTemplateIdSelected}
          />
        )}
      </Col>
    </Row>
  );
}

export default ReferForm;
