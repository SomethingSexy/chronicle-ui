import { FunctionComponent, useState, useCallback } from 'react';
import React from 'react';
import { PageHeader, Button, Typography } from 'antd';
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
      <PageHeader
        title="Chronicle"
        breadcrumb={{ routes }}
        subTitle={chronicle.name}
        extra={[
          <Button key="1" type="primary" icon={<FileTextOutlined />} onClick={handleToggle} />,
          <Button key="2" icon={<EditOutlined />} onClick={onEditChronicle} />,
          <Button key="3">Add Player</Button>,
          <Button key="4" onClick={onCreateCharacter}>
            Add Character
          </Button>
        ]}
      >
        {chronicle.pitch && <Typography>{chronicle.pitch}</Typography>}
      </PageHeader>
      <ChronicleSummary chronicle={chronicle} visible={visible} onClose={handleToggle} />
    </>
  );
};
