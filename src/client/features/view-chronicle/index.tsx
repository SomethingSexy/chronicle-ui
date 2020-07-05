import { FunctionComponent } from 'react';

import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { chroniclesState, Chronicle } from '../../atoms/chronicles';
import { PageHeader, Descriptions } from 'antd';

const routes = [
  {
    path: 'index',
    breadcrumbName: 'Chronicles',
  },
  {
    path: 'first',
    breadcrumbName: 'Chronicle',
  },
];

export const ViewChronicle: FunctionComponent = () => {
  const { id } = useParams();
  const chronicle = useRecoilValue(chroniclesState(id));
  // @ts-ignore
  // const chronicle: Chronicle = {};
  // TODO: here we will want to do a fetch if not loaded
  return (
    <PageHeader title="Chronicle" breadcrumb={{ routes }} subTitle={chronicle.name}>
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="Game">{chronicle.gameName}</Descriptions.Item>
        <Descriptions.Item label="City">{chronicle.city}</Descriptions.Item>
        <Descriptions.Item label="StartingDate">{chronicle.startingDate}</Descriptions.Item>
        <Descriptions.Item label="NumberOfPlayers">0</Descriptions.Item>
        <Descriptions.Item label="NumberOfCharacters">0</Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
};
