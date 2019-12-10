import React, { useEffect } from 'react';
import {
  Icon,
  Button
} from 'antd';
import styles from './index.less';
import { isFn } from '@/utils/utils';

const ModalEditLayout = (props) => {
  const { title, onCancel, onOk, okText, cancelText, children, hideBtOk, hideBtCancel, submiting, didMount } = props;
  const { contentStyle, footerStyle = {} } = props;

  useEffect(() => {
    if (isFn(didMount)) {
      didMount();
    }
  }, []);

  return (
    <div className={styles.modalEditLayout}>
      <div className="ant-modal-header">
        <div className="ant-modal-title">{title || '标题'}</div>
      </div>
      <span aria-label="Close" className="ant-modal-close" onClick={onCancel}>
        <span className="ant-modal-close-x"><Icon type="close" /></span>
      </span>
      <div className={styles.content} style={contentStyle || {}}>
        {children}
      </div>
      <div className={styles.footer} style={footerStyle}>
        {hideBtCancel ? null : <Button className="login-form-button" onClick={onCancel}>{cancelText || '取消'}</Button>}
        {hideBtOk ? null : <Button type="primary" htmlType="submit" loading={submiting} onClick={onOk} className="login-form-button" style={{ marginLeft: '15px' }}>{okText || '保存'}</Button>}
      </div>
    </div>
  )
}

export default ModalEditLayout;
