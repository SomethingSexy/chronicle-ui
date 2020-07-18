import React, { FunctionComponent, useEffect, useCallback, useMemo, useContext } from 'react';
import { ChronicleView } from './components/ChronicleView';
import { Skeleton, Col, Row } from 'antd';
import { useMachine, useService } from '@xstate/react';
import { chronicleMachine, ChronicleContext } from '../../atoms/ChronicleMachine';
import { DefaultView } from './components/DefaultView';
import { QuickCreateCharacter } from './components/QuickCreateCharacter';
import { ApplicationContext } from '../../atoms/applicationContext';
import { Interpreter } from 'xstate';

export const ViewChronicleRoot: FunctionComponent<{
  chronicleRef: Interpreter<ChronicleContext>;
}> = ({ chronicleRef }) => {
  const [state, send] = useService(chronicleRef);
  const { chronicle } = state.context;

  //  TODO: if we land on this component we will need to add this back
  // useEffect(() => {
  //   console.log('RUN');
  //   if (appState.context.viewId) {
  //     send('FETCH', { id: appState.context.viewId });
  //   }
  // }, []);

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

  const handleEditChronicle = useCallback(() => {
    send('EDIT_CHRONICLE');
  }, [send]);

  return (
    <ChronicleView
      chronicle={chronicle}
      routes={routes}
      onCreateCharacter={handleCreateCharacter}
      onEditChronicle={handleEditChronicle}
    >
      {(c) => {
        return (
          <>
            {state.matches('character.create') && (
              <QuickCreateCharacter
                onCancel={handleDefaultView}
                onFinish={() => {
                  send({ type: 'SUBMIT' });
                }}
                submitting={state.matches('character.creating')}
              />
            )}
            <DefaultView />
          </>
        );
      }}
    </ChronicleView>
  );
};
