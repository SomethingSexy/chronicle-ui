import { FunctionComponent } from 'react';
import React from 'react';

export const Characters: FunctionComponent<{
  items?: any[];
}> = ({ items }) => {
  if (!items || !items.length) {
    return <div>No Players Have Been Added</div>;
  }
};
