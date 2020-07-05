import React, { useState, FunctionComponent } from 'react';
import { Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch } from 'antd';
import { state } from '../atoms/state';
import { useRecoilValue } from 'recoil';

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const nameRules = [
  {
    required: true,
    message: 'Please name your chronicle',
  },
];

const gameRules = [
  {
    required: true,
    message: 'Please select your game',
  },
];

export const ChronicleForm: FunctionComponent<{
  onSubmit: (chronicle: object) => void;
}> = ({ onSubmit }) => {
  const creatingState = useRecoilValue(state);
  // @ts-ignore
  const onFinish = (values) => {
    console.log(values);
    onSubmit(values);
  };

  return (
    <div>
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
                    label: 'v5',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Starting Date" name="startingDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button loading={creatingState === 'loading'} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
