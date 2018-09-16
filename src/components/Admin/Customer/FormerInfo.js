import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Select } from 'antd'

class FormerInfo extends Component {
  render () {
    const FormItem = Form.Item
    const TextArea = Input.TextArea
    const Option = Select.Option
    const { getFieldDecorator } = this.props.form
    const { customer } = this.props
    return (
      <Form className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form, customer.id)) {}
      }}>
        <FormItem label="موبایل" {...formItemLayout}>
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: (customer.mobile) && customer.mobile
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="نام" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: (customer.name) && customer.name
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="آدرس‌ها" {...formItemLayout}>
          {getFieldDecorator('addresses', {
            initialValue: (customer.addresses) && customer.addresses
          })(
            <TextArea />
          )}
        </FormItem>
        <FormItem label="وضعیت اکانت" {...formItemLayout}>
          {getFieldDecorator('status', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: customer.status
          })(
            <Select onChange={(value) => this.props.form.setFieldsValue({status: value})}>
              <Option value="active">فعال</Option>
              <Option value="inactive">غیر فعال</Option>
              <Option value="banned">مسدود شده</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="btn-block">ثبت</Button>
        </FormItem>
      </Form>
    )
  }
}

const formItemLayout = {
  labelCol: {
    xs: 8
  },
  wrapperCol: {
    xs: 16
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 8
    }
  }
}

FormerInfo.propTypes = {
  customer: PropTypes.object,
}

FormerInfo.defaultProps = {
  customer: {
    id: null,
    mobile: '',
    name: '',
    addresses: '',
    status: '',
  }
}

export default Form.create()(FormerInfo)