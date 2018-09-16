import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'
import { updateCategoryThunk, deleteCategoryThunk } from '../../../thunks/category'
import FormerInfo from './FormerInfo'

class EditModal extends React.Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  update (e, form, id) {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return undefined

      let data = new window.FormData()
      data.append('id', id)
      if(values.parent_id) data.append('parent_id', values.parent_id)
      if(values.name_fa) data.append('name_fa', values.name_fa)
      if(values.name_en) data.append('name_en', values.name_en)
      if(values.color) data.append('color', values.color)
      if(values.photo) data.append('photo', values.photo.file)

      this.props.dispatch(updateCategoryThunk(data)).then(res => {
        notifySuccess('دسته مورد نظر با موفقیت بروز شد.')
        this.props.reloadList()
        this.props.viewer(false)
        form.resetFields()
        return true
      }).catch(e => {
        notifyError(errorHandler(e))
        return false
      })
    })
  }

  delete (id) {
    this.props.dispatch(deleteCategoryThunk(id)).then(res => {
      notifySuccess('دسته مورد نظر با موفقیت حذف شد.')
      this.props.reloadList()
      this.props.viewer(false)
    }).catch(e => {
      notifyError(errorHandler(e))
      return false
    })
  }

  render () {
    const { category } = this.props
    return (
      <Modal
        destroyOnClose
        title="ویرایش دسته موردنظر"
        visible={this.props.show}
        onCancel={() => this.props.viewer(false)}
        footer={<div>
          <Button onClick={() => this.props.viewer(false)}>لغو</Button>
          <Button type="danger" onClick={() => this.delete(category.id)}>حذف دسته</Button>
        </div>}>
        <FormerInfo onSubmit={this.update} dispatch={this.props.dispatch} category={category} />
      </Modal>
    )
  }
}

EditModal.propTypes = {
  show: PropTypes.bool,
  viewer: PropTypes.func,
  dispatch: PropTypes.func,
  category: PropTypes.object,
  reloadList: PropTypes.func
}

export default EditModal
