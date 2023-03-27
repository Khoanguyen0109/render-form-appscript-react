import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { useSnackbar } from 'notistack';

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const isLoggedIn = useSelector((state) => state.auth.login);

  const error = useSelector((state) => state.auth.error);
  const { enqueueSnackbar } = useSnackbar();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message ?? 'Đăng nhập không thành công', {
        variant: 'error',
      });
    }
  }, [error]);
  console.log('isLoggedIn :>> ', isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/admin');

    }
  }, [isLoggedIn]);

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="#">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form
          name="login"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Heading as="h3">
            Sign in to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item
            name="username"
            rules={[
              {
                message: 'Please input your username or Email!',
                required: true,
              },
            ]}
            initialValue="admin"
            label="Username or Email Address"
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" initialValue="123456" label="Password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange}>Keep me logged in</Checkbox>
            <NavLink className="forgot-pass-link" to="#">
              Forgot password?
            </NavLink>
          </div>
          <Form.Item>
            <Button
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
