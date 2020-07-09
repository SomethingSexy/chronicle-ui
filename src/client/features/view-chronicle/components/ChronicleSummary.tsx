import { FunctionComponent } from 'react';
import React from 'react';
import { Descriptions } from 'antd';
import { Chronicle } from '../../../atoms/chronicles';

export const ChronicleSummary: FunctionComponent<{
  chronicle: Chronicle;
}> = ({ chronicle }) => {
  // TODO: here we will want to do a fetch if not loaded
  return (
    <Descriptions size="small" column={3}>
      <Descriptions.Item label="Game">{chronicle.gameName}</Descriptions.Item>
      <Descriptions.Item label="City">{chronicle.city}</Descriptions.Item>
      <Descriptions.Item label="Starting Date">{chronicle.startingDate}</Descriptions.Item>
      <Descriptions.Item label="Number Of Players">0</Descriptions.Item>
      <Descriptions.Item label="Number Of Characters">0</Descriptions.Item>
    </Descriptions>
  );
};
