import { Machine, assign } from 'xstate';

export const chronicleMachine = Machine(
  {
    id: 'Chronicle',
    initial: 'idle',
    context: {
      id: null,
      chronicle: null,
      message: '',
    },
    states: {
      idle: {
        // TODO: Add guard to know if we should actually go to fetching
        on: { FETCH: [{ target: 'fetching', actions: ['onChange'] }] },
      },
      fetching: {
        initial: 'pending',
        states: {
          idle: {},
          pending: {
            invoke: {
              src: 'fetchData',
              onDone: { target: 'successful', actions: ['setResults'] },
              onError: { target: 'failed', actions: ['setMessage'] },
            },
          },
          failed: {
            on: {
              FETCH: 'pending',
            },
          },
          successful: {
            always: '#loaded',
            on: {
              FETCH: 'pending',
            },
          },
        },
      },
      loaded: {
        id: 'loaded',
      },
    },
  },
  {
    actions: {
      setResults: assign((ctx, event: any) => {
        console.log(event);
        return {
          chronicle: event.data,
        };
      }),
      setMessage: assign((ctx, event: any) => ({
        message: event.data,
      })),
      onChange: assign({
        id: (ctx, e) => e.id,
      }),
    },
  }
);
