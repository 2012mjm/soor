import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  InputLabel,
  Input,
  Button,
  FormControl,
  InputAdornment
} from "@material-ui/core/";
import FingerprintIcon from "@material-ui/icons/FingerprintOutlined";
import LockIcon from "@material-ui/icons/LockOutlined";
import FaceIcon from "@material-ui/icons/FaceOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./styles";

class AdminLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        username: "",
        password: ""
      }
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ values: { ...this.state.values, [name]: value } });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        values: { ...this.state.values, ...nextProps.values }
      });
    }
  }

  render() {
    const { classes, onSubmit } = this.props;
    const { values } = this.state;
    return (
      <form className={classes.form} onSubmit={e => onSubmit(e, values)}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="username">نام کاربری</InputLabel>
          <Input
            id="username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={this.onChange}
            value={values.username}
            endAdornment={
              <InputAdornment position="end">
                <FaceIcon className={classes.inputIcon} />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">کلمه عبور</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            onChange={this.onChange}
            value={values.password}
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <LockIcon className={classes.inputIcon} />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          color="primary"
          className={classes.submit}
        >
          <FingerprintIcon />{" "}ورود
        </Button>
      </form>
    );
  }
}

AdminLoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(AdminLoginForm);
