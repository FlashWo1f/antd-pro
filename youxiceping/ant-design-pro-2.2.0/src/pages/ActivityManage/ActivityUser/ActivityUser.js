import React, { Component, Fragment } from 'react';
import SearchForm from './SearchForm'
import { connect } from 'dva'
import { Card, Button, Modal } from 'antd'
import TableOprate from '@/components/TableOprate'
import StandardTable from '@/components/StandardTable'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'


class ActivityUser extends Component {
  state = {}

  columns = [
    {
      title: '工号',
      dataIndex: 'workId',
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
      dataIndex: 'email',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
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

  render() {
    return (
      <PageHeaderWrapper>
        <Card>
          <SearchForm />
          <StandardTable
            columns={this.columns}
            showSelectedRows
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ActivityUser;