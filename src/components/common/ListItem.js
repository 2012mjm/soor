import React from 'react'
import PropTypes from 'prop-types'

class ListItem extends React.Component {
    render () {
      const { title, value, isLTR } = this.props
      return (
        <div className="ant-row">
            <div className="ant-form-item-label ant-col-xs-8">
                {title}
            </div>
            <div className="ant-form-item-control-wrapper ant-col-xs-16">
                <div className={`ant-form-item-control ant-div-item-control ${(isLTR) ? 'ltr-content' : ''}`}>
                    {value}
                </div>
            </div>
        </div>
      )
    }
}

ListItem.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    isLTR: PropTypes.bool
}

export default ListItem