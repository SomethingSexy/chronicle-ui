import React, { useContext, useMemo } from 'react';
import { EditChronicleForm } from './components/EditChronicleForm';
import { ApplicationContext } from '../../atoms/applicationContext';
import { useService } from '@xstate/react';
import { FeatureContent } from '../../components/layout/FeatureContext';

// TODO we should add a hook for getting the active chronicle
export const EditChronicle = () => {
  const application = useContext(ApplicationContext);
  const [appState] = useService(application);
  const { chronicles, viewId } = appState.context;
  const chronicle = useMemo(() => chronicles.find((c) => c.id === viewId), [chronicles, viewId]);
  return (
    <FeatureContent>
      <EditChronicleForm chronicle={chronicle} />
    </FeatureContent>
  );
};
