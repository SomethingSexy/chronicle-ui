import { FunctionComponent, ReactNode, useMemo } from 'react';
import React from 'react';
import { PageHeader, Button, Divider } from 'antd';
import { Chronicle } from '../../../atoms/chronicles';
import { ChronicleSummary } from './ChronicleSummary';
import { useHistory } from 'react-router-dom';

export const ChronicleView: FunctionComponent<{
  chronicle: Chronicle;
  children: (c: Chronicle) => ReactNode;
}> = ({ chronicle, children }) => {
  const routes = useMemo(() => {
    return [
      {
        path: 'index',
        breadcrumbName: 'Chronicles',
      },
      {
        path: 'first',
        breadcrumbName: chronicle.name,
      },
    ];
  }, [chronicle]);
  const history = useHistory();
  return (
    <>
      <PageHeader
        title="Chronicle"
        breadcrumb={{ routes }}
        subTitle={chronicle.name}
        extra={[
          <Button key="1" type="primary">
            Edit
          </Button>,
          <Button key="3">Add Player</Button>,
          <Button
            key="2"
            onClick={() => {
              history.push('/character/create?id=123');
            }}
          >
            Add Character
          </Button>,
        ]}
      >
        <ChronicleSummary chronicle={chronicle} />
      </PageHeader>
      <Divider />
      {children(chronicle)}
    </>
  );
};
