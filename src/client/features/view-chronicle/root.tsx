import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { ChronicleHeader } from './components/ChronicleHeader';
import { Divider, Row, Col, Layout, Menu, Breadcrumb } from 'antd';
import { useService } from '@xstate/react';
import { ChronicleContext } from '../../atoms/ChronicleMachine';
import { QuickCreateCharacter } from './components/QuickCreateCharacter';
import { Interpreter } from 'xstate';
import { Players } from './components/Players';
import { Characters } from './components/Characters';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  LaptopOutlined,
  NotificationOutlined,
  GlobalOutlined,
  ApartmentOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { FeatureContent } from '../../components/layout/FeatureContext';

const { Header, Content, Footer, Sider } = Layout;

export const ViewChronicleRoot: FunctionComponent<{
  chronicleRef: Interpreter<ChronicleContext>;
}> = ({ chronicleRef }) => {
  const [state, send] = useService(chronicleRef);
  const { chronicle } = state.context;

  //  TODO: if we land on this component we will need to add this back
  // useEffect(() => {
  //   console.log('RUN');
  //   if (appState.context.viewId) {
  //     send('FETCH', { id: appState.context.viewId });
  //   }
  // }, []);

  const routes = useMemo(() => {
    // TODO clean this up
    const core = [
      {
        path: '/chronicles',
        breadcrumbName: 'Chronicles'
      }
    ];

    if (state.matches('character.create')) {
      return [
        ...core,
        {
          path: `/chronicles/${chronicle.id}`,
          breadcrumbName: chronicle.name
        },
        {
          path: `/chronicles/${chronicle.id}/characters`,
          breadcrumbName: 'Characters'
        },
        {
          path: `/chronicles/${chronicle.id}/characters`,
          breadcrumbName: 'Add'
        }
      ];
    }

    if (chronicle) {
      return [
        ...core,
        {
          path: `/chronicles/${chronicle.id}`,
          breadcrumbName: chronicle.name
        }
      ];
    }
  }, [chronicle, state]);

  const handleCreateCharacter = useCallback(() => {
    send('CHARACTER.ADD');
  }, [send]);

  const handleDefaultView = useCallback(() => {
    send('READ');
  }, [send]);

  const handleEditChronicle = useCallback(() => {
    send('EDIT_CHRONICLE');
  }, [send]);

  return (
    <>
      <Sider collapsible collapsed={true} width={200} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
        <Menu defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<GlobalOutlined />}>
            World
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Players
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            Characters
          </Menu.Item>
          <Menu.Item key="2" icon={<PictureOutlined />}>
            Locations
          </Menu.Item>
          <Menu.Item key="2" icon={<ApartmentOutlined />}>
            Relationships
          </Menu.Item>
        </Menu>
      </Sider>
      <FeatureContent>
        <ChronicleHeader
          chronicle={chronicle}
          routes={routes}
          onCreateCharacter={handleCreateCharacter}
          onEditChronicle={handleEditChronicle}
        />
      </FeatureContent>
    </>
  );

  // return (
  //   <Layout>
  // <ChronicleHeader
  //   chronicle={chronicle}
  //   routes={routes}
  //   onCreateCharacter={handleCreateCharacter}
  //   onEditChronicle={handleEditChronicle}
  // />
  //     <Layout>
  //     <Sider collapsible collapsed={true} >
  //         <div className="logo" />
  //         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
  //           <Menu.Item key="1" icon={<PieChartOutlined />}>
  //             Option 1
  //           </Menu.Item>
  //           <Menu.Item key="2" icon={<DesktopOutlined />}>
  //             Option 2
  //           </Menu.Item>
  //           <SubMenu key="sub1" icon={<UserOutlined />} title="User">
  //             <Menu.Item key="3">Tom</Menu.Item>
  //             <Menu.Item key="4">Bill</Menu.Item>
  //             <Menu.Item key="5">Alex</Menu.Item>
  //           </SubMenu>
  //           <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
  //             <Menu.Item key="6">Team 1</Menu.Item>
  //             <Menu.Item key="8">Team 2</Menu.Item>
  //           </SubMenu>
  //           <Menu.Item key="9" icon={<FileOutlined />} />
  //         </Menu>
  //       </Sider>
  //       <Content>
  //       <Divider />
  //     <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
  //       <Col className="gutter-row" span={12}>
  //         <Players />
  //       </Col>
  //       <Col className="gutter-row" span={12}>
  //         <Characters />
  //       </Col>
  //     </Row>
  //     {state.matches('character.create') && (
  //       <QuickCreateCharacter
  //         onCancel={handleDefaultView}
  //         onFinish={() => {
  //           send({ type: 'SUBMIT' });
  //         }}
  //         submitting={state.matches('character.creating')}
  //       />
  //     )}
  //       </Content>
  //     </Layout>

  //   </Layout>
  // );
};
