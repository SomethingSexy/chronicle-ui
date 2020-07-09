import { FunctionComponent } from 'react';
import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export const Players: FunctionComponent = () => {
  const players = [];
  return (
    <>
      <Title level={4}>Players</Title>
      {!players || (!players.length && <div>No Players Have Been Added</div>)}
    </>
  );
};
