import React, { useContext, useMemo } from 'react';
import { EditChronicleForm } from './components/EditChronicleForm';
import { ApplicationContext } from '../../atoms/applicationContext';
import { useService } from '@xstate/react';

export const EditChronicle = () => {
  const application = useContext(ApplicationContext);
  const [appState] = useService(application);
  const { chronicles, viewId } = appState.context;
  const chronicle = useMemo(() => chronicles.find((c) => c.id === viewId), [chronicles, viewId]);
  return <EditChronicleForm chronicle={chronicle} />;
};
