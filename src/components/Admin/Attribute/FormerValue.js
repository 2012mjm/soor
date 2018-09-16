import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Upload, Icon } from 'antd'

class FormerValue extends Component {
  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    const { attributeValue, attribute } = this.props
    return (
      <Form className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form, attribute.id)) {}
      }}>
        <FormItem label="عنوان فارسی" {...formItemLayout}>
          {getFieldDecorator('title_fa', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: attributeValue.title_fa
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="عنوان انگلیسی" {...formItemLayout}>
          {getFieldDecorator('title_en', {
            rules: [{required: false}],
            initialValue: attributeValue.title_en
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="مقدار" {...formItemLayout}>
          {getFieldDecorator('value', {
            rules: [{required: false}],
            initialValue: attributeValue.value
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="تصویر" {...formItemLayout}>
          {getFieldDecorator('image', {
            rules: [{required: false}],
          })(
            <Upload name="image" beforeUpload={(image) => {
              return false
            }}>
              <Button>
                <Icon type="upload" /> انتخاب تصویر
              </Button>
            </Upload>
          )}
        </FormItem>
        {attributeValue.image && <FormItem label="تصویر فعلی" {...formItemLayout}>
          {getFieldDecorator('default_image')(
            <img className="default-image" src={attributeValue.image} alt="" />
          )}
        </FormItem>}
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

FormerValue.propTypes = {
  attributeValue: PropTypes.object,
  attribute: PropTypes.object,
  onSubmit: PropTypes.func,
}

FormerValue.defaultProps = {
  attributeValue: {
    id: null,
    title_fa: '',
    title_en: '',
    value: '',
    image: '',
  }
}

export default Form.create()(FormerValue)