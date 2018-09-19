import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Slide } from "@material-ui/core/";
import styles from "./styles";

class FreeLayout extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.layout}>
        <div className={classes.mask}>
          <main className={classes.container}>
            <Slide
              direction="down"
              in={true}
              mountOnEnter
              unmountOnExit
              timeout={500}
            >
              {children}
            </Slide>
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
