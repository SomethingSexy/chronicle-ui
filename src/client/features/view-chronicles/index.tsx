import React, { FunctionComponent, useContext } from 'react';
import { ApplicationContext } from '../../atoms/applicationContext';
import { useService } from '@xstate/react';

export const ViewChronicles: FunctionComponent = () => {
  const application = useContext(ApplicationContext);
  const [appState, appSend] = useService(application);

  if (!appState.matches('chronicles')) {
    return null;
  }

  return <div>Chronicles</div>;
};
