import React, { FunctionComponent } from 'react';
import { Form, Radio } from 'antd';

const playStyleRules = [
  {
    required: true,
    message: 'Please select your play style.'
  }
];

export const PlayStyle: FunctionComponent = () => {
  return (
    <Form.Item name="playStyle" label="Play Style" rules={playStyleRules}>
      <Radio.Group>
        <Radio.Button value="session">Session</Radio.Button>
        <Radio.Button value="pbp">Play By Post</Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};
