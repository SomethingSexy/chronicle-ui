import React from 'react';
import { Layout, Menu } from 'antd';
import { ApartmentOutlined, GlobalOutlined, UserOutlined, TeamOutlined, PictureOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { Item } = Menu;

export const ChronicleMenu = () => {
  return (
    <Sider collapsible collapsed={true} width={200} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
      <Menu defaultSelectedKeys={['1']} mode="inline">
        <Item key="1" icon={<GlobalOutlined />}>
          World
        </Item>
        <Item key="2" icon={<UserOutlined />}>
          Players
        </Item>
        <Item key="3" icon={<TeamOutlined />}>
          Characters
        </Item>
        <Item key="4" icon={<PictureOutlined />}>
          Locations
        </Item>
        <Item key="5" icon={<ApartmentOutlined />}>
          Relationships
        </Item>
      </Menu>
    </Sider>
  );
};
