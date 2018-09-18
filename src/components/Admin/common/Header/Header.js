import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

class Header extends Component {
  render() {
    const { collapsed, classes } = this.props;

    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, collapsed && classes.appBarShift)}
      >
        <Toolbar disableGutters={!collapsed}>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => this.props.onCollapseMenu(true)}
            className={classNames(
              classes.menuButton,
              collapsed && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Header
            {/* <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" /> مدیر سیستم */}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  collapsed: PropTypes.bool,
  onCollapseMenu: PropTypes.func,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Header);
