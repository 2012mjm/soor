import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Paper, Typography } from "@material-ui/core/";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./styles";

import { managerLoginThunk } from "../../../thunks/auth";
import { errorHandler } from "../../../lib/utils";

import Notification from "../../../lib/Notification";
import LoginForm from "./LoginForm";
import FreeLayout from "../common/FreeLayout/FreeLayout";

class AdminLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notify: {
        open: false,
        message: null,
        variant: null
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e, values) {
    e.preventDefault();

    this.props
      .dispatch(managerLoginThunk(values))
      .then(res => {
        this.props.history.push("/admin");
        this.setState({
          notify: { open: true, message: res.messages[0], variant: "error" }
        });
        return true;
      })
      .catch(e => {
        this.setState({
          notify: { open: true, message: errorHandler(e), variant: "error" }
        });
        return false;
      });
  }

  render() {
    const { classes } = this.props;
    const { notify } = this.state;
    return (
      <Fragment>
        <FreeLayout>
          <Paper className={classes.paper}>
            <div className={classes.title}>
              <Typography className={classes.headline} variant="headline">
                پنل مدیریت
              </Typography>
            </div>
            <LoginForm onSubmit={this.onSubmit} />
          </Paper>
        </FreeLayout>
        <Notification
          message={notify.message}
          variant={notify.variant}
          open={notify.open}
        />
      </Fragment>
    );
  }
}

AdminLoginScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(AdminLoginScreen)
);
