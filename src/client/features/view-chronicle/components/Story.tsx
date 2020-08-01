import { Typography } from 'antd';
import React from 'react';
import { Title } from '../../../components/Title';
import { Description } from '../../../components/fields/chronicle/Description';
import { PlotHook } from '../../../components/fields/chronicle/PlotHook';

export const World = () => {
  return (
    <>
      <Title align="center" level={3}>
        Plot Hook
      </Title>
      <PlotHook />
    </>
  );
};
