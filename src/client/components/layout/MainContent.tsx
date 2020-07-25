import { FunctionComponent, CSSProperties } from 'react';
import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const mainContentStyle = {
  // background: '#fff',
  padding: '0 50px',
  marginTop: '50px',
  minHeight: '100vh'
} as CSSProperties;

export const MainContent: FunctionComponent = ({ children }) => {
  return (
    <Content style={mainContentStyle}>
      <Layout style={{ padding: '24px 0', background: '#fff', minHeight: '100vh' }}>{children}</Layout>
    </Content>
  );
};
