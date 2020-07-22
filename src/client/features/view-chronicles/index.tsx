import React, { FunctionComponent, useContext, useEffect } from 'react';
import { ApplicationContext } from '../../atoms/applicationContext';
import { useService } from '@xstate/react';
import { ChroniclesHeader } from './components/ChroniclesHeader';
import { List } from 'antd';
import { ChronicleList } from './components/ChronicleList';

export const ViewChronicles: FunctionComponent = () => {
  const application = useContext(ApplicationContext);
  const [appState, appSend] = useService(application);
  const { chronicles } = appState.context;

  return (
    <>
      <ChroniclesHeader onCreateChronicle={() => appSend('CREATE_CHRONICLE')} />
      <ChronicleList chronicles={chronicles} />
    </>
  );
};
