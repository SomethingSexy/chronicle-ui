import { FunctionComponent, useState, useCallback } from 'react';
import React from 'react';
import { Breadcrumb, PageHeader, Button, Typography } from 'antd';
import { ChronicleSummary } from './ChronicleSummary';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { EditOutlined, FileTextOutlined } from '@ant-design/icons';
import { Chronicle } from '../../../types';

export const ChronicleHeader: FunctionComponent<{
  chronicle: Chronicle;
  routes: Route[];
  onCreateCharacter: () => void;
  onEditChronicle: () => void;
}> = ({ chronicle, routes, onCreateCharacter, onEditChronicle }) => {
  const [visible, setVisible] = useState(false);

  const handleToggle = useCallback(() => {
    setVisible(!visible);
  }, [visible, setVisible]);
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Chronicles</Breadcrumb.Item>
        <Breadcrumb.Item>{chronicle.name}</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
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
