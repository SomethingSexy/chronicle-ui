import React, { FunctionComponent, useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles.css';
import { ApplicationContext } from '../atoms/applicationContext';
import { useService } from '@xstate/react';

export const AnimatedSwitch: FunctionComponent = ({ children }) => {
  const application = useContext(ApplicationContext);
  const [appState, appSend] = useService(application);

  return (
    <TransitionGroup>
      <CSSTransition key={appState.value.toString()} classNames="slide" timeout={1000}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
