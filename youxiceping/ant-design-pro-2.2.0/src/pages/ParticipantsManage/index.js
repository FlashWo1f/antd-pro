import React, { Component, Fragment } from 'react';
import { Card, Button, Modal } from 'antd'
import { connect } from 'dva'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from './SearchForm'
import StandardTable from '@/components/StandardTable'
import TableOprate from '@/components/TableOprate'
// import Authorized from '@/utils/Authorized'

class ParticipantsManage extends Component {
  state = {
    selectedKey: [],
    selectedRow: []
  }

  columns = [
    {
      title: '工号',
      dataIndex: 'workNum',
      width: 120,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'mailbox',
      width: 120,
    },
    {
      title: '活动',
      dataIndex: 'activityName',
      width: 120,
    },
    {
      title: '报告数量',
      dataIndex: 'reportNum',
      width: 120,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 120,
    },
    {
      title: '操作',
      className: 'table_operate',
      // fixed: 'right',
      width: 160,
      render: (field, allFields) => {
        return (
          <Fragment>
            <Button>
              查看
            </Button>
            <Button onClick={() => this.stopAuth(allFields)}>
              停止
            </Button>
          </Fragment>
        )
      }
    }
  ]

  componentDidMount() {
    this.queryList()
  }

  stopAuth = (e) => {
    console.log(e)
    Modal.confirm({
      title: `确认要停止${e.name || '该受测者'}参与此活动吗？`,
      content: '一些简单或者复杂的描述',
      onOk: () => this.handleStopAuth(e),
      confirmLoading: true,
      centered: true,
    })
  }

  handleStopAuth = (e) => {
    const { dispatch } = this.props
    // dispatch({

    // })
  }

  queryList = (payload) => {
    const { dispatch } = this.props
    console.log(1111, payload)
    dispatch({
      type: 'participantsManage/queryPartMana',
      payload
    })
  }

  onSelectRow = (selectedKey, selectedRow) => {
    this.setState({
      selectedKey,
      selectedRow
    })
  }

  downloadReport = () => {
    const { selectedKey, selectedRow } = this.state
    const { dispatch } = this.props
    dispatch({

    })
  }

  downloadTested = () => {
    localStorage.removeItem('antd-pro-authority')
  }

  render() {
    console.log(this.props)
    const { list, loading } = this.props
    return (
      <PageHeaderWrapper>
        <Card>
          <SearchForm toSearch={this.queryList} />
          <TableOprate>
            {/* <Authorized authority='admin'> */}
            <Button style={{ marginLeft: 15 }} onClick={this.downloadReport} route={{ authority: 'admin' }}>下载报告</Button>
            {/* </Authorized> */}
            <Button style={{ marginLeft: 15 }} onClick={this.downloadTested}>下载受测者信息</Button>
          </TableOprate>
          <StandardTable
            columns={this.columns}
            data={list}
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


export default connect((state) => ({
  PropsState: state,
  list: state.participantsManage.data,
  loading: state.loading.effects['participantsManage/queryPartMana'],
}))(ParticipantsManage);