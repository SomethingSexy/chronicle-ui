import { FunctionComponent } from 'react';

import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export const Players: FunctionComponent<{
  items?: any[];
}> = ({ items }) => {
  if (!items || !items.length) {
    return (
      <>
        <Title level={3}>Players</Title>
        <div>No Players Have Been Added</div>
      </>
    );
  }
};
