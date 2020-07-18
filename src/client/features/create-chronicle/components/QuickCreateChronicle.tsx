import React, { FunctionComponent, useCallback } from 'react';
import { Form, Button } from 'antd';
import { compose } from '../../../utils/compose';
import { Chronicle } from '../../../types';
import { Name } from '../../../components/fields/chronicle/Name';
import { Game } from '../../../components/fields/chronicle/Game';
import { PlayStyle } from '../../../components/fields/chronicle/PlayStyle';
import { GameStartingDate } from '../../../components/fields/chronicle/GameStartingDate';
import { City } from '../../../components/fields/chronicle/City';
import { Pitch } from '../../../components/fields/chronicle/Pitch';

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 }
};

export const QuickCreateChronicle: FunctionComponent<{
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
      <Name />
      <Game />
      <PlayStyle />
      <GameStartingDate />
      <City />
      <Pitch />
      <Form.Item {...tailLayout}>
        <Button loading={submitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
