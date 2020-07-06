import React, { FunctionComponent, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { ChronicleView } from './components/ChronicleView';
import { ChronicleSummary } from './components/ChronicleSummary';
import { Players } from './components/Players';
import { Characters } from './components/Characters';
import { Skeleton } from 'antd';

export const RootChronicle: FunctionComponent = () => {
  const { id } = useParams();
  return (
    <Suspense fallback={<Skeleton active />}>
      <ChronicleView id={id}>
        {(c) => (
          <>
            <Players items={c.players} />
            <Characters items={c.characters} />
          </>
        )}
      </ChronicleView>
    </Suspense>
  );
};
