import { Row, Col, Form, Input, Upload, Select, DatePicker, Radio, Button } from 'antd';
import { groupBy, mapValues } from 'lodash';
import React, { useState } from 'react';
import { BasicFormWrapper } from '../styled';

const { Option } = Select;
const { TextArea } = Input;

function ViewForm(props) {
  const { reset, formTemplateData, formSelected } = props;
  const [formData, setFormData] = useState([]);
  const getFormData = () => {};
  const [form] = Form.useForm();

  console.log('formTemplateData', formTemplateData);
  const formTemplateId = 'id_form_1';
  const formFields = formTemplateData.filter(
    (item) => item.idform === formTemplateId
  );

  const groupByField = mapValues(
    groupBy(formFields, 'name_field'),
    (clist) => clist
  );
  Object.values(groupByField).map((tab, idx) => {
    Object.values(tab).map((item) => {
      // const value = formData.find(field => )
      console.log('item', item);
    });
  });
  // const groupedWithValue = grouped.map(item => {
  //   formData.map(row => {
  //     if
  //   })
  // })
  const switchItem = (i, index) => {
    const showLabel = index === 0;
    const itemProps = {
      label: showLabel && i.name_field,
      name: showLabel
        ? i.name_field.replaceAll(',', '').replaceAll(' ', '_')
        : i.name_field.replaceAll(',', '').replaceAll(' ', '_') + index,
      initialValue: '',

      disabled: true,
      // eslint-disable-next-line no-eval
      // hidden: i.condition_true !=='' ? eval(i.condition_true) : false
    };
    switch (i.field) {
      case 'input':
        return (
          <Form.Item {...itemProps}>
            <Input placeholder={i.placeholder} type={i.type} />
          </Form.Item>
        );
      case 'select':
        return (
          <Form.Item {...itemProps}>
            <Select style={{ width: '100%' }}>
              {i.option.split('/').map((option, index) => (
                <Option key={option} value={index}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      case 'date':
        return (
          <Form.Item {...itemProps}>
            <DatePicker />
          </Form.Item>
        );
      case 'radio':
        return (
          <Form.Item {...itemProps}>
            <Radio.Group>
              {i.option.split('/').map((option, index) => (
                <Radio key={option} value="index">
                  {' '}
                  option{' '}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );

      case 'text-area': {
        return (
          <Form.Item {...itemProps}>
            <TextArea rows={4} />
          </Form.Item>
        );
      }
      default:
        break;
    }
  };
  const renderItem = (item) => {
    console.log('item :>> ', item);
    if (item.length > 1) {
      return (
        <div>
          {item.map((i, index) => {
            return switchItem(i, index);
          })}
        </div>
      );
    }
    return item.map((i, index) => {
      return switchItem(i, index);
    });
  };
  return (
    <div>
      <BasicFormWrapper>
        <Form
          style={{ width: '100%' }}
          form={form}
          name="info"
          initialValues={formData}
        >
          {/* {Object.values(items).map((item) => renderItem(item))} */}
        </Form>
      </BasicFormWrapper>
      <Button onClick={reset}>Back</Button>
    </div>
  );
}

export default ViewForm;
