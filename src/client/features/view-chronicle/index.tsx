import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChronicleView } from './components/ChronicleView';
import { Players } from './components/Players';
import { Characters } from './components/Characters';
import { Skeleton, Row, Col } from 'antd';
import { useMachine } from '@xstate/react';
import { fetchChronicle } from '../../api/chronicle';
import { chronicleMachine } from './state/chronicle';

export const RootChronicle: FunctionComponent = () => {
  const { id } = useParams();
  const [state, send] = useMachine(chronicleMachine, {
    services: {
      fetchData: (data) => {
        console.log(data);
        return fetchChronicle(data.id);
      },
    },
  });

  useEffect(() => {
    console.log('fetching');
    send('FETCH', { id });
  }, []);
  console.log(state.value);
  return (
    <>
      {state.matches('fetching.pending') && <Skeleton active />}
      {state.matches('loaded') && (
        <ChronicleView chronicle={state.context.chronicle}>
          {(c) => (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={12}>
                <Players />
              </Col>
              <Col className="gutter-row" span={12}>
                <Characters />
              </Col>
            </Row>
          )}
        </ChronicleView>
      )}
    </>
  );
};
