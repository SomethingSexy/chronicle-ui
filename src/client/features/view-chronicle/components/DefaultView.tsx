import { Row, Col } from 'antd';
import React from 'react';
import { Players } from './Players';
import { Characters } from './Characters';

export const DefaultView = () => (
  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    <Col className="gutter-row" span={12}>
      <Players />
    </Col>
    <Col className="gutter-row" span={12}>
      <Characters />
    </Col>
  </Row>
);
