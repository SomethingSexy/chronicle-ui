import { FunctionComponent } from 'react';
import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export const Characters: FunctionComponent = () => {
  const characters = [];
  return (
    <>
      <Title level={4}>Characters</Title>
      {!characters || (!characters.length && <div>No Characters Have Been Added</div>)}
    </>
  );
};
