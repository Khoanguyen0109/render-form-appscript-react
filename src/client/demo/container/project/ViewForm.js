import {
  Row,
  Col,
  Form,
  Input,
  Upload,
  Select,
  DatePicker,
  Radio,
  Button,
  Typography,
} from 'antd';
import { groupBy, mapValues } from 'lodash';
import React, { useEffect, useState } from 'react';
import { BasicFormWrapper } from '../styled';
import { serverFunctions } from '../../../utils/serverFunctions';

const { Option } = Select;
const { TextArea } = Input;

function ViewForm(props) {
  const { reset, formTemplateData, formSelected, formTemplateIdSelected } =
    props;

  const [formData, setFormData] = useState([]);
  const getFormData = async () => {
    try {
      const range = 'Form Values!A2:D';

      const result = await serverFunctions.mainReadData(
        '1QChy36UZeI144jl5NrCASWJsi5s74M28F1iwfcYInnE',
        range
      );
      const formGroup = [];
      const filterValue = result.filter((item) => item[0] === formSelected);
      const map = {};
      filterValue.forEach((item) => {
        map[item[1]] = item[2];
      });
      setFormData(map);
    } catch (error) {
      console.log('error', error);
    }
  };

  const formFields = formTemplateData.filter(
    (item) => item.idform === formTemplateIdSelected
  );

  const groupByField = mapValues(
    groupBy(formFields, 'name_field'),
    (clist) => clist
  );

  useEffect(() => {
    if (getFormData) {
      getFormData();
    }
  }, [formSelected]);

  const renderItem = (item) => {
    if (item.length > 1) {
      return (
        <div>
          <Typography.Title
            level={5}
          >{`${item[0].name_field}: `}</Typography.Title>
          {item.map((i, index) => {
            const value = formData[i.id_field];
            return (
              <div key={i.id_field}>
                <div>{value}</div>
              </div>
            );
          })}
        </div>
      );
    }
    return item.map((i, index) => {
      const value = formData[i.id_field];
      return (
        <div key={i.id_field} style={{ display: 'flex' }}>
          <Typography.Title level={5} style={{ marginRight: '8px' }}>
            {' '}
            {`${i.name_field}: `}
          </Typography.Title>
          <div>{value}</div>
        </div>
      );
    });
  };
  console.log('formData :>> ', formData);
  return (
    <div>
      <BasicFormWrapper>
        {Object.values(groupByField).map((tab, idx) => {
          // Object.values(tab).map((item) => {
          return renderItem(tab);
          // });
        })}{' '}
      </BasicFormWrapper>
    </div>
  );
}

export default ViewForm;
