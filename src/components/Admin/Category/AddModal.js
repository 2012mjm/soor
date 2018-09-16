import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { addCategoryThunk, addCategoryAttributeThunk } from '../../../thunks/category'
import FormerInfo from './FormerInfo'
import FormerAttribute from './FormerAttribute'

class AddModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInfoForm: true,
      showAttributeForm: false,
      categoryId: null,
      modalTitle: 'افزودن دسته جدید',
      footerButton: 'انصراف',
    }
    this.create = this.create.bind(this)
    this.addAttribute = this.addAttribute.bind(this)
  }

  create = (e, form, id=null) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      let data = new window.FormData()
      if(values.parent_id) data.append('parent_id', values.parent_id)
      if(values.name_fa) data.append('name_fa', values.name_fa)
      if(values.name_en) data.append('name_en', values.name_en)
      if(values.color) data.append('color', values.color)
      if(values.photo) data.append('photo', values.photo.file)

      this.props.dispatch(addCategoryThunk(data)).then(res => {
        notifySuccess('دسته جدید با موفقیت ثبت شد.')
        this.setState({
          showInfoForm: false,
          showAttributeForm: true,
          categoryId: res.id,
          modalTitle: 'افزودن خواص جدید',
          footerButton: 'بستن'
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

  addAttribute = (e, form, categoryId) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      values.category_id = categoryId
      values.is_required = (values.is_required === false) ? 0 : 1
      values.is_multiple = (values.is_multiple === false) ? 0 : 1

      this.props.dispatch(addCategoryAttributeThunk(values)).then(res => {
        notifySuccess('خواص جدید با موفقیت ثبت شد.')
        this.setState({
          modalTitle: 'افزودن خواص جدید دیگر',
          footerButton: 'اتمام و بستن',
          showAttributeForm: false
        }, (nextState) => {
          this.setState({showAttributeForm: true})
        })
        return true
      }).catch(e => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  componentWillReceiveProps = (props) => {
    if(props.show && this.state.categoryId === null) {
      this.setState({
        showInfoForm: true,
        showAttributeForm: false,
        modalTitle: 'افزودن دسته جدید',
        footerButton: 'انصراف',
      })
    }
    else if(!props.show) {
      this.setState({categoryId: null})
    }
  }

  render () {
    const { showInfoForm, showAttributeForm, categoryId, modalTitle, footerButton } = this.state
    return (
      <Modal
        destroyOnClose
        title={modalTitle}
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<Button onClick={() => this.props.viewer(false)}>{footerButton}</Button>}>
          {showInfoForm && <FormerInfo onSubmit={this.create} dispatch={this.props.dispatch} categoryList={this.props.categoryList} />}
          {showAttributeForm && <FormerAttribute onSubmit={this.addAttribute} categoryId={categoryId} />}
      </Modal>
    )
  }
}

AddModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  reloadList: PropTypes.func,
  categoryList: PropTypes.array
}

export default AddModal
