import { Machine, assign, spawn, Interpreter } from 'xstate';

export interface ChronicleContext {
  chronicleId: string | null;
  chronicle: Chronicle | null;
  characters: Array<
    Character & {
      ref: Interpreter<CharacterContext>;
    }
  >;
  message: any;
}

export const chronicleMachine = Machine<ChronicleContext>(
  {
    id: 'Chronicle',
    initial: 'idle',
    context: {
      chronicleId: null,
      chronicle: null,
      characters: [],
      message: ''
    },
    on: {
      'CHARACTER.ADD': 'character.create',
      READ: 'idle'
    },
    states: {
      idle: {
        id: 'idle',
        // TODO: Add guard to know if we should actually go to initializing
        on: { FETCH: [{ target: 'initializing', actions: ['onChange'] }] }
      },
      initializing: {
        initial: 'pending',
        states: {
          idle: {},
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
            always: '#idle',
            on: {
              FETCH: 'pending'
            }
          }
        }
      },
      character: {
        initial: 'reading',
        states: {
          reading: {},
          create: {}
        }
      }
    }
  },
  {
    actions: {
      setResults: assign<
        ChronicleContext,
        {
          type: 'setResults';
          data: Chronicle;
        }
      >((ctx, event) => {
        return {
          chronicle: event.data
        };
      }),
      setCharacters: assign<ChronicleContext>({
        characters: (ctx) => {
          return ctx.characters.map((character) => ({
            ...character,
            ref: spawn(characterMachine.withContext({ character }))
          }));
        }
      }),
      setMessage: assign((ctx, event: any) => ({
        message: event.data
      })),
      onChange: assign<
        ChronicleContext,
        {
          type: 'onChange';
          id: string;
        }
      >({
        chronicleId: (ctx, e: { id: string }) => e.id
      })
    }
  }
);
import { Chronicle, Character } from '../types';