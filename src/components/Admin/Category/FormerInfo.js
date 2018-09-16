import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Upload, Icon } from 'antd'
import TreeSelector from './TreeSelector'

class FormerInfo extends Component {
  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    const { category } = this.props
    return (
      <Form className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form, category.id)) {}
      }}>
        <FormItem label="والد" {...formItemLayout}>
          {getFieldDecorator('parent_id', {
            rules: [{required: false}],
            initialValue: (category.parent_id) && category.parent_id.toString()
          })(
            <TreeSelector
              value={(category.parent_id) && category.parent_id.toString()}
              onSelect={(value) => this.props.form.setFieldsValue({parent_id: value})}
              />
          )}
        </FormItem>
        <FormItem label="عنوان فارسی" {...formItemLayout}>
          {getFieldDecorator('name_fa', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: category.name.fa
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="عنوان انگلیسی" {...formItemLayout}>
          {getFieldDecorator('name_en', {
            rules: [{required: false}],
            initialValue: category.name.en
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="کد رنگ" {...formItemLayout}>
          {getFieldDecorator('color', {
            rules: [{required: false}],
            initialValue: category.color
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="تصویر" {...formItemLayout}>
          {getFieldDecorator('photo', {
            rules: [{required: false}],
          })(
            <Upload name="photo" beforeUpload={(photo) => {
              return false
            }}>
              <Button>
                <Icon type="upload" /> انتخاب تصویر
              </Button>
            </Upload>
          )}
        </FormItem>
        {category.photo && <FormItem label="تصویر فعلی" {...formItemLayout}>
          {getFieldDecorator('default_photo')(
            <img className="default-photo" src={category.image} alt="" />
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

FormerInfo.propTypes = {
  category: PropTypes.object,
}

FormerInfo.defaultProps = {
  category: {
    id: null,
    parent_id: '',
    photo: '',
    name: {},
    color: ''
  }
}

export default Form.create()(FormerInfo)