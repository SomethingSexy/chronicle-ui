import { FunctionComponent, useCallback } from 'react';
import React from 'react';
import EditorJs from 'react-editor-js';
import { OutputData, API } from '@editorjs/editorjs';
import './editor.css';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';

export const EDITOR_JS_TOOLS: {
  [toolName: string]: any;
} = {
  embed: Embed,
  table: Table,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true
  },
  list: List,
  warning: Warning,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage
};

export const AntEditor: FunctionComponent<{
  holder: string;
  value: OutputData;
  onChange: (v: OutputData) => void;
}> = ({ holder, value, onChange }) => {
  const handleOnChange = useCallback(
    (a: API, data?: OutputData) => {
      onChange(data);
    },
    [onChange]
  );

  return (
    <EditorJs holder={holder} data={value} tools={EDITOR_JS_TOOLS} onChange={handleOnChange}>
      <div id={holder} />
    </EditorJs>
  );
};
