import { FunctionComponent, useCallback } from 'react';
import React from 'react';
import EditorJs from 'react-editor-js';
import { OutputData, API } from '@editorjs/editorjs';
import './editor.css';

export const AntEditor: FunctionComponent<{
  value: OutputData;
  onChange: (v: OutputData) => void;
}> = ({ value, onChange }) => {
  const handleOnChange = useCallback(
    (a: API, data?: OutputData) => {
      onChange(data);
    },
    [onChange]
  );

  return <EditorJs data={value} onChange={handleOnChange} />;
};
