import React, { FunctionComponent, useCallback, useEffect, useContext } from 'react';
import { Typography, message } from 'antd';
import { QuickCreateChronicle } from './components/QuickCreateChronicle';
import { useMachine, useService } from '@xstate/react';
import { createChronicle } from '../../api/chronicle';
import { ApplicationContext } from '../../atoms/applicationContext';
import { Chronicle } from '../../types';
import { createChronicleMachine } from './state/CreateChronicleMachine';

const { Title } = Typography;

export const CreateChronicle: FunctionComponent<{}> = () => {
  const application = useContext(ApplicationContext);
  const [appState, appSend] = useService(application);
  const [state, send] = useMachine(createChronicleMachine, {
    services: { onSubmit: createChronicle }
  });

  const handleChange = useCallback(
    (c: Chronicle) => {
      send([{ type: 'CHANGE', values: c }, 'SUBMIT']);
    },
    [send]
  );

  useEffect(() => {
    if (state.matches('success')) {
      message.success('Chronicle has been created!', 10);
      appSend({ type: 'VIEW_CHRONICLE', data: { id: state.context.values.id } });
    }
  }, [state.value, state.context.values]);

  if (!appState.matches('createChronicle')) {
    return null;
  }

  return (
    <>
      <Title level={2}>Create New Chronicle</Title>
      <QuickCreateChronicle submitting={state.matches('submitting')} onSubmit={handleChange} />
    </>
  );
};
