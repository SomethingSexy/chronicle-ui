import React, { FunctionComponent, useContext, useMemo } from 'react';
import { ApplicationContext } from '../../atoms/applicationContext';
import { useService } from '@xstate/react';
import { ViewChronicleRoot } from './Root';
import { Skeleton } from 'antd';
import { FeatureContent } from '../../components/layout/FeatureContext';

export const ViewChronicle: FunctionComponent = () => {
  const application = useContext(ApplicationContext);
  const [appState] = useService(application);
  const { chronicles, viewId } = appState.context;
  const chronicle = useMemo(() => chronicles.find((c) => c.id === viewId), [chronicles, viewId]);

  if (appState.matches('viewChronicle.pending') || !chronicle) {
    return (
      <FeatureContent>
        <Skeleton active />
      </FeatureContent>
    );
  }

  return <ViewChronicleRoot chronicleRef={chronicle.ref} />;
};
