import React, { FunctionComponent } from 'react';
import { Cascader, Form } from 'antd';

const gameRules = [
  {
    required: true,
    message: 'Please select your game.'
  }
];

export const Game: FunctionComponent = () => {
  return (
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
  );
};
