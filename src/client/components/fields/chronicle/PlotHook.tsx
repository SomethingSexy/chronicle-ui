import { FunctionComponent } from 'react';
import { PitchLabel } from './PitchLabel';
import React from 'react';
import { Form, Input } from 'antd';
import { PlotHookLabel } from './PlotHookLabel';

export const PlotHook: FunctionComponent = () => {
  return (
    <Form.Item name="plotHook" label={<PlotHookLabel />}>
      <Input.TextArea />
    </Form.Item>
  );
};
