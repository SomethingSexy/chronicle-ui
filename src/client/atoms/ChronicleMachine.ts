import { Machine, assign, spawn, Interpreter, sendParent } from 'xstate';

export interface ChronicleContext {
  chronicleId: string | null;
  chronicle: Chronicle | null;
  characters: Array<
    Character
    // & {
    //   ref: Interpreter<CharacterContext>;
    // }
  >;
  // message: any;
}

export const chronicleMachine = Machine<ChronicleContext>(
  {
    id: 'Chronicle',
    initial: 'idle',
    context: {
      chronicleId: null,
      chronicle: null,
      characters: []
    },
    on: {
      'CHARACTER.ADD': 'character.create',
      READ: 'idle',
      EDIT_CHRONICLE: {
        actions: sendParent((ctx) => (console.log('commit'), { type: 'EDIT_CHRONICLE', todo: ctx }))
      }
    },
    states: {
      idle: {
        id: 'idle'
        // TODO: Add guard to know if we should actually go to initializing
        // on: { FETCH: [{ target: 'initializing', actions: ['onChange'] }] }
      },
      // initializing: {
      //   initial: 'pending',
      //   states: {
      //     idle: {},
      //     pending: {
      //       invoke: {
      //         src: 'fetchData',
      //         onDone: { target: 'successful', actions: ['setResults', 'setCharacters'] },
      //         onError: { target: 'failed', actions: ['setMessage'] }
      //       }
      //     },
      //     failed: {
      //       on: {
      //         FETCH: 'pending'
      //       }
      //     },
      //     successful: {
      //       always: '#idle',
      //       on: {
      //         FETCH: 'pending'
      //       }
      //     }
      //   }
      // },
      character: {
        initial: 'reading',
        states: {
          reading: {},
          create: {
            on: {
              SUBMIT: 'creating'
            }
          },
          creating: {
            entry: 'created'
          },
          created: {}
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
