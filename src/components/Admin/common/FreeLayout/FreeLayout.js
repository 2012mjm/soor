import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class FreeLayout extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.layout}>
        <div className={classes.mask}>
          <main className={classes.container}>
            {children}
          </main>
        </div>
      </div>
    );
  }
}

FreeLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FreeLayout);
