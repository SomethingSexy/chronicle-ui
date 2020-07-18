import React from 'react';
import { DatePicker } from '../../DatePicker';
import { Form } from 'antd';

export const GameStartingDate: Function = () => {
  return (
    <Form.Item label="Starting Date" name="startingDate">
      <DatePicker />
    </Form.Item>
  );
};
