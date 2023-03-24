import { Card, Col, Input, Row, Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectList } from './style';

const { Search } = Input;

function ReferForm() {
  const projects = useSelector((state) => state.projects.data);
  const columns = [
    {
      title: 'Tên biểu mẫu',
      dataIndex: 'project',
      key: 'project',
    },
  ];

  const dataSource = [];
  if (projects.length)
    projects.map((value) => {
      const { id, title, status, category, percentage } = value;
      return dataSource.push({
        key: id,
        project: title,
      });
    });
  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Card
          title={() => (
            <Search
              placeholder="input search text"
            //   onSearch={onSearch}
              style={{ width: 200 }}
            />
          )}
        >
          <ProjectList>
            <div className="table-responsive">
              <Table
                pagination={false}
                dataSource={dataSource}
                columns={columns}
              />
            </div>
          </ProjectList>
        </Card>
      </Col>
    </Row>
  );
}

export default ReferForm;
