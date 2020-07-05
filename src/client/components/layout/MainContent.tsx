import { FunctionComponent, CSSProperties } from 'react';
import React from 'react';

const mainContentStyle = {
  background: '#fff',
  padding: '24px',
  marginTop: '50px',
  minHeight: '700px',
} as CSSProperties;

export const MainContent: FunctionComponent = ({ children }) => {
  return <div style={mainContentStyle}>{children}</div>;
};
