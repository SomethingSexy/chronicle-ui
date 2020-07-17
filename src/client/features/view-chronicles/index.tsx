import React, { FunctionComponent, useContext, useEffect } from 'react';
import { ApplicationContext } from '../../atoms/applicationContext';
import { useService } from '@xstate/react';

export const ViewChronicles: FunctionComponent = () => {
  const application = useContext(ApplicationContext);
  const [appState, appSend] = useService(application);

  useEffect(() => {}, []);

  return <div>Chronicles</div>;
};
