import React, { useState } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';

import { Popover } from '../../popup/popup';
import { Dropdown } from '../../dropdown/dropdown';
import { logOut } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';

function AuthInfo() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    flag: 'english',
  });
  const { flag } = state;

  const SignOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
    localStorage.removeItem('username')
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  const onFlagChangeHandle = (value) => {
    setState({
      ...state,
      flag: value,
    });
  };

  const country = (
    <NavAuth>
      <Link onClick={() => onFlagChangeHandle('english')} to="#">
        {/* <img src={require('../../../static/img/flag/english.png')} alt="" /> */}
        <span>English</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('germany')} to="#">
        {/* <img src={require('../../../static/img/flag/germany.png')} alt="" /> */}
        <span>Germany</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('spain')} to="#">
        {/* <img src={require('../../../static/img/flag/spain.png')} alt="" /> */}
        <span>Spain</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('turky')} to="#">
        {/* <img src={require('../../../static/img/flag/turky.png')} alt="" /> */}
        <span>Turky</span>
      </Link>
    </NavAuth>
  );

  return (
    <InfoWraper>
      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
}

export default AuthInfo;
