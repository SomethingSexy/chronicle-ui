import { Machine, assign, sendParent } from 'xstate';
import { Character } from '../../../atoms/chronicles';

export interface CharacterContext {
  character: Character | null;
}

export const characterMachine = Machine<CharacterContext>({
  id: 'Character',
  initial: 'reading',
  context: {
    character: null
  },
  // on: {
  //   TOGGLE_COMPLETE: {
  //     target: '.reading.completed',
  //     actions: [
  //       assign({ completed: true }),
  //       sendParent((ctx) => (console.log('commit'), { type: 'TODO.COMMIT', todo: ctx })),
  //     ],
  //   },
  //   DELETE: 'deleted',
  // },
  states: {
    reading: {}
    // reading: {
    //   initial: 'unknown',
    //   states: {
    //     unknown: {
    //       on: {
    //         '': [{ target: 'completed', cond: (ctx) => ctx.completed }, { target: 'pending' }],
    //       },
    //     },
    //     pending: {
    //       on: {
    //         SET_COMPLETED: {
    //           target: 'completed',
    //           actions: [assign({ completed: true }), sendParent((ctx) => ({ type: 'TODO.COMMIT', todo: ctx }))],
    //         },
    //       },
    //     },
    //     completed: {
    //       on: {
    //         TOGGLE_COMPLETE: {
    //           target: 'pending',
    //           actions: [assign({ completed: false }), sendParent((ctx) => ({ type: 'TODO.COMMIT', todo: ctx }))],
    //         },
    //         SET_ACTIVE: {
    //           target: 'pending',
    //           actions: [assign({ completed: false }), sendParent((ctx) => ({ type: 'TODO.COMMIT', todo: ctx }))],
    //         },
    //       },
    //     },
    //     hist: {
    //       type: 'history',
    //     },
    //   },
    //   on: {
    //     EDIT: {
    //       target: 'editing',
    //       actions: 'focusInput',
    //     },
    //   },
    // },
    // editing: {
    //   onEntry: assign({ prevTitle: (ctx) => ctx.title }),
    //   on: {
    //     CHANGE: {
    //       actions: assign({
    //         title: (ctx, e) => e.value,
    //       }),
    //     },
    //     COMMIT: [
    //       {
    //         target: 'reading.hist',
    //         actions: sendParent((ctx) => ({ type: 'TODO.COMMIT', todo: ctx })),
    //         cond: (ctx) => ctx.title.trim().length > 0,
    //       },
    //       { target: 'deleted' },
    //     ],
    //     BLUR: {
    //       target: 'reading',
    //       actions: sendParent((ctx) => ({ type: 'TODO.COMMIT', todo: ctx })),
    //     },
    //     CANCEL: {
    //       target: 'reading',
    //       actions: assign({ title: (ctx) => ctx.prevTitle }),
    //     },
    //   },
    // },
    // deleted: {
    //   onEntry: sendParent((ctx) => ({ type: 'TODO.DELETE', id: ctx.id })),
    // },
  }
});
