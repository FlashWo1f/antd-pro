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
            <FormItem label="活动名称" {...formLayout}>
              {getFieldDecorator('actiName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="活动时间" {...dateLayout}>
              {getFieldDecorator('actiTime')(<RangePicker placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label="状态" {...formLayout}>
              {getFieldDecorator('status')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label="公开" {...formLayout}>
              {getFieldDecorator('open')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem label="申请人" {...formLayout}>
              {getFieldDecorator('applicant')(<Input placeholder="请输入" />)}
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