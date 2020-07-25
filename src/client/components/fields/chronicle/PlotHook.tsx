import { FunctionComponent } from 'react';
import React from 'react';
import { Form } from 'antd';
import { AntEditor } from '../../Editor';

export const PlotHook: FunctionComponent = () => {
  return (
    <Form.Item>
      A plot hook gets a character (or group) started down the line of a plot. The characters are usually free to ignore
      the plot hook, and they can often even escape the plot line after they bite the hook.
      <Form.Item name="plotHook">
        <AntEditor holder="plotHook" />
      </Form.Item>
    </Form.Item>
  );
};
