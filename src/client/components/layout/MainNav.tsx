import { FunctionComponent } from 'react';
import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem } from './MenuItem';

export const MainNav: FunctionComponent = () => {
  const location = useLocation();
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
      <MenuItem label="Chronicle" path="/chronicle/create" />
      <MenuItem label="Character" path="/character/create" />
    </Menu>
  );
};
