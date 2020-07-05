import React, { FunctionComponent } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, useLocation, useRouteMatch } from 'react-router-dom';
import './styles.css';

const First = () => <div className="first">First Component</div>;
const Second = () => <div className="second">Second Component</div>;

export const AnimatedSwitch: FunctionComponent = () => {
  const location = useLocation();
  const { path } = useRouteMatch();
  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="slide" timeout={1000}>
        <Switch location={location}>
          <Route path={`${path}/first`}>
            <First />
          </Route>
          <Route path={`${path}/second`} component={Second} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};
