import { Card, Col, Input, Row, Table } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProjectList } from './style';
import ViewForm from './ViewForm';

const { Search } = Input;

function ReferForm(props) {
  const { list } = props;
  const projects = useSelector((state) => state.projects.data);
  const columns = [
    {
      title: 'Tên biểu mẫu',
      dataIndex: 'project',
      key: 'project',
    },
  ];

  const [formSelected, setFormSelected] = useState(null);
  const dataSource = [];
  if (projects.length)
    projects.map((value) => {
      const { id, title, status, category, percentage } = value;
      return dataSource.push({
        key: id,
        project: <p onClick={() => setFormSelected(id)}>{title}</p>,
      });
    });
  const reset = () => {
    setFormSelected(null);
  };
  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Card headless>
          <Search
            placeholder="Tìm kiếm biểu mẫu"
            //   onSearch={onSearch}
            style={{ width: '100%' , marginBottom: '20px' }}
          />
          {!formSelected && (
            <ProjectList>
              <div className="table-responsive">
                <Table
                  pagination={false}
                  dataSource={dataSource}
                  columns={columns}
                />
              </div>
            </ProjectList>
          )}
          <ViewForm
            reset={reset}
            formSelected={formSelected}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default ReferForm;
