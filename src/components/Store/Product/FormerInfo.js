import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'
import CategorySelector from '../../Admin/Category/TreeSelector'

class FormerInfo extends Component {
  render () {
    const FormItem = Form.Item
    const TextArea = Input.TextArea
    const { getFieldDecorator } = this.props.form
    const { product } = this.props
    return (
      <Form className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form, product.id)) {}
      }}>
        <FormItem label="دسته" {...formItemLayout}>
          {getFieldDecorator('category_id', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: (product.category) && product.category.id.toString()
          })(
            <CategorySelector
              placeholder=""
              value={(product.category_id) && product.category_id.toString()}
              onSelect={(value) => this.props.form.setFieldsValue({category_id: value})}
            />
          )}
        </FormItem>
        <FormItem label="عنوان محصول (فارسی)" {...formItemLayout}>
          {getFieldDecorator('name_fa', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: (product.title) && product.title.fa
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="عنوان محصول (انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('name_en', {
            initialValue: (product.title) && product.title.en
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="قیمت (تومان)" {...formItemLayout}>
          {getFieldDecorator('price', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: product.price
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="تخفیف (تومان)" {...formItemLayout}>
          {getFieldDecorator('discount', {
            initialValue: product.discount
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="تعداد موجودی" {...formItemLayout}>
          {getFieldDecorator('quantity', {
            rules: [{required: true, message: 'این فیلد الزامی است!'}],
            initialValue: product.quantity
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="وزن محصول (کیلوگرم)" {...formItemLayout}>
          {getFieldDecorator('weight', {
            initialValue: product.weight
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="ابعاد (طول*عرض*ارتفاع) سانتی‌متر" {...formItemLayout}>
          {getFieldDecorator('dimensions', {
            initialValue: product.dimensions
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="توضیحات (فارسی)" {...formItemLayout}>
          {getFieldDecorator('description_fa', {
            initialValue: (product.description) && product.description.fa
          })(
            <TextArea />
          )}
        </FormItem>
        <FormItem label="توضیحات (انگلیسی)" {...formItemLayout}>
          {getFieldDecorator('description_en', {
            initialValue: (product.description) && product.description.en
          })(
            <TextArea />
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

FormerInfo.propTypes = {
  product: PropTypes.object,
}

FormerInfo.defaultProps = {
  product: {
    id: null,
    product_id: null,
    name_fa: '',
    name_en: '',
    description_fa: '',
    description_en: '',
    price: '',
    discount: '',
    quantity: '',
    weight: '',
    dimensions: '',
  }
}

export default Form.create()(FormerInfo)