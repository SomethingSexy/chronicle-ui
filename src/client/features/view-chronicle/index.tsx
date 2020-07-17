import React, { FunctionComponent, useContext, useMemo } from 'react';
import { ApplicationContext } from '../../atoms/applicationContext';
import { useService } from '@xstate/react';
import { ViewChronicleRoot } from './root';
import { Skeleton } from 'antd';

// TODO: Turn this into some sort of child/service loader
export const ViewChronicle: FunctionComponent = () => {
  const application = useContext(ApplicationContext);
  const [appState] = useService(application);
  const { chronicles, viewId } = appState.context;
  const chronicle = useMemo(() => chronicles.find((c) => c.id === viewId), [chronicles, viewId]);

  if (appState.matches('viewChronicle.pending') || !chronicle) {
    return <Skeleton active />;
  }

  return <ViewChronicleRoot chronicleRef={chronicle.ref} />;
};
