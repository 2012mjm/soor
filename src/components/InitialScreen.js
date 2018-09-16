import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'

class InitialScreen extends Component {
  render () {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <h2>Soorino</h2>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(InitialScreen)
