/* eslint-disable no-new-func */
/* eslint-disable no-eval */
import React, { useState } from 'react';
import { Row, Col, Form, Input, Upload, Select, DatePicker, Radio } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import { every, some, trim } from 'lodash';

const { Option } = Select;
const { TextArea } = Input;

const comparisonOperatorsHash = {
  '<': function (a, b) {
    return a < b;
  },
  '>': function (a, b) {
    return a > b;
  },
  '>=': function (a, b) {
    return a >= b;
  },
  '<=': function (a, b) {
    return a <= b;
  },
  '=>': function (a, b) {
    return a >= b;
  },
  '=<': function (a, b) {
    return a <= b;
  },
  '==': function (a, b) {
    return a == b;
  },
  '===': function (a, b) {
    return a === b;
  },
};

function DetailTab(props) {
  const { items, formData, idx, isLast, onSubmit, onBackTab } = props;
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  const switchItem = (i, index) => {
    const groupCondition = i.condition_true.split('||');
    console.log('groupCondition :>> ', groupCondition);
    // const mapLevel1 = [];

    // if (groupCondition[0] !== '') {
    //   const group = [];

    //   groupCondition.forEach((item) => {
    //     const group = item.split(',');
    //     const mapLevel2 = [];
    //     group.forEach((item) => {
    //       const obj = trim(item).split(' ');
    //       const key = obj[0];
    //       const comparison = obj[1];
    //       const condition = obj[2];
    //       const comparisonOperator = comparisonOperatorsHash[comparison];
    //       mapLevel2.push(
    //         Form.useWatch(key, form) !== null &&
    //           comparisonOperator(Form.useWatch(key, form), eval(condition))
    //       );
    //     });
    //     mapLevel1.push(every(mapLevel2));
    //   });
    //   console.log('mapLevel1 :>> ', mapLevel1);
    // }
    // console.log(' !some(mapLevel1)',  !some(mapLevel1))
    const showLabel = index === 0;
    const itemProps = {
      label: showLabel && i.name_field,
      name: i.id_field,
      // name: showLabel
      //   ? i.name_field.replaceAll(',', '').replaceAll(' ', '_')
      //   : i.name_field.replaceAll(',', '').replaceAll(' ', '_') + index,
      initialValue: '',
      rules: [
        { required: i.require === 'TRUE', message: 'Vui lòng nhập ô này' },
      ],
      // hidden: mapLevel1.length > 0 && !some(mapLevel1),
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
                <Option key={option} value={option}>
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
  // const check = new Function("Form.useWatch('gioi_tinh', form)")();
  // console.log('form.getFieldValue', check());
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
                  hidden={Form.useWatch('gioi_tinh')}
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
