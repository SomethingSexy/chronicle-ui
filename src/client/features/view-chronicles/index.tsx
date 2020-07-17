import React, { FunctionComponent, useContext, useEffect } from 'react';
import { ApplicationContext } from '../../atoms/applicationContext';
import { useService } from '@xstate/react';
import { ChroniclesSummary } from './components/ChroniclesSummary';
import { List } from 'antd';

export const ViewChronicles: FunctionComponent = () => {
  const application = useContext(ApplicationContext);
  const [appState, appSend] = useService(application);
  const { chronicles } = appState.context;

  return (
    <ChroniclesSummary onCreateChronicle={() => appSend('CREATE_CHRONICLE')}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={chronicles}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            // actions={[
            //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            // ]}
            // extra={
            //   <img
            //     width={272}
            //     alt="logo"
            //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            //   />
            // }
          >
            <List.Item.Meta
              // avatar={<Avatar src={item.avatar} />}
              title={<a href="">{item.name}</a>}
              description={item.description}
            />
            {item.plotHook}
          </List.Item>
        )}
      ></List>
    </ChroniclesSummary>
  );
};
