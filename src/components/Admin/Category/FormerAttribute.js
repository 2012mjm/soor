import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Switch } from 'antd'
import AttributeAutoComplete from '../Attribute/AutoCompletor'

class FormerAttribute extends Component {
  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    const { categoryId } = this.props
    return (
      <Form className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form, categoryId)) {}
      }}>
        <FormItem label="خواص" {...formItemLayout}>
          {getFieldDecorator('attribute_id', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
          })(
            <AttributeAutoComplete afterSelect={(selected) => {
              this.props.form.setFieldsValue({attribute_id: selected.id})
            }} />
          )}
        </FormItem>
        <FormItem label="اجباری" {...formItemLayout}>
          {getFieldDecorator('is_required', {
            rules: [{required: false}],
          })(
            <Switch size="small" defaultChecked />
          )}
        </FormItem>
        <FormItem label="چندمقداری" {...formItemLayout}>
          {getFieldDecorator('is_multiple', {
            rules: [{required: false}],
          })(
            <Switch size="small" defaultChecked />
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

FormerAttribute.propTypes = {
  categoryId: PropTypes.number,
}

export default Form.create()(FormerAttribute)