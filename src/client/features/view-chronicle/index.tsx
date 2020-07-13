import React, { FunctionComponent, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ChronicleView } from './components/ChronicleView';
import { Skeleton, Col, Row } from 'antd';
import { useMachine } from '@xstate/react';
import { fetchChronicle } from '../../api/chronicle';
import { chronicleMachine } from './state/chronicle';
import { DefaultView } from './components/DefaultView';
import { QuickCreateCharacter } from './components/QuickCreateCharacter';

export const RootChronicle: FunctionComponent = () => {
  const { id } = useParams();
  const [state, send] = useMachine(chronicleMachine, {
    actions: {
      persist: (ctx) => {
        localStorage.setItem('todos-xstate', JSON.stringify(ctx.todos));
      }
    },
    services: {
      fetchData: (data) => {
        console.log(data);
        return fetchChronicle(data.chronicleId);
      }
    }
  });
  const { chronicle } = state.context;

  useEffect(() => {
    send('FETCH', { id });
  }, []);

  const routes = useMemo(() => {
    // TODO clean this up
    const core = [
      {
        path: '/chronicles',
        breadcrumbName: 'Chronicles'
      }
    ];

    if (state.matches('character.create')) {
      return [
        ...core,
        {
          path: `/chronicles/${chronicle.id}`,
          breadcrumbName: chronicle.name
        },
        {
          path: `/chronicles/${chronicle.id}/characters`,
          breadcrumbName: 'Characters'
        },
        {
          path: `/chronicles/${chronicle.id}/characters`,
          breadcrumbName: 'Add'
        }
      ];
    }

    if (chronicle) {
      return [
        ...core,
        {
          path: `/chronicles/${chronicle.id}`,
          breadcrumbName: chronicle.name
        }
      ];
    }
  }, [chronicle, state]);

  const handleCreateCharacter = useCallback(() => {
    send('CHARACTER.ADD');
  }, [send]);

  const handleDefaultView = useCallback(() => {
    send('READ');
  }, [send]);

  return (
    <>
      {state.matches('initializing.pending') && <Skeleton active />}
      {chronicle && (
        <ChronicleView chronicle={chronicle} routes={routes} onCreateCharacter={handleCreateCharacter}>
          {(c) => {
            if (state.matches('character.create')) {
              return (
                <Row>
                  <Col span={12}>
                    <QuickCreateCharacter
                      onCancel={handleDefaultView}
                      onFinish={() => {}}
                      submitting={state.matches('character.creating')}
                    />
                  </Col>
                </Row>
              );
            }
            return <DefaultView />;
          }}
        </ChronicleView>
      )}
    </>
  );
};
