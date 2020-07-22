import React, { FunctionComponent } from 'react';
import { Form } from 'antd';
import { AntEditor } from '../../Editor';

export const Description: FunctionComponent = () => {
  return (
    <Form.Item label="Description">
      Detailed description of the world the chronicle is set in.
      <Form.Item name="description">
        <AntEditor />
      </Form.Item>
    </Form.Item>
  );
};
