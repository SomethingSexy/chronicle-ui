import React, { FunctionComponent } from 'react';
import { CreateChronicle } from './features/create-chronicle';
import { CreateCharacter } from './features/create-character';
import { Layout } from 'antd';
import './style.css';
import { Logo } from './components/layout/Logo';
import { MainNav } from './components/layout/MainNav';
import { MainContent } from './components/layout/MainContent';
import { ViewChronicle } from './features/view-chronicle';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { useMachine } from '@xstate/react';
import { ApplicationContext } from './atoms/applicationContext';
import { ViewChronicles } from './features/view-chronicles';
import { RenderRoot } from './components/RenderRoot';
import { ApplicationMachine } from './atoms/applicationMachine';
import { fetchChronicle } from './api/chronicle';
import { EditChronicle } from './features/edit-chronicle';

const { Header, Content, Footer } = Layout;

export const Application: FunctionComponent<{}> = () => {
  const [state, send, service] = useMachine(ApplicationMachine, {
    services: {
      fetchData: (data) => {
        return fetchChronicle(data.viewId);
      }
    }
  });

  return (
    <ApplicationContext.Provider value={service}>
      <Layout>
        <Header>
          <Logo />
          <MainNav />
        </Header>
        <MainContent>
          <ErrorBoundary>
            <RenderRoot stateKey="chronicles">
              <ViewChronicles />
            </RenderRoot>
            <RenderRoot stateKey="viewChronicle">
              <ViewChronicle />
            </RenderRoot>
            <RenderRoot stateKey="createChronicle">
              <CreateChronicle />
            </RenderRoot>
            <RenderRoot stateKey="editChronicle">
              <EditChronicle />
            </RenderRoot>
          </ErrorBoundary>
        </MainContent>
        <Footer style={{ textAlign: 'center' }}>Chronicle UI Created by Tyler Cvetan</Footer>
      </Layout>
    </ApplicationContext.Provider>
  );
  // return (
  //   <ApplicationContext.Provider value={service}>
  //     <Layout>
  //       <Header>
  //         <Logo />
  //         <MainNav />
  //       </Header>
  //       <Content style={{ padding: '0 50px' }}>
  //         <MainContent>
  //           <ErrorBoundary>
  //             <RenderRoot stateKey="chronicles">
  //               <ViewChronicles />
  //             </RenderRoot>
  //             <RenderRoot stateKey="viewChronicle">
  //               <ViewChronicle />
  //             </RenderRoot>
  //             <RenderRoot stateKey="createChronicle">
  //               <CreateChronicle />
  //             </RenderRoot>
  //             <RenderRoot stateKey="editChronicle">
  //               <EditChronicle />
  //             </RenderRoot>
  //           </ErrorBoundary>
  //         </MainContent>
  //       </Content>
  //       <Footer style={{ textAlign: 'center' }}>Chronicle UI Created by Tyler Cvetan</Footer>
  //     </Layout>
  //   </ApplicationContext.Provider>
  // );
};
