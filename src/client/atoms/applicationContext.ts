import { createContext } from 'react';
import { ApplicationMachineContext } from './applicationMachine';
import { Interpreter } from 'xstate';

export const ApplicationContext = createContext<Interpreter<ApplicationMachineContext>>(null);
