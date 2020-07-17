import { FunctionComponent, useContext, useCallback } from 'react';
import React from 'react';
import { Menu } from 'antd';
import { MenuItem } from './MenuItem';
import { ApplicationContext } from '../../atoms/applicationContext';
import { useService } from '@xstate/react';

export const MainNav: FunctionComponent = () => {
  const application = useContext(ApplicationContext);
  const [state, send] = useService(application);
  return (
    <Menu theme="dark" mode="horizontal">
      <MenuItem label="Chronicles" onClick={() => send('VIEW_CHRONICLES')} />
      <MenuItem label="Characters" onClick={() => send('createCharacter')} />
    </Menu>
  );
};
