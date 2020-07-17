import { Chronicle } from '../types';
import { assign, Interpreter, Machine } from 'xstate';
import { ChronicleContext } from './ChronicleMachine';

export interface ApplicationMachineContext {
  chronicles: Array<
    Chronicle
    // & {
    //   ref: Interpreter<ChronicleContext>;
    // }
  >;
  viewId: string | null;
}

export const ApplicationMachine = Machine<ApplicationMachineContext>(
  {
    id: 'Application',
    initial: 'chronicles',
    context: {
      chronicles: [],
      viewId: null
    },
    on: {
      CREATE_CHRONICLE: 'createChronicle',
      VIEW_CHRONICLE: {
        target: 'viewChronicle',
        actions: [
          assign({
            viewId: (context, event) => {
              console.log(event);
              return event.data.id;
            }
          })
        ]
      }
    },
    states: {
      chronicles: {},
      createChronicle: {},
      viewChronicle: {
        initial: 'pending',
        states: {
          reading: {},
          pending: {
            invoke: {
              src: 'fetchData',
              onDone: { target: 'successful', actions: ['setResults', 'setCharacters'] },
              onError: { target: 'failed', actions: ['setMessage'] }
            }
          },
          failed: {
            on: {
              FETCH: 'pending'
            }
          },
          successful: {
            always: 'reading',
            on: {
              FETCH: 'pending'
            }
          }
        }
      }
    }
  },
  {
    actions: {
      setResults: assign<
        ApplicationMachineContext,
        {
          type: 'setResults';
          data: Chronicle;
        }
      >({
        chronicles: (ctx, event) => [...ctx.chronicles, event.data]
      })
    }
  }
);
