import { assign, Machine } from 'xstate';
import { Chronicle } from '../../../types';

export const createChronicleMachine = Machine<{
  errors: object;
  values: Partial<Chronicle>;
}>(
  {
    id: 'createChronicle',
    initial: 'editing',
    // Context contains all our infinite state, like text input!
    context: {
      errors: {},
      values: {}
    },
    states: {
      editing: {
        initial: 'pristine',
        on: {
          CHANGE: {
            actions: ['onChange']
          },
          SUBMIT: 'submitting'
        },
        states: {
          pristine: {
            // This is up to you, but I felt like the form needed to be cleared before receiving a new submission
            entry: ['clearForm']
          },
          error: {}
        }
      },
      submitting: {
        invoke: {
          src: 'onSubmit',
          onDone: {
            target: 'success',
            actions: ['onSuccess']
          },
          onError: {
            target: 'editing.error',
            actions: ['onError']
          }
        }
      },
      success: {
        on: {
          AGAIN: 'editing'
        }
      }
    }
  },
  {
    actions: {
      // Assign
      onChange: assign({
        values: (ctx, e) => ({
          ...ctx.values,
          ...e.values
        })
      }),
      clearForm: assign({
        values: {},
        errors: {}
      }),
      onError: assign({
        errors: (_ctx, e) => e.data
      }),
      onSuccess: assign({
        values: (ctx, e) => e.data
      })
    }
  }
);
