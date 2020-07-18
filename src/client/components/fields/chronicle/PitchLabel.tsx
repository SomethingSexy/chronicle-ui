import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const PitchLabel = () => (
  <span>
    Pitch&nbsp;
    <Tooltip title="Summary of the chronicle.">
      <QuestionCircleOutlined />
    </Tooltip>
  </span>
);
