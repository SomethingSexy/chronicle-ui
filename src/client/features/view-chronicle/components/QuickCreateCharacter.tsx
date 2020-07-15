import React, { FunctionComponent, useState, useCallback } from 'react';
import { Typography, Form, Input, DatePicker, Radio } from 'antd';
import { Modal } from '../../../components/Modal';

const { Item } = Form;

const formStyles = {
  marginTop: '10px'
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 }
};

const nameRules = [
  {
    required: true,
    message: 'Please name your character.'
  }
];
const typeRules = [
  {
    required: true,
    message: 'Please select your character type.'
  }
];

export const QuickCreateCharacter: FunctionComponent<{
  submitting: boolean;
  onCancel: () => void;
  onFinish: (c: any) => void;
}> = ({ submitting, onCancel, onFinish }) => {
  const [form] = Form.useForm();

  const onSubmit = useCallback((values) => {
    // do your staff with values
  }, []);

  const onOk = useCallback(() => {
    form.submit();
  }, [form]);
  return (
    <Modal title="Add Character" visible onCancel={onCancel} onSubmit={onOk}>
      <Typography>
        Quickly add a character to the chronicle. You can edit and add more detailed information later.
      </Typography>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size="large"
        style={formStyles}
        onFinish={onFinish}
      >
        <Item label="Name" name="name" rules={nameRules}>
          <Input />
        </Item>
        <Form.Item name="type" label="Type" rules={typeRules}>
          <Radio.Group>
            <Radio.Button value="player">Player</Radio.Button>
            <Radio.Button value="npc">NPC</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
