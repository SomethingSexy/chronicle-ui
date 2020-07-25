import { Typography } from 'antd';
import React, { FunctionComponent, useMemo, CSSProperties } from 'react';

const left = {
  textAlign: 'left'
} as CSSProperties;

const center = {
  textAlign: 'center'
} as CSSProperties;

const right = {
  textAlign: 'right'
} as CSSProperties;

export const Title: FunctionComponent<{
  align?: 'left' | 'center' | 'right';
  level?: 1 | 2 | 3 | 4;
}> = ({ align = 'left', children, level = 1 }) => {
  const style = useMemo(() => {
    if (align === 'center') {
      return center;
    }
    if (align === 'right') {
      return right;
    }
    return left;
  }, [align]);
  return (
    <Typography.Title level={level} style={style}>
      {children}
    </Typography.Title>
  );
};
