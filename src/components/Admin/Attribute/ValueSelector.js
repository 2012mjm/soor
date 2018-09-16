import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

class ValueSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      goingToSearch: false,
      dataSource: [],
      keyword: '',
      selectedIndex: null
    }
    this.search = this.search.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount () {
    this.setState({
      dataSource: this.props.values.map(item => ({text: item.title.fa, value: item.id})),
      loading: false
    })
  }

  search (keyword) {
    let query = keyword.trim()
    this.setState({goingToSearch: true})
    let result = []

    if (query !== '') {
      this.props.values.forEach(item => {
        if(item.title.fa.indexOf(query) !== -1) {
          result.push({text: item.title.fa, value: item.id})
        }
      })
      if(result.length === 0) result = [{text: 'مقداری یافت نشد.', value: null}]
    }
    else {
      result = this.props.values.map(item => ({text: item.title.fa, value: item.id}))
    }
    return this.setState({keyword: query, goingToSearch: false, dataSource: result})
  }

  onSelect (value) {
    const selectedItem = this.props.values.find((item) => item.id.toString() === value)
    if(selectedItem) this.props.afterSelect(selectedItem)
  }

  render () {
    const {dataSource, loading} = this.state
    const {isMultiple} = this.props
    const Option = Select.Option
    return (
      <div>{loading ? <span />
        : <Select
            showSearch
            mode={(isMultiple) ? "tags" : "default"}
            onSearch={this.search}
            onSelect={this.onSelect}
            style={{width: '315px'}}
            {...this.props}
          >
            {dataSource.map(item => 
              <Option key={item.value}>{item.text}</Option>
            )}
          </Select>
      }
      </div>
    )
  }
}

ValueSelector.propTypes = {
  values: PropTypes.array,
  isMultiple: PropTypes.bool
}

export default ValueSelector
