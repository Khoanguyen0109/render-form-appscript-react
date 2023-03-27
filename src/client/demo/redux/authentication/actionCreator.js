import Cookies from 'js-cookie';
import actions from './actions';

const {
  loginBegin,
  loginSuccess,
  loginErr,
  logoutBegin,
  logoutSuccess,
  logoutErr,
} = actions;
import { serverFunctions } from '../../../utils/serverFunctions';

const login = (value) => {
  return async (dispatch) => {
    try {
      dispatch(loginBegin());
      const range = 'user!A2:C';

      const result = await serverFunctions.mainReadData(
        '1QChy36UZeI144jl5NrCASWJsi5s74M28F1iwfcYInnE',
        range
      );
      const match = result.find(
        (item) => item[1] === value.username && item[2] === value.password
      );
      if (match) {
        localStorage.setItem('username', value.username);
        return dispatch(loginSuccess( { id: match[0],...value}));
      }
      return dispatch(
        loginErr({
          message: 'Đăng nhập không thành công',
        })
      );
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('logedIn');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };
