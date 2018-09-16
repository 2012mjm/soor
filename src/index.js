import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css'
import './antd-rtl.css'
import './index.css'
import './datepicker.css'
import App from './components/App/App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
