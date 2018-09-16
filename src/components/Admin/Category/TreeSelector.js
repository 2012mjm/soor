import React from 'react'
import PropTypes from 'prop-types'
import { TreeSelect } from 'antd'
import { categoryThunk } from '../../../thunks/category'
import { connect } from 'react-redux'

class TreeSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: {}
    }
    this.normalize = this.normalize.bind(this)
    this.getCategoryList = this.getCategoryList.bind(this)
  }

  getCategoryList = () => {
    this.props.dispatch(categoryThunk()).then((res) => {
      if (res.length > 0) {
        this.setState({list: res})
        return true
      }
    })
  }

  normalize = (list) => {
    let treeData = []
    for(let i=0; i<list.length; i++) {
      let itemI = list[i]
      let listJ = []
      if(itemI.child !== undefined) {
        for(let j=0; j<itemI.child.length; j++) {
          let itemJ = itemI.child[j]
          let listK = []
          if(itemJ.child !== undefined) {
            for(let k=0; k<itemJ.child.length; k++) {
              let itemK = itemJ.child[k]
              listK.push({
                  label: itemK.name.fa,
                  value: itemK.id.toString(),
                  key: itemK.id.toString()
              })
            }
          }
          listJ.push({
            label: itemJ.name.fa,
            value: itemJ.id.toString(),
            key: itemJ.id.toString(),
            children: listK
          })
        }
      }
      treeData.push({
          label: itemI.name.fa,
          value: itemI.id.toString(),
          key: itemI.id.toString(),
          children: listJ
      })
    }
    return treeData
  }

  componentDidMount = () => {
    this.getCategoryList()
  }

  render = () => {
    const { list } = this.state
    return (
      <TreeSelect
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={this.normalize(list)}
        placeholder={this.props.placeholder || "والد"}
        {...this.props}
      />
    )
  }
}

TreeSelector.propTypes = {
  placeholder: PropTypes.string
}

function mapStateToProps (state) {
  return {
  }
}

export default connect(mapStateToProps)(TreeSelector)
