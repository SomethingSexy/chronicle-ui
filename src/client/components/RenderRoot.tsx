import { useContext, ReactNode } from 'react';
import { ApplicationContext } from '../atoms/applicationContext';
import { useService } from '@xstate/react';
import React from 'react';

export const RenderRoot = ({ children, stateKey }: { children: ReactNode; stateKey: string }) => {
  const application = useContext(ApplicationContext);
  const [appState, appSend] = useService(application);

  console.log(appState.value);
  if (appState.matches(stateKey)) {
    return <div>{children}</div>;
  }

  return null;
};
