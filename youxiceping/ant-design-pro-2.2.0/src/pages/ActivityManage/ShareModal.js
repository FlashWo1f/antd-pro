import React, { Component } from 'react';
import ModalEditLayout from '@/components/ModalEditLayout'
import { Input } from 'antd'
import QRCode from 'qrcodejs2'

class ShareModal extends Component {
  state = {}

  componentDidMount() {
    this.myQRCode = new QRCode(this.QRCode, {
      text: 'https://www.baidu.com',
      width: 200,
      height: 200,
      colorDark: "#333333", // 二维码颜色
      colorLight: "#ffffff", // 二维码背景色
      correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
    })
  }

  componentWillUnmount() {
    delete this.myQRCode
  }

  render() {
    const { handleShare, downloadShare } = this.props
    const ShareModalProps = {
      title: '分享',
      contentStyle: { minHeight: '120px' },
      onOk: downloadShare,
      onCancel: () => handleShare(null, false)
    }
    return (
      <ModalEditLayout {...ShareModalProps}>
        <Input value="www.baidu.com" />
        科技有限共i是
        <div
          style={{ display: 'inline-block', marginTop: 20 }}
          // eslint-disable-next-line no-return-assign
          ref={(e) => this.QRCode = e}
        />
        <span>请用微信等工具扫码</span>
      </ModalEditLayout>
    );
  }
}

export default ShareModal;