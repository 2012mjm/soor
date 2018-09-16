import React from 'react'
import { Tree } from 'antd'
import PropTypes from 'prop-types'

class TreeList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      isShow: false
    }
    this.onSelect = this.onSelect.bind(this)
    this.renderTreeNodes = this.renderTreeNodes.bind(this)
  }

  onSelect = (selectedKeys, info) => {
    const category = info.selectedNodes[0].props.dataRef
    this.props.viewer(true, category)
  }

  componentDidMount = () => {
    this.setState({
      list: this.props.list,
      isShow: false
    }, () => {
      this.setState({isShow: true})
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.list !== this.state.list && nextProps.list) {
      this.setState({
        list: nextProps.list,
        isShow: false
      }, () => {
        this.setState({isShow: true})
      })
    }
  }

  renderTreeNodes = (list) => {
    const TreeNode = Tree.TreeNode

    return list.map((item) => {
      if (item.child) {
        return (
          <TreeNode title={item.name.fa} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.child)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.name.fa} key={item.id} dataRef={item} />
    })
  }

  render () {
    const {list, isShow} = this.state
    return (
      isShow && <Tree
        showLine
        onSelect={this.onSelect}>
        {this.renderTreeNodes(list)}
      </Tree>
    )
  }
}

TreeList.propTypes = {
  list: PropTypes.array,
  viewer: PropTypes.func
}

export default TreeList