import React, { FunctionComponent, useCallback, useEffect, useContext } from 'react';
import { Typography, message } from 'antd';
import { ChronicleForm } from './components/ChronicleForm';
import { Machine, assign } from 'xstate';
import { Chronicle } from '../../atoms/chronicles';
import { useMachine, useService } from '@xstate/react';
import { createChronicle } from '../../api/chronicle';
import { ApplicationContext } from '../../atoms/applicationContext';

const { Title } = Typography;

const formMachine = Machine<{
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

export const CreateChronicle: FunctionComponent<{}> = () => {
  const application = useContext(ApplicationContext);
  const [appState, appSend] = useService(application);
  const [state, send] = useMachine(formMachine, {
    services: { onSubmit: createChronicle }
  });

  const handleChange = useCallback(
    (c: Chronicle) => {
      send([{ type: 'CHANGE', values: c }, 'SUBMIT']);
    },
    [send]
  );

  useEffect(() => {
    if (state.matches('success')) {
      message.success('Chronicle has been created!', 10);
      appSend({ type: 'VIEW_CHRONICLE', data: { id: state.context.values.id } });
    }
  }, [state.value, state.context.values]);

  if (!appState.matches('createChronicle')) {
    return null;
  }

  return (
    <>
      <Title level={2}>Create New Chronicle</Title>
      <ChronicleForm submitting={state.matches('submitting')} onSubmit={handleChange} />
    </>
  );
};
