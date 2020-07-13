import React, { CSSProperties, FunctionComponent } from 'react';
import { Typography, Button, Form, Input, DatePicker, Radio } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Item } = Form;

const buttonStyles = {
  float: 'right'
} as CSSProperties;

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
  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<CloseCircleOutlined />}
        size="large"
        style={buttonStyles}
        onClick={onCancel}
      />
      <Title level={3}>Add Character</Title>
      <Typography>
        Quickly add a character to the chronicle. You can edit and add more detailed information later.
      </Typography>
      <Form
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
        <Item {...tailLayout}>
          <Button loading={submitting} type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </>
  );
};
