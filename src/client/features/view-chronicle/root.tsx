import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { ChronicleHeader } from './components/ChronicleHeader';
import { Divider, Row, Col } from 'antd';
import { useService } from '@xstate/react';
import { ChronicleContext } from '../../atoms/ChronicleMachine';
import { QuickCreateCharacter } from './components/QuickCreateCharacter';
import { Interpreter } from 'xstate';
import { Players } from './components/Players';
import { Characters } from './components/Characters';

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
    <>
      <ChronicleHeader
        chronicle={chronicle}
        routes={routes}
        onCreateCharacter={handleCreateCharacter}
        onEditChronicle={handleEditChronicle}
      />
      <Divider />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <Players />
        </Col>
        <Col className="gutter-row" span={12}>
          <Characters />
        </Col>
      </Row>
      {state.matches('character.create') && (
        <QuickCreateCharacter
          onCancel={handleDefaultView}
          onFinish={() => {
            send({ type: 'SUBMIT' });
          }}
          submitting={state.matches('character.creating')}
        />
      )}
    </>
  );
};
