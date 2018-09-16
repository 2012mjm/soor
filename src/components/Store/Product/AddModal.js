import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { addProductThunk, addProductAttributeThunk } from '../../../thunks/product'
import { infoCategoryThunk } from '../../../thunks/category'
import FormerInfo from './FormerInfo'
import FormerAttribute from './FormerAttribute'
import FormerPhoto from './FormerPhoto'

class AddModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInfoForm: true,
      showAttributeForm: false,
      showPhotoForm: false,
      productId: null,
      modalTitle: 'افزودن محصول جدید',
      footerButton: 'انصراف',
      categoryAttributes: []
    }
    this.create = this.create.bind(this)
    this.getCategoryInfo = this.getCategoryInfo.bind(this)
    this.fillAttributes = this.fillAttributes.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  create = (e, form, id=null) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      this.props.dispatch(addProductThunk(values)).then(res => {
        notifySuccess('محصول جدید با موفقیت ثبت شد.')

        this.getCategoryInfo(values.category_id).then(() => {
          this.setState({
            showInfoForm: false,
            showAttributeForm: true,
            showPhotoForm: false,
            productId: res.id,
            modalTitle: 'ثبت خواص محصول',
            footerButton: 'ادامه و افزودن تصویر'
          })
        }, () => {
          this.setState({
            showInfoForm: false,
            showAttributeForm: false,
            showPhotoForm: true,
            productId: res.id,
            modalTitle: 'افزودن تصاویر محصول',
            footerButton: 'بستن'
          })
        })
        
        this.props.reloadList()
        form.resetFields()
        return true
      }).catch(e => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  getCategoryInfo = (id) => {
    return new Promise((resolve, reject) => {
      this.props.dispatch(infoCategoryThunk(id)).then(res => {
        if(res.product_attributes.length > 0) {
          this.setState({categoryAttributes: res.product_attributes})
          return resolve(res.product_attributes)
        }
        return reject()
      }).catch(e => {
        return reject(e)
      })
    })
  }

  fillAttributes = (e, form, productId) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      values.attributes.forEach((productAttribute, attributeId) => {
        if(!productAttribute.value && !productAttribute.attribute_value_id) return undefined

        productAttribute.product_id = productId
        productAttribute.attribute_id = attributeId
        this.props.dispatch(addProductAttributeThunk(productAttribute)).then(res => {
        })
      })

      notifySuccess('مقادیر خواص جدید با موفقیت ثبت شد.')
      this.setState({
        showInfoForm: false,
        showAttributeForm: false,
        showPhotoForm: true,
        modalTitle: 'افزودن تصاویر محصول',
        footerButton: 'بستن'
      })
    })
  }

  handleClose = (show) => {
    if(this.state.showAttributeForm) {
      this.setState({
        showInfoForm: false,
        showAttributeForm: false,
        showPhotoForm: true,
        modalTitle: 'افزودن تصاویر محصول',
        footerButton: 'بستن'
      })
    } else {
      this.props.viewer(false)
    }
  }

  componentWillReceiveProps = (props) => {
    if(props.show && this.state.productId === null) {
      this.setState({
        showInfoForm: true,
        showAttributeForm: false,
        showPhotoForm: false,
        modalTitle: 'افزودن محصول جدید',
        footerButton: 'انصراف',
      })
    }
    else if(!props.show) {
      this.setState({productId: null})
    }
  }

  render () {
    const { showInfoForm, showAttributeForm, showPhotoForm, categoryAttributes, productId, modalTitle, footerButton } = this.state
    return (
      <Modal
        destroyOnClose
        width={800}
        title={modalTitle}
        visible={this.props.show}
        onCancel={() => this.handleClose(false)}
        footer={<Button onClick={() => this.handleClose(false)}>{footerButton}</Button>}>
          {showInfoForm && <FormerInfo onSubmit={this.create} dispatch={this.props.dispatch} />}
          {showAttributeForm && <FormerAttribute onSubmit={this.fillAttributes} dispatch={this.props.dispatch} productId={productId} categoryAttributes={categoryAttributes} />}
          {showPhotoForm && <FormerPhoto productId={productId} />}
      </Modal>
    )
  }
}

AddModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  reloadList: PropTypes.func,
}

export default AddModal
