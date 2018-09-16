import React from 'react'
import { connect } from 'react-redux'
import { storeThunk } from '../../../thunks/store'
import { AutoComplete } from 'antd'

class AutoCompletor extends React.Component {
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
    this.setState({loading: true})
    this.props.dispatch(storeThunk()).then((res) => this.setState({
      dataSource: res.map(item => ({text: item.title.fa, value: item.id})),
      loading: false
    }))
  }

  search (keyword) {
    let query = keyword.trim()
    this.setState({goingToSearch: true})
    let result = []

    if (query !== '') {
      this.props.list.forEach(item => {
        if(item.title.fa.indexOf(query) !== -1) {
          result.push({text: item.title.fa, value: item.id})
        }
      })
      if(result.length === 0) result = [{text: 'فروشگاهی یافت نشد.', value: null}]
    }
    else {
      result = this.props.list.map(item => ({text: item.title.fa, value: item.id}))
    }
    return this.setState({keyword: query, goingToSearch: false, dataSource: result})
  }

  onSelect (value) {
    const selectedItem = this.props.list.find((item) => item.id.toString() === value)
    if(selectedItem) this.props.afterSelect(selectedItem)
  }

  render () {
    const {dataSource, loading} = this.state
    return (
      <div>{loading ? <span />
        : <AutoComplete
          dataSource={dataSource}
          onSearch={this.search}
          onSelect={this.onSelect}
          {...this.props}
        />
      }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    list: state.store.list,
    // search: state.search.potentialCustomer
  }
}

export default connect(mapStateToProps)(AutoCompletor)
