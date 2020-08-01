import React from 'react';
import { Layout, Menu } from 'antd';
import {
  ApartmentOutlined,
  GlobalOutlined,
  UserOutlined,
  TeamOutlined,
  PictureOutlined,
  BookOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Item } = Menu;

export const ChronicleMenu = () => {
  return (
    <Sider collapsible collapsed={true} width={200} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
      <Menu defaultSelectedKeys={['world']} mode="inline" onClick={({ item, key }) => console.log(item, key)}>
        <Item key="world" icon={<GlobalOutlined />}>
          World
        </Item>
        <Item key="story" icon={<BookOutlined />}>
          Story
        </Item>
        <Item key="players" icon={<UserOutlined />}>
          Players
        </Item>
        <Item key="characters" icon={<TeamOutlined />}>
          Characters
        </Item>
        <Item key="locations" icon={<PictureOutlined />}>
          Locations
        </Item>
        <Item key="relationships" icon={<ApartmentOutlined />}>
          Relationships
        </Item>
      </Menu>
    </Sider>
  );
};
