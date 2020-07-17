import React, { FunctionComponent } from 'react';
import { PageHeader, Button } from 'antd';

export const ChroniclesSummary: FunctionComponent<{
  onCreateChronicle: () => void;
}> = ({ children, onCreateChronicle }) => {
  return (
    <PageHeader
      title="Chronicles"
      extra={[
        <Button key="4" onClick={onCreateChronicle}>
          Add Chronicle
        </Button>
      ]}
    >
      {children}
    </PageHeader>
  );
};
