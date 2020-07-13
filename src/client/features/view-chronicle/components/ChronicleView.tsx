import { FunctionComponent, ReactNode, useMemo, useState, useCallback } from 'react';
import React from 'react';
import { PageHeader, Button, Divider, Typography } from 'antd';
import { Chronicle } from '../../../atoms/chronicles';
import { ChronicleSummary } from './ChronicleSummary';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { EditOutlined, FileTextOutlined } from '@ant-design/icons';

export const ChronicleView: FunctionComponent<{
  chronicle: Chronicle;
  children: (c: Chronicle) => ReactNode;
  routes: Route[];
  onCreateCharacter: () => void;
}> = ({ chronicle, children, routes, onCreateCharacter }) => {
  const [visible, setVisible] = useState(false);

  const handleToggle = useCallback(() => {
    setVisible(!visible);
  }, [visible, setVisible]);
  return (
    <>
      <PageHeader
        title="Chronicle"
        breadcrumb={{ routes }}
        subTitle={chronicle.name}
        extra={[
          <Button key="1" type="primary" icon={<FileTextOutlined />} onClick={handleToggle} />,
          <Button key="2" icon={<EditOutlined />} />,
          <Button key="3">Add Player</Button>,
          <Button key="4" onClick={onCreateCharacter}>
            Add Character
          </Button>
        ]}
      >
        {chronicle.pitch && <Typography>{chronicle.pitch}</Typography>}
        <ChronicleSummary chronicle={chronicle} visible={visible} onClose={handleToggle} />
      </PageHeader>
      <Divider />
      {children(chronicle)}
    </>
  );
};
