import { FunctionComponent } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

const { Item } = Menu;

export const MenuItem: FunctionComponent<{
  label: string;
  onClick: () => void;
}> = ({ label, onClick, ...props }) => {
  return (
    <Item {...props} onClick={onClick}>
      {' '}
      {label}
    </Item>
  );
};
