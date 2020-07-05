import React, { FunctionComponent, CSSProperties } from 'react';
// TODO: Switch to BrowserRouter when we are running within node
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { CreateChronicle } from './features/create-chronicle';
import { CreateCharacter } from './features/create-character';
import { Layout, Menu, Breadcrumb } from 'antd';
import './style.css';
import { Logo } from './components/layout/Logo';
import { MainNav } from './components/layout/MainNav';
import { MainContent } from './components/layout/MainContent';
import { RecoilRoot } from 'recoil';
import { ViewChronicle } from './features/view-chronicle';

const { Header, Content, Footer } = Layout;

export const Application: FunctionComponent<{}> = () => {
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <Header>
            <Logo />
            <MainNav />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
            <MainContent>
              <Switch>
                <Route path="/chronicle/create">
                  <CreateChronicle />
                </Route>
                <Route path="/character/create">
                  <CreateCharacter />
                </Route>
                <Route exact path="/chronicle/:id">
                  <ViewChronicle />
                </Route>
              </Switch>
            </MainContent>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Chronicle UI Created by Tyler Cvetan</Footer>
        </Layout>
      </Router>
    </RecoilRoot>
  );
};
