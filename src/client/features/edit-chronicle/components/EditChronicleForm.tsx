import React, { FunctionComponent, useCallback } from 'react';
import { Form, Button, Typography, Divider } from 'antd';
import { compose } from '../../../utils/compose';
import { Chronicle } from '../../../types';
import { AntEditor } from '../../../components/Editor';
import { Description } from '../../../components/fields/chronicle/Description';
import { Name } from '../../../components/fields/chronicle/Name';
import { Game } from '../../../components/fields/chronicle/Game';
import { PlayStyle } from '../../../components/fields/chronicle/PlayStyle';

const { Title } = Typography;

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 }
};

export const EditChronicleForm: FunctionComponent<{
  chronicle: Chronicle;
  submitting?: boolean;
  onSubmit: (chronicle: Chronicle) => void;
}> = ({ chronicle, submitting, onSubmit }) => {
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
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      initialValues={chronicle}
      size="large"
      onFinish={onFinish}
    >
      <Title level={2}>Edit Chronicle</Title>
      <Title level={3}>Mechanics</Title>
      <Name />
      <Game />
      <PlayStyle />
      <Divider />
      <Title level={3}>Lore</Title>
      <Description />
      <Form.Item {...tailLayout}>
        <Button loading={submitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
