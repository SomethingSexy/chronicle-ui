import React, { FunctionComponent } from 'react';
import { AnimatedSwitch } from '../../components/AnimatedSwitch';
import { Link } from 'react-router-dom';

export const CreateCharacter: FunctionComponent<{}> = () => {
  return (
    <div>
      Character
      <Link to="/chronicle/create/first">Home</Link>
      <Link to="/chronicle/create/second">Home</Link>
      <AnimatedSwitch />
    </div>
  );
};
