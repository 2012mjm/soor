import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Typography,
  InputLabel,
  Input,
  Button,
  FormControl,
  Slide
} from "@material-ui/core/";
import FingerprintIcon from "@material-ui/icons/FingerprintOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./styles";

// import LoginForm from './LoginForm'
import { managerLoginThunk } from "../../../thunks/auth";
import Notification from "../../../lib/Notification";
import { errorHandler } from "../../../lib/utils";

import FreeLayout from "../common/FreeLayout/FreeLayout";

class AdminLoginScreen extends Component {
  constructor(props) {
    super(props);
    this.adminLoginSubmit = this.adminLoginSubmit.bind(this);
  }

  adminLoginSubmit(e, form) {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (err) return undefined;

      this.props
        .dispatch(managerLoginThunk(values))
        .then(res => {
          this.props.history.push("/admin");
          return (
            <Notification message="ورود با موفقیت انجام شد" variant="success" />
          );
        })
        .catch(e => {
          return <Notification message={errorHandler(e)} variant="error" />;
        });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <FreeLayout>
        <Slide
          direction="down"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={500}
        >
          <Paper className={classes.paper}>
            <div className={classes.title}>
              <Typography className={classes.headline} variant="headline">
                پنل مدیریت
              </Typography>
            </div>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">نام کاربری</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">کلمه عبور</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                color="primary"
                className={classes.submit}
              >
                <FingerprintIcon />
                ورود
              </Button>
            </form>
          </Paper>
        </Slide>
      </FreeLayout>
    );
  }
}

AdminLoginScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AdminLoginScreen);
