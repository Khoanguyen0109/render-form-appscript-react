import { Button, Card, Col, Input, Row, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProjectList } from './style';
import ViewForm from './ViewForm';
import { serverFunctions } from '../../../utils/serverFunctions';
import FeatherIcon from 'feather-icons-react';

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
    const range = 'Form Sumit!A2:E';

    const result = await serverFunctions.mainReadData(
      '1QChy36UZeI144jl5NrCASWJsi5s74M28F1iwfcYInnE',
      range
    );
    const formGroup = [];
    result.forEach((item) => {
      console.log('item', item)
      const form = {
        formId: item[0],
        idFormTemplate: item[1],
        formName: item[2],
        username: item[3],
        createdDate: item[4],
      };
      formGroup.push(form);
    });
    setDefaultFormList(formGroup);
    setFormList(formGroup);
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
      console.log('createdDate :>> ', createdDate);
      return dataSource.push({
        key: formId,
        formName: (
          <p
            onClick={() => {
              setFormSelected(formId);
              setFormTemplateIdSelected(idFormTemplate);
            }}
          >
            {formName}
          </p>
        ),
        username,
        createdDate,
      });
    });

  const onSearch = (value) => {
    // setSearch(value);
    if (value) {
      setFormList(
        defaultFormList.filter((d) =>
          d.formName.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSearch('');
      setFormList(defaultFormList);
    }
  };
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const formSelectedName = formList.find(
    (form) => form.formId === formSelected
  )?.formName;
  return (
    <Row gutter={25}>
      <Col xs={24}>
        {formSelected && (
          <div style={{ display: 'flex' }}>
            {' '}
            <Button
              type="text"
              style={{ padding: 0, marginBottom: '12px', marginRight: '8px' }}
              onClick={reset}
            >
              <FeatherIcon size={16} icon="arrow-left" />
            </Button>
            <Typography style={{ fontWeight: 500 }}>
              {formSelectedName}
            </Typography>
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
                <Table
                  pagination={false}
                  dataSource={dataSource}
                  columns={columns}
                />
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
