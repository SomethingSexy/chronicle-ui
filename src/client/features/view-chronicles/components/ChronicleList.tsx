import React, { FunctionComponent } from 'react';
import { List } from 'antd';
import { Chronicle } from '../../../types';
import { ChronicleItem } from './ChronicleItem';

export const ChronicleList: FunctionComponent<{
  chronicles: Chronicle[];
}> = ({ chronicles }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={chronicles}
      renderItem={(item) => <ChronicleItem chronicle={item} />}
    ></List>
  );
};
