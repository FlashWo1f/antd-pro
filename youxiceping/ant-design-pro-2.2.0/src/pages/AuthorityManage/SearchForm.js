import React from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
} from 'antd'
import { trimFormValue } from '@/utils/utils'

const FormItem = Form.Item
const { RangePicker } = DatePicker
const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}
const dateLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}

const SearchForm = (props) => {
  const { toSearch, form: { getFieldDecorator, getFieldsValue } } = props
  const toSubmit = (e) => {
    e.preventDefault();
    const data = trimFormValue(getFieldsValue())
    toSearch({ ...data })
  }
  const formReset = () => {

  }

  return (
    <div>
      <Form>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem label="账号" {...formLayout}>
              {getFieldDecorator('account')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="姓名" {...formLayout}>
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机号" {...formLayout}>
              {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="权限" {...formLayout}>
              {getFieldDecorator('email')(<Select placeholder="请选择" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem label="活动" {...formLayout}>
              {getFieldDecorator('actiName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="更新时间" {...dateLayout}>
              {getFieldDecorator('updateTime')(<RangePicker placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <span>
              <Button style={{ marginRight: 20 }} type="primary" onClick={toSubmit}>查询</Button>
              <Button type="primary" onClick={formReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Form.create()(SearchForm)