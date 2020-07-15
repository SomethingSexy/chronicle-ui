import React, { FunctionComponent } from 'react';
import { CreateChronicle } from './features/create-chronicle';
import { CreateCharacter } from './features/create-character';
import { Layout } from 'antd';
import './style.css';
import { Logo } from './components/layout/Logo';
import { MainNav } from './components/layout/MainNav';
import { MainContent } from './components/layout/MainContent';
import { RootChronicle, ViewChronicle } from './features/view-chronicle';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { useMachine } from '@xstate/react';
import { Machine, assign } from 'xstate';
import { ApplicationContext } from './atoms/applicationContext';
import { ViewChronicles } from './features/view-chronicles';

const { Header, Content, Footer } = Layout;

interface ApplicationMachineContext {
  viewId: string | null;
}

const ApplicationMachine = Machine<ApplicationMachineContext>({
  id: 'Application',
  initial: 'chronicles',
  context: {
    viewId: null
  },
  on: {
    createChronicle: 'createChronicle',
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
    viewChronicle: {}
  }
});

export const Application: FunctionComponent<{}> = () => {
  const [state, send, service] = useMachine(ApplicationMachine);
  return (
    // <Router>
    <ApplicationContext.Provider value={service}>
      <Layout>
        <Header>
          <Logo />
          <MainNav />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <MainContent>
            <ErrorBoundary fallback={<div>Oh no</div>}>
              <ViewChronicles />
              <ViewChronicle />
              <CreateChronicle />
            </ErrorBoundary>
          </MainContent>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Chronicle UI Created by Tyler Cvetan</Footer>
      </Layout>
    </ApplicationContext.Provider>
    // </Router>
  );
};
