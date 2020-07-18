import React, { FunctionComponent, useCallback } from 'react';
import { Form, Button, Typography, Divider } from 'antd';
import { compose } from '../../../utils/compose';
import { Chronicle } from '../../../types';
import { AntEditor } from '../../../components/Editor';

const { Title } = Typography;

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 }
};

export const EditChronicleForm: FunctionComponent<{
  submitting?: boolean;
  onSubmit: (chronicle: Chronicle) => void;
}> = ({ submitting, onSubmit }) => {
  const onFinish = useCallback(
    (values: Chronicle) => {
      compose(onSubmit, (c) => ({
        ...c,
        // @ts-ignore
        startingDate: values.startingDate.format()
      }))(values);
    },
    [onSubmit]
  );

  return (
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="vertical" size="large" onFinish={onFinish}>
      <Title level={2}>Edit Chronicle</Title>
      <Title level={3}>Mechanics</Title>

      <Divider />
      <Title level={3}>Lore</Title>
      <Form.Item label="Description">
        Balls
        <Form.Item name="description">
          <AntEditor />
        </Form.Item>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button loading={submitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
