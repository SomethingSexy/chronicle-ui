import { FunctionComponent, useState, useCallback } from 'react';
import React from 'react';
import { Breadcrumb, Button } from 'antd';
import { ChronicleSummary } from './ChronicleSummary';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { FileTextOutlined } from '@ant-design/icons';
import { Chronicle } from '../../../types';

export const ChronicleNavigation: FunctionComponent<{
  chronicle: Chronicle;
  route: string;
}> = ({ chronicle, route }) => {
  const [visible, setVisible] = useState(false);

  const handleToggle = useCallback(() => {
    setVisible(!visible);
  }, [visible, setVisible]);
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Chronicles</Breadcrumb.Item>
        <Breadcrumb.Item>{chronicle.name}</Breadcrumb.Item>
        <Breadcrumb.Item>{route}</Breadcrumb.Item>
      </Breadcrumb>
      <Button
        key="1"
        type="primary"
        icon={<FileTextOutlined />}
        onClick={handleToggle}
        style={{ position: 'absolute', right: '24px', top: 0 }}
      />
      <ChronicleSummary chronicle={chronicle} visible={visible} onClose={handleToggle} />
    </>
  );
};
