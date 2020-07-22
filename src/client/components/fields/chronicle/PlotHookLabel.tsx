import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const PlotHookLabel = () => (
  <span>
    Plot Hook&nbsp;
    <Tooltip title="A plot hook gets a character (or group) started down the line of a plot. The characters are usually free to ignore the plot hook, and they can often even escape the plot line after they bite the hook.">
      <QuestionCircleOutlined />
    </Tooltip>
  </span>
);
