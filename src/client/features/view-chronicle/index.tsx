import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChronicleView } from './components/ChronicleView';
import { Players } from './components/Players';
import { Characters } from './components/Characters';
import { Skeleton, Row, Col } from 'antd';
import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import { fetchChronicle } from '../../api/chronicle';

const fetchMachine = Machine(
  {
    id: 'fetch',
    initial: 'idle',
    context: {
      id: null,
      results: null,
      message: '',
    },
    states: {
      idle: {
        on: {
          FETCH: {
            target: 'pending',
            actions: ['onChange'],
          },
        },
      },
      pending: {
        invoke: {
          src: 'fetchData',
          onDone: { target: 'successful', actions: ['setResults'] },
          onError: { target: 'failed', actions: ['setMessage'] },
        },
      },
      failed: {
        on: {
          FETCH: 'pending',
        },
      },
      successful: {
        on: {
          FETCH: 'pending',
        },
      },
    },
  },
  {
    actions: {
      setResults: assign((ctx, event: any) => {
        console.log(event);
        return {
          results: event.data,
        };
      }),
      setMessage: assign((ctx, event: any) => ({
        message: event.data,
      })),
      onChange: assign({
        id: (ctx, e) => e.id,
      }),
    },
  }
);

export const RootChronicle: FunctionComponent = () => {
  const { id } = useParams();
  const [state, send] = useMachine(fetchMachine, {
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

  return (
    <>
      {state.matches('pending') && <Skeleton active />}
      {state.matches('successful') && (
        <ChronicleView chronicle={state.context.results}>
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
