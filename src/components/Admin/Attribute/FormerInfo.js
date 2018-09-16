import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'

class FormerInfo extends Component {
  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    const { attribute } = this.props
    return (
      <Form className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form, attribute.id)) {}
      }}>
        <FormItem label="کلید (حروف انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('key', {
            rules: [{required: false}],
            initialValue: attribute.key
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="عنوان فارسی" {...formItemLayout}>
          {getFieldDecorator('title_fa', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: attribute.title.fa
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="عنوان انگلیسی" {...formItemLayout}>
          {getFieldDecorator('title_en', {
            rules: [{required: false}],
            initialValue: attribute.title.en
          })(
            <Input />
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
  attribute: PropTypes.object,
}

FormerInfo.defaultProps = {
  attribute: {
    id: null,
    key: '',
    title: {
      fa: null,
      en: null
    },
  }
}

export default Form.create()(FormerInfo)