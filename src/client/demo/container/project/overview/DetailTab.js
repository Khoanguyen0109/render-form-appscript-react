import React, { useState } from 'react';
import { Row, Col, Form, Input, Upload, Select, DatePicker, Radio } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';

const { Option } = Select;
const { TextArea } = Input;

function DetailTab(props) {
  const { items, formData, idx, isLast, onSubmit, onBackTab } = props;
  console.log('items', items);
  const [form] = Form.useForm();
  console.log('form :>> ', form);
  const handleSubmit = (values) => {
    console.log('value', values);
    onSubmit(values);
  };
  const switchItem = (i, index) => {
    const showLabel = index === 0;
    const itemProps = {
      label: showLabel && i.name_field,
      name: showLabel
        ? i.name_field.replaceAll(',', '').replaceAll(' ', '_')
        : i.name_field.replaceAll(',', '').replaceAll(' ', '_') + index,
      initialValue: '',
      rules: [
        { required: i.require === 'TRUE', message: 'Vui lòng nhập ô này' },
      ],
      // eslint-disable-next-line no-eval
      // hidden: i.condition_true !=='' ? eval(i.condition_true) : false
    };
    console.log('itemProps :>> ', itemProps);
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
    console.log('form.getFieldValue', Form.useWatch('Giới_tính', form))
  return (
    <Row justify="center">
      <Col xl={10} md={16} xs={24}>
        <div className="user-info-form">
          <BasicFormWrapper>
            <Form
              style={{ width: '100%' }}
              form={form}
              name="info"
              onFinish={handleSubmit}
              initialValues={formData}
            >
              {idx === 0 && (
                <Form.Item
                  label="Tên Form"
                  name="form_name"
                  rules={[{ required: true, message: 'Vui lòng nhập ô này' }]}
                  hidden={Form.useWatch('Giới_tính', form) === 1}
                >
                  <Input placeholder={'Ten Form '} />
                </Form.Item>
              )}
              {Object.values(items).map((item) => renderItem(item))}

              <Form.Item>
                <div className="add-user-bottom text-right">
                  <Button
                    className="ant-btn ant-btn-light"
                    onClick={() => {
                      onBackTab();
                    }}
                  >
                    Trờ lại
                  </Button>
                  <Button htmlType="submit" type="primary">
                    {isLast ? 'Hoàn tất' : 'Tiếp'}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </div>
      </Col>
    </Row>
  );
}

export default DetailTab;
