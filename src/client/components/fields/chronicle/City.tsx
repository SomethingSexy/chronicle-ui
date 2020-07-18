import { FunctionComponent } from 'react';
import { Form, Input } from 'antd';
import React from 'react';

export const City: FunctionComponent = () => {
  return (
    <Form.Item label="City" name="city">
      <Input />
    </Form.Item>
  );
};
