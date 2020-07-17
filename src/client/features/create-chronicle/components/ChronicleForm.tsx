import React, { FunctionComponent, useCallback } from 'react';
import { Form, Input, Button, Cascader, Radio } from 'antd';
import { compose } from '../../../utils/compose';
import { PitchLabel } from './PitchLabel';
import { DatePicker } from '../../../components/DatePicker';
import { Chronicle } from '../../../types';

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 }
};

const nameRules = [
  {
    required: true,
    message: 'Please name your chronicle.'
  }
];

const gameRules = [
  {
    required: true,
    message: 'Please select your game.'
  }
];

const playStyleRules = [
  {
    required: true,
    message: 'Please select your play style.'
  }
];

export const ChronicleForm: FunctionComponent<{
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
    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" size="large" onFinish={onFinish}>
      <Form.Item label="Name" name="name" rules={nameRules}>
        <Input />
      </Form.Item>
      <Form.Item label="Game" name="game" rules={gameRules}>
        <Cascader
          options={[
            {
              value: 'vtm',
              label: 'Vampire the Masquerade',
              children: [
                {
                  value: 'v5',
                  label: 'v5'
                }
              ]
            }
          ]}
        />
      </Form.Item>
      <Form.Item name="playStyle" label="Play Style" rules={playStyleRules}>
        <Radio.Group>
          <Radio.Button value="session">Session</Radio.Button>
          <Radio.Button value="pbp">Play By Post</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Starting Date" name="startingDate">
        <DatePicker />
      </Form.Item>
      <Form.Item label="City" name="city">
        <Input />
      </Form.Item>
      <Form.Item name="pitch" label={<PitchLabel />}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button loading={submitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
