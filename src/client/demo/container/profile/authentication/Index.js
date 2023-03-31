import React from 'react';
import { Row, Col } from 'antd';
import { Aside, Content } from './overview/style';
import Heading from '../../../components/heading/heading';

const AuthLayout = (WraperContent) => {
  return function () {
    return (
      <Row>
        <Col xxl={8} xl={9} lg={12} md={8} xs={24}>
          <Aside>
            <div className="auth-side-content">
              {/* <img src={require('../../../static/img/auth/topShape.png')} alt="" className="topShape" />
              <img src={require('../../../static/img/auth/bottomShape.png')} alt="" className="bottomShape" /> */}
              <Content>
                {/* <img style={{ width: '150px' }} src={require('../../../static/img/Logo_Dark.svg')} alt="" /> */}
                <br />
                <br />
                <Heading as="h1">
                  <span> Hệ thống biểu mẫu kiểm tra, giám sát điều tra.</span>
                </Heading>
                {/* <img
                  className="auth-content-figure"
                  src={require('../../../static/img/Picture1.png')}
                  // src="https://static.vecteezy.com/system/resources/thumbnails/008/823/126/small/business-candle-stick-graph-chart-of-stock-market-investment-trading-on-blue-background-bullish-point-up-trend-of-graph-economy-design-vector.jpg"
                  alt=""
                /> */}
              </Content>
            </div>
          </Aside>
        </Col>

        <Col
          xxl={16}
          xl={15}
          lg={12}
          md={16}
          xs={24}
          // style={{
          //   backgroundImage:
          //     'url(https://studiousguy.com/wp-content/uploads/2022/04/Statistics.jpg)',
          //   backgroundSize: 'cover',
          //   backgroundRepeat: 'no-repeat',
          // }}
        >
          <WraperContent />
        </Col>
      </Row>
    );
  };
};

export default AuthLayout;
