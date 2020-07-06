import { FunctionComponent, Children, ReactNode, useMemo } from 'react';
import React from 'react';
import { PageHeader, Button } from 'antd';
import { Chronicle, chroniclesState } from '../../../atoms/chronicles';
import { useRecoilValue } from 'recoil';
import { ChronicleSummary } from './ChronicleSummary';

export const ChronicleView: FunctionComponent<{
  children: (c: Chronicle) => ReactNode;
  id: string;
}> = ({ id, children }) => {
  const chronicle = useRecoilValue(chroniclesState(id));
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
          <Button key="2">Add Character</Button>,
        ]}
      >
        <ChronicleSummary chronicle={chronicle} />
      </PageHeader>
      {children(chronicle)}
    </>
  );
};
