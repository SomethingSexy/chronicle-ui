import React, { FunctionComponent, CSSProperties } from 'react';

const logoStyle = {
  color: 'white',
  width: '120px',
  height: '31px',
  float: 'left'
} as CSSProperties;

export const Logo: FunctionComponent = () => {
  return (
    <div className="logo" style={logoStyle}>
      Chronicle UI
    </div>
  );
};
