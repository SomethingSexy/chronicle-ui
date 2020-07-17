import React, { FunctionComponent, useEffect, useCallback, useMemo, useContext } from 'react';
import { ChronicleView } from './components/ChronicleView';
import { Skeleton, Col, Row } from 'antd';
import { useMachine, useService } from '@xstate/react';
import { chronicleMachine } from '../../atoms/ChronicleMachine';
import { DefaultView } from './components/DefaultView';
import { QuickCreateCharacter } from './components/QuickCreateCharacter';
import { ApplicationContext } from '../../atoms/applicationContext';

export const ViewChronicle: FunctionComponent = () => {
  const application = useContext(ApplicationContext);
  const [appState, appSend] = useService(application);
  const [state, send] = useMachine(chronicleMachine);
  const { chronicle } = state.context;

  useEffect(() => {
    console.log('RUN');
    if (appState.context.viewId) {
      send('FETCH', { id: appState.context.viewId });
    }
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
      {appState.matches('viewChronicle.pending') && <Skeleton active />}
      {chronicle && (
        <ChronicleView chronicle={chronicle} routes={routes} onCreateCharacter={handleCreateCharacter}>
          {(c) => {
            if (state.matches('character.create')) {
              return (
                <QuickCreateCharacter
                  onCancel={handleDefaultView}
                  onFinish={() => {}}
                  submitting={state.matches('character.creating')}
                />
              );
            }
            return <DefaultView />;
          }}
        </ChronicleView>
      )}
    </>
  );
};
