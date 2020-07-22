import React, { FunctionComponent } from 'react';
import { Chronicle } from '../../../types';
import { List } from 'antd';

export const ChronicleItem: FunctionComponent<{
  chronicle: Chronicle;
}> = ({ chronicle }) => {
  return (
    <List.Item
      key={chronicle.id}
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
        title={<a href="">{chronicle.name}</a>}
        description={chronicle.description}
      />
      {chronicle.plotHook}
    </List.Item>
  );
};
