import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { useSnackbar } from 'notistack';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (value) => {
    dispatch(login(value));
    // history.push('/admin');
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Đăng nhập không thành công', {
        variant: 'error',
      });
    }
  }, [error]);

  return (
    <AuthWrapper>
      {/* <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="#">Sign up now</NavLink>
      </p> */}
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">Cục Thống kê thành phố Đà Nẵng </Heading>
          <Form.Item
            name="username"
            rules={[{ message: 'Vui lòng nhập tên đăng nhập', required: true }]}
            initialValue="admin"
            label="Tên Đăng nhập"
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" initialValue="123456" label="Mật Khẩu">
            <Input.Password placeholder="Password" />
          </Form.Item>
          {/* <div className="auth-form-action">
            <Checkbox onChange={onChange}>Keep me logged in</Checkbox>
            <NavLink className="forgot-pass-link" to="#">
              Forgot password?
            </NavLink>
          </div> */}
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </Form.Item>
          <p className="form-divider">
            <span>O</span>
          </p>
          {/* <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul> */}
        </Form>
      </div>
      <div style={{ textAlign: 'end' }}>
        <div>Người thực hiện: Lương Nhật Thanh</div>
        <div>Đơn vị: Chi cục thống kê khu vực Sơn Trà - Ngũ Hành Sơn</div>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
