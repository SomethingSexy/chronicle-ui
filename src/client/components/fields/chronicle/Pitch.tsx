import { FunctionComponent } from 'react';
import { PitchLabel } from './PitchLabel';
import React from 'react';
import { Form, Input } from 'antd';

export const Pitch: FunctionComponent = () => {
  return (
    <Form.Item name="pitch" label={<PitchLabel />}>
      <Input.TextArea />
    </Form.Item>
  );
};
