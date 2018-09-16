import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'
import ValueSelector from '../../Admin/Attribute/ValueSelector'

class FormerInfo extends Component {
  render () {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    const { productId, categoryAttributes } = this.props
    return (
      <Form layout="inline" className="form" onSubmit={(e) => {
        if (this.props.onSubmit(e, this.props.form, productId)) {}
      }}>
        {categoryAttributes.map((attribute, i) =>
          <div style={{marginBottom: '10px'}} key={i}>
            {attribute.values.length > 0 ? <FormItem>
              {getFieldDecorator(`attributes[${attribute.id}][attribute_value_id]`, {
                rules: [{required: (attribute.is_required === 1) ? true : false, message: 'این فیلد الزامی است!'}],
              })(
                <ValueSelector placeholder={attribute.title.fa} values={attribute.values} isMultiple={(attribute.is_multiple === 1) ? true : false}
                  afterSelect={(selected) => {}
                } />
              )}
            </FormItem> : <FormItem>
              {getFieldDecorator(`attributes[${attribute.id}][value]`, {
                rules: [{required: (attribute.is_required === 1) ? true : false, message: 'این فیلد الزامی است!'}],
              })(
                <Input placeholder={attribute.title.fa} />
              )}
            </FormItem>}
            <FormItem>
              {getFieldDecorator(`attributes[${attribute.id}][increase_price]`, {
                rules: [{required: false}],
              })(
                <Input placeholder="مبلغ اضافی" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator(`attributes[${attribute.id}][discount]`, {
                rules: [{required: false}],
              })(
                <Input placeholder="تخفیف" />
              )}
            </FormItem>
          </div>
        )}
        <FormItem>
          <Button type="primary" htmlType="submit" className="btn-block">ثبت</Button>
        </FormItem>
      </Form>
    )
  }
}

// const formItemLayout = {
//   labelCol: {
//     xs: 8
//   },
//   wrapperCol: {
//     xs: 16
//   }
// }

// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 16,
//       offset: 8
//     }
//   }
// }

FormerInfo.propTypes = {
  productId: PropTypes.number,
  categoryAttributes: PropTypes.array
}

export default Form.create()(FormerInfo)