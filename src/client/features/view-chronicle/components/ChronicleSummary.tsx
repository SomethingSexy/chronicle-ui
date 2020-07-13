import { FunctionComponent, useMemo } from 'react';
import React from 'react';
import { Drawer, Row, Col } from 'antd';
import { Chronicle } from '../../../atoms/chronicles';
import { SummaryItem } from './SummaryItem';
import { formatDate } from '../../../utils/date';

export const ChronicleSummary: FunctionComponent<{
  chronicle: Chronicle;
  visible: boolean;
  onClose: () => void;
}> = ({ chronicle, visible, onClose }) => {
  const startingDate = useMemo(() => formatDate(chronicle.startingDate), [chronicle]);
  return (
    <Drawer
      width={640}
      title="Chronicle Details"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <>
        <Row>
          <Col span={12}>
            <SummaryItem title="Game" content={chronicle.gameName} />
          </Col>
          <Col span={12}>
            <SummaryItem title="City" content={chronicle.city} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <SummaryItem title="Starting Date" content={startingDate} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <SummaryItem title="Number of Players" content="0" />
          </Col>
          <Col span={12}>
            <SummaryItem title="Number of Characters" content="0" />
          </Col>
        </Row>
      </>
    </Drawer>
  );
};
