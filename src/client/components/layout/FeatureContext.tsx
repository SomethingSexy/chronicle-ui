import { FunctionComponent, CSSProperties } from 'react';
import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const mainContentStyle = {
  padding: '0 24px',
  minHeight: '100vh',
  position: 'relative'
} as CSSProperties;

export const FeatureContent: FunctionComponent = ({ children }) => {
  return <Content style={mainContentStyle}>{children}</Content>;
};
