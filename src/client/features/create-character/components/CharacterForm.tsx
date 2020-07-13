import React, { FunctionComponent, useCallback } from 'react';
import { Form, Input, Button, Cascader, DatePicker } from 'antd';
// import { createState } from '../atoms/state';
import { useRecoilValue } from 'recoil';
import { Chronicle } from '../../../atoms/chronicles';
import { compose } from '../../../utils/compose';

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 }
};

const nameRules = [
  {
    required: true,
    message: 'Please name your chronicle'
  }
];

const gameRules = [
  {
    required: true,
    message: 'Please select your game'
  }
];

export const CharacterForm: FunctionComponent<{
  onSubmit: (chronicle: Chronicle) => void;
}> = ({ onSubmit }) => {
  // const state = useRecoilValue(createState);
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
                    label: 'v5'
                  }
                ]
              }
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
