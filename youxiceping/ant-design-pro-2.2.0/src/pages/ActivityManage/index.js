import React, { Component } from 'react';
import { Card, Button, Modal, Switch } from 'antd'
import { connect } from 'dva'
import SearchForm from './SearchForm'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import TableOprate from '@/components/TableOprate'
import StandardTable from '@/components/StandardTable'
import router from 'umi/router'
import NewActivityModal from './NewActivityModal'
import { showMessage } from '@/utils/utils'
import ModalBlank from '@/components/ModalBlank'
import ShareModal from './ShareModal'

class ActivityManage extends Component {
  state = {
    selectedKey: [],
    selectedRow: []
  }

  columns = [
    {
      title: '活动名称',
      dataIndex: 'actiName',
      width: 120,
    },
    {
      title: '开始/结束时间',
      dataIndex: 'time',
      width: 120,
      render: (field, allFields) => `${allFields.startTime} / ${allFields.endTime}`
    },
    {
      title: '公开',
      dataIndex: 'open',
      width: 120,
      render: field => field ? '是' : '否'
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
    },
    {
      title: '活动开关',
      dataIndex: 'actiSwitch',
      width: 120,
      render: (field, allFields) => {
        return (
          <Switch
            onClick={() => this.triggerActivity(allFields)}
            checked={field}
          />
        )
      }
    },
    {
      title: '完成人数',
      dataIndex: 'doneNum',
      width: 120,
    },
    {
      title: '更新人',
      dataIndex: 'updater',
      width: 120,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 120,
    },
    {
      title: '操作',
      width: 120,
      render: (field, allFields) => {
        return (
          <div style={{ color: '#6F00FF', cursor: 'pointer' }}>
            <span onClick={() => this.handleShare(allFields, true)}>分享&nbsp;&nbsp;</span><span onClick={() => this.toUserManage(allFields)}>活动用户管理&nbsp;&nbsp;</span><span onClick={() => this.editActivity(allFields)}>更多</span>
          </div>
        )
      }
    },
  ]

  componentDidMount() {
    this.queryList()
  }

  handleShare = (allFields, flag) => {
    const { dispatch } = this.props
    dispatch({
      type: 'activityManage/setShareModal',
      payload: {
        ShareModal: flag
      }
    })
  }

  triggerActivity = (e) => {
    console.log(e)
    Modal.confirm({
      title: '确认关闭活动吗',
      content: '一段文本的长度一段文本的长度一段文本的长度.',
      okText: '确认',
      cancelText: '取消',
      onOk: this.closeActivity
    })
  }

  closeActivity = () => {
    // TODOTODO  生成二维码 qr_code
    const { dispatch } = this.props
    dispatch({
      type: ''
    })
  }

  toUserManage = (params) => {
    router.push(`/activityManage/activityUser`)
  }

  editActivity = (formValue) => {
    const { dispatch } = this.props
    dispatch({
      type: 'activityManage/triggleActivityModal',
      payload: {
        formValue,
        operate: 'edit',
        newActivityModal: true
      }
    })
  }

  queryList = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'activityManage/queryActiMana',
      payload: {}
    })
  }

  onSelectRow = (selectedKey, selectedRow) => {
    this.setState({
      selectedKey,
      selectedRow
    })
  }

  newActivity = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'activityManage/triggleActivityModal',
      payload: {
        operate: 'new',
        formValue: {},
        newActivityModal: true
      }
    })
  }

  batchDownload = () => {
    const { selectedKey } = this.state
    if (!selectedKey.length) return showMessage('warning', '请选择活动')
  }

  setFormValue = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: 'activityManage/setActivityFormValue',
      payload
    })
  }

  downloadShare = () => {

  }


  render() {
    const { activityManage: { data, newActivityModal: visible, formValue, operate, ShareModal: ShareModalVisible }, loading } = this.props
    return (
      <PageHeaderWrapper>
        <Card>
          <SearchForm formValue={formValue} />
          <TableOprate>
            <Button style={{ marginLeft: 15 }} icon='plus' onClick={this.newActivity}>新建活动</Button>
            <Button style={{ marginLeft: 15 }} icon='download' onClick={this.batchDownload}>批量下载</Button>
          </TableOprate>
          <StandardTable
            columns={this.columns}
            data={data}
            toSearch={this.queryList}
            loading={loading}
            showSelectedRows
            onSelectRow={this.onSelectRow}
          />
          <NewActivityModal
            visible={visible}
            formValue={formValue}
            setFormValue={this.setFormValue}
            title={operate}
          />
          <ModalBlank visible={ShareModalVisible}>
            <ShareModal handleShare={this.handleShare} downloadShare={this.downloadShare} />
          </ModalBlank>

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ activityManage, loading }) => ({
  activityManage,
  loading: loading.effects['activityManage/queryActiMana']
}))(ActivityManage);