import React, { useState, useCallback } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AuthWrapper } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';

const { Text } = Typography;

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = useCallback((values) => {
    console.log('values :>> ', values);
    history.push('/admin');
  }, []);

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  // lock.on('authenticated', (authResult) => {
  //   lock.getUserInfo(authResult.accessToken, (error) => {
  //     if (error) {
  //       return;
  //     }

  //     handleSubmit();
  //     lock.hide();
  //   });
  // });

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account?{' '}
        <NavLink to="/register">Sign up now</NavLink>
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
            name="email"
            rules={[
              {
                message: 'Please input your username or Email!',
                required: true,
              },
            ]}
            initialValue="example@example.com"
            label="Email Address"
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" initialValue="123456789" label="Password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange} checked={state.checked}>
              Keep me logged in
            </Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
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
          {error && <Text>asdsd</Text>}
          <p className="form-divider">
            <span>Or</span>
          </p>
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
