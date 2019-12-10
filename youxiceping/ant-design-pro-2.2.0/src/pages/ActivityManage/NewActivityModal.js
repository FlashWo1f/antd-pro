import React, { Component } from 'react';
import { Modal, Form, Input, DatePicker, Radio, Tag, Tooltip, Icon } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker;

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

class NewActivityModal extends Component {
  state = {
    tags: ['Unremovable', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  }

  handleClose = removedTag => {
    const { tags: tags1 } = this.state
    const tags = tags1.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  // eslint-disable-next-line no-return-assign
  saveInputRef = input => (this.input = input);

  handleCancle = () => {
    // eslint-disable-next-line no-underscore-dangle
    window.g_app._store.dispatch({
      type: 'activityManage/triggleActivityModal',
      payload: {
        newActivityModal: false,
        formValue: {},
        operate: '',
      }
    })
  }

  handleCommit = () => {
    const { form: { getFieldsValue } } = this.props
    const formValue = getFieldsValue()
    console.log('formValue1122', formValue)
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state
    const { visible, form: { getFieldDecorator }, title } = this.props
    return (
      <Modal
        visible={visible}
        title={title === 'edit' ? '编辑活动' : '新建活动'}
        destroyOnClose
        onCancel={this.handleCancle}
        onOk={this.handleCommit}
      >
        <div>
          <h3 style={{ fontWeight: 800 }}>基本信息</h3>
          <Form>
            <Form.Item label="活动名称" {...formLayout} style={{ marginBottom: 10 }}>
              {getFieldDecorator('activityName')(<Input placeholder="请输入" />)}
            </Form.Item>
            <Form.Item label="活动时间" {...formLayout} style={{ marginBottom: 10 }}>
              {getFieldDecorator('activityTime')(<RangePicker placeholder="请输入" />)}
            </Form.Item>
            <Form.Item label="活动备注" {...formLayout} style={{ marginBottom: 10 }}>
              {getFieldDecorator('activityMark')(<Input placeholder="请输入" />)}
            </Form.Item>
            <h3 style={{ fontWeight: 800 }}>基本属性设定</h3>
            <Form.Item {...formLayout} style={{ marginBottom: 0 }}>
              {getFieldDecorator('open', {
                initialValue: 1
              })(
                <Radio.Group onChange={this.onRadioChange}>
                  <Radio value={!!true}>公开</Radio>
                  <Radio value={false}>非公开</Radio>
                </Radio.Group>)}
            </Form.Item>
            <h3 style={{ fontWeight: 800 }}>添加管理员（选填）</h3>
            <div>
              {tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag} closable={index !== 0} onClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                    tagElem
                  );
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                  <Icon type="plus" /> New Tag
                </Tag>
              )}
            </div>
            <h3 style={{ fontWeight: 800, marginTop: 10 }}>许可证填写（选填）</h3>
            <h3 style={{ fontWeight: 800, marginTop: 10 }}>添加工具（选填）</h3>
            <h3 style={{ fontWeight: 800, marginTop: 10 }}>受测者查看报告权限</h3>
            <Form.Item {...formLayout} style={{ marginBottom: 0 }}>
              {getFieldDecorator('isSee', {
                initialValue: 1
              })(
                <Radio.Group onChange={this.onRadioChange}>
                  <Radio value={1}>可查看</Radio>
                  <Radio value={2}>不可查看</Radio>
                </Radio.Group>)}
            </Form.Item>
          </Form>

        </div>
      </Modal>
    );
  }
}

export default Form.create({
  name: 'newActivityForm',
  // onFieldsChange: (props) => {
  //   const { form: { getFieldsValue }, setFormValue } = props
  //   const data = getFieldsValue()
  //   const [startTimeMoment, endTimeMoment] = data.activityTime || []
  //   const [startTime, endTime] = [startTimeMoment && moment(startTimeMoment).format('YYYY.MM.DD'), endTimeMoment && moment(endTimeMoment).format('YYYY.MM.DD')]
  //   console.log('zzzzzzz', startTime, moment(startTime))
  //   delete data.activityTime
  //   setFormValue({ ...data, startTime, endTime })
  // },
  mapPropsToFields: (props) => {
    const { formValue } = props
    return {
      activityName: Form.createFormField({ value: formValue.activityName }),
      activityMark: Form.createFormField({ value: formValue.activityMark }),
      open: Form.createFormField({ value: formValue.open }),
      isSee: Form.createFormField({ value: formValue.isSee }),
      activityTime: Form.createFormField({ value: [formValue.startTime && moment(formValue.startTime), formValue.endTime && moment(formValue.endTime)] || [] }),
    }
  }
})(NewActivityModal);