import React, { FunctionComponent } from 'react';
import { Modal as AntModal } from 'antd';

export const Modal: FunctionComponent<{
  title: string;
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}> = ({ title, children, visible, onCancel, onSubmit }) => {
  return (
    <AntModal title={title} centered visible={visible} onOk={onSubmit} onCancel={onCancel}>
      {children}
    </AntModal>
  );
};
