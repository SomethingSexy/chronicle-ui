import { FunctionComponent } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

const { Item } = Menu;

export const MenuItem: FunctionComponent<{
  label: string;
  path: string;
}> = ({ label, path, ...props }) => {
  return (
    <Item {...props} key={path}>
      <Link to={path}>{label}</Link>
    </Item>
  );
};
