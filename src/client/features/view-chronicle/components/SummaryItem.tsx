import React, { FunctionComponent, CSSProperties } from 'react';

const divStyles = {
  marginBottom: '7px',
  fontSize: '14px',
  lineHeight: '1.5715',
  color: 'rgba(0, 0, 0, 0.65)'
} as CSSProperties;

const pStyles = {
  display: 'inline-block',
  marginRight: '8px',
  color: 'rgba(0, 0, 0, 0.85)'
} as CSSProperties;

export const SummaryItem: FunctionComponent<{
  title: string;
  content: string;
}> = ({ title, content }) => (
  <div style={divStyles}>
    <p style={pStyles}>{title}:</p>
    {content}
  </div>
);
