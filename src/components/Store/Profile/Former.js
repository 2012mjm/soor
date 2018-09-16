import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Upload, Icon } from 'antd'

class Former extends Component {
  render () {
    const FormItem = Form.Item
    const TextArea = Input.TextArea
    const { getFieldDecorator } = this.props.form
    const { store } = this.props
    return (
      <Form className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form)) {}
      }}>
        <FormItem label="ایمیل" {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [{required: false}],
            initialValue: store.email
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="عنوان فروشگاه (فارسی)" {...formItemLayout}>
          {getFieldDecorator('store_name_fa', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: (store.title) && store.title.fa
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="عنوان فروشگاه (انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('store_name_en', {
            rules: [{required: false}],
            initialValue: (store.title) && store.title.en
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="نام صاحب فروشگاه (فارسی)" {...formItemLayout}>
          {getFieldDecorator('owner_fa', {
            rules: [{required: false}],
            initialValue: (store.owner) && store.owner.en
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="نام صاحب فروشگاه (انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('owner_en', {
            rules: [{required: false}],
            initialValue: (store.owner) && store.owner.en
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="شعار (فارسی)" {...formItemLayout}>
          {getFieldDecorator('slogan_fa', {
            rules: [{required: false}],
            initialValue: (store.slogan) && store.slogan.en
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="شعار (انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('slogan_en', {
            rules: [{required: false}],
            initialValue: (store.slogan) && store.slogan.en
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="توضیحات (فارسی)" {...formItemLayout}>
          {getFieldDecorator('description_fa', {
            rules: [{required: false}],
            initialValue: (store.description) && store.description.fa
          })(
            <TextArea />
          )}
        </FormItem>
        <FormItem label="توضیحات (انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('description_en', {
            rules: [{required: false}],
            initialValue: (store.description) && store.description.en
          })(
            <TextArea />
          )}
        </FormItem>
        <FormItem label="لوگو" {...formItemLayout}>
          {getFieldDecorator('logo', {
            rules: [{required: false}],
          })(
            <Upload name="logo" beforeUpload={(logo) => {
              return false
            }}>
              <Button>
                <Icon type="upload" /> انتخاب تصویر
              </Button>
            </Upload>
          )}
        </FormItem>
        {store.logo && <FormItem label="لوگو فعلی" {...formItemLayout}>
          {getFieldDecorator('default_logo')(
            <img className="default-photo" src={store.logo} alt="" />
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
    xs: 9
  },
  wrapperCol: {
    xs: 10
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      offset: 9,
      span: 10,
    }
  }
}

Former.propTypes = {
  store: PropTypes.object,
}

Former.defaultProps = {
  store: {
    id: null,
    title: {
      fa: null,
      en: null
    },
    owner: {
      fa: null,
      en: null
    },
    slogan: {
      fa: null,
      en: null
    },
    description: {
      fa: null,
      en: null
    },
    logo: '',
    email: '',
  }
}

export default Form.create()(Former)