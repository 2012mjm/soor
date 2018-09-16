import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal } from 'antd'
import { deleteProductPhotoThunk } from '../../../thunks/product'
import { connect } from 'react-redux'
import { API_URL } from '../../../lib/constants'
import { notifySuccess, notifyError } from '../../../lib/notification'
import { errorHandler } from '../../../lib/utils'

class FormerPhoto extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  }

  componentDidMount = () => {
    if(this.props.images !== undefined && this.props.images.length > 0) {
      this.setState({fileList: this.props.images.map(image => ({
        uid: image.id,
        status: 'done',
        name: image.name,
        url: image.path,
        response: {id: image.id}
      }))})
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleRemove = (file) => {
    this.props.dispatch(deleteProductPhotoThunk(file.response.id)).then(res => {
      notifySuccess(res.messages[0])
      return true
    }).catch(e => {
      notifyError(errorHandler(e))
      return false
    })
  }

  handleChange = ({fileList, file}) => {
    if(file !== undefined && file.response !== undefined && file.response.messages !== undefined) {
      notifySuccess(file.response.messages[0])
    }
    this.setState({ fileList })
  }

  render () {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">تصویر</div>
      </div>
    )
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div className="clearfix">
        <Upload
          action={`${API_URL}product/photo`}
          accept="image/*"
          data={{'product_id': this.props.productId}}
          headers={{'Authorization': `Bearer ${this.props.auth.token}`}}
          name="photo"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length > 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

FormerPhoto.propTypes = {
  productId: PropTypes.number,
  images: PropTypes.array,
  dispatch: PropTypes.func,
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(FormerPhoto)