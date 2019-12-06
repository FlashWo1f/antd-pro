import React, { Component, Fragment } from 'react';
import { Card, Button, Modal, Switch } from 'antd'
import { connect } from 'dva'
import SearchForm from './SearchForm'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import TableOprate from '@/components/TableOprate'
import StandardTable from '@/components/StandardTable'

class AuthorityManage extends Component {
  state = {}

  columns = [
    {
      title: '账号',
      dataIndex: 'account',
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
      title: '角色',
      dataIndex: 'role',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
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
          <TableOprate>
            <Button icon='plus' style={{ marginLeft: 15 }}>
              添加管理员
            </Button>
          </TableOprate>
          <StandardTable
            columns={this.columns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AuthorityManage;
