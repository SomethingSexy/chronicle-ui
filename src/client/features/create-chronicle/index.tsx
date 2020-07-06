import React, { FunctionComponent, useEffect } from 'react';
import { Typography } from 'antd';
import { ChronicleForm } from './components/ChronicleForm';
import { createChronicle } from './atoms/createChronicle';
import { useRecoilState, useSetRecoilState, useRecoilCallback } from 'recoil';
import { createState } from './atoms/state';
import { useHistory } from 'react-router-dom';
import { chronicles } from '../../atoms/chronicles';

const { Title } = Typography;

const useCreateChronicle = () => {
  const [chronicle, setChronicle] = useRecoilState(createChronicle);
  const setState = useSetRecoilState(createState);
  const history = useHistory();
  const storeChronicle = useRecoilCallback(
    ({ set }) => (c) => {
      // @ts-ignore
      set(chronicles(c.id), c);
      setChronicle(null);
      setState(null);
      history.push('/chronicle/123');
    },
    [chronicle]
  );

  useEffect(() => {
    if (chronicle !== null) {
      // TODO this is where we would make the post request
      setState('loading');
      setState('loaded');
      storeChronicle({
        id: '123',
        ...chronicle,
      });
    }
  }, [chronicle]);
};

export const CreateChronicle: FunctionComponent<{}> = () => {
  const setChronicle = useSetRecoilState(createChronicle);
  // TODO: this hook should return the set chronicle function
  useCreateChronicle();

  return (
    <>
      <Title level={2}>Create New Chronicle</Title>
      <ChronicleForm onSubmit={(chronicle) => setChronicle(chronicle)} />
    </>
  );
};
