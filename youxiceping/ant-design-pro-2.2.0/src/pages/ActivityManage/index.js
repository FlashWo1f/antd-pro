import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd'
import { connect } from 'dva'
import SearchForm from './SearchForm'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import TableOprate from '@/components/TableOprate'
import StandardTable from '@/components/StandardTable'

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
    },
    {
      title: '公开',
      dataIndex: 'open',
      width: 120,
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
      dataIndex: 'workNum',
      width: 120,
    },
  ]

  componentDidMount() {
    this.queryList()
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

  render() {
    const { activityManage: { data }, loading } = this.props
    return (
      <PageHeaderWrapper>
        <Card>
          <SearchForm />
          <TableOprate>
            <Button style={{ marginLeft: 15 }} icon='plus'>添加用户</Button>
            <Button style={{ marginLeft: 15 }} icon='download'>批量下载</Button>
            <Button style={{ marginLeft: 15 }}>发送通知</Button>
            <Button style={{ marginLeft: 15 }}>发送报告</Button>
          </TableOprate>
          <StandardTable
            columns={this.columns}
            data={data}
            toSearch={this.queryList}
            loading={loading}
            showSelectedRows
            onSelectRow={this.onSelectRow}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ activityManage, loading }) => ({
  activityManage,
  loading: loading.effects['activityManage/queryActiMana']
}))(ActivityManage);