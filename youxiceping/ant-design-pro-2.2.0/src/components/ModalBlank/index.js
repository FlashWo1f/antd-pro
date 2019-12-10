import React from 'react';
import {
  Modal
} from 'antd';

// 单纯的控制children 的显示和隐藏
const ModalBlank = (props) => {
  const { visible, width, children, destroyOnClose = true, bodyStyle = {}, zIndex, ...rest } = props;
  return (
    <Modal
      zIndex={zIndex}
      width={width}
      bodyStyle={{ padding: 0, ...bodyStyle }}
      closable={false}
      destroyOnClose={destroyOnClose}
      title={null}
      footer={null}
      maskClosable={false}
      visible={visible}
      {...rest}
    >
      {children}
    </Modal>
  )
}

export default ModalBlank;
