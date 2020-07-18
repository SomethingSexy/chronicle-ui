import React, { FunctionComponent } from 'react';
import { Form } from 'antd';
import { Input } from 'antd';

const nameRules = [
  {
    required: true,
    message: 'Please name your chronicle.'
  }
];

export const Name: FunctionComponent = () => {
  return (
    <Form.Item label="Name" name="name" rules={nameRules}>
      <Input />
    </Form.Item>
  );
};
