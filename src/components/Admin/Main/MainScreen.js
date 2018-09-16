import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import SideMenu from "../SideMenu/SideMenu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Icon
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedMenu: false
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.onCollapseMenu = this.onCollapseMenu.bind(this);
  }

  handleMenuClick({ key }) {
    if (key === "logout") {
      this.props.dispatch(logout());
      this.props.history.push("/admin/login");
    }
  }

  onCollapseMenu(collapsed) {
    if (collapsed) {
      this.setState({ collapsedMenu: collapsed });
    } else {
      this.setState({ collapsedMenu: !this.state.collapsedMenu });
    }
  }

  render() {
    const { auth, history, classes, theme } = this.props;
    const { collapsedMenu } = this.state;
    // const menu = (
    //   <Menu className="menu" selectedKeys={[]} onClick={this.handleMenuClick}>
    //     <Menu.Item key="logout"><Icon type="logout" />خروج</Menu.Item>
    //   </Menu>
    // )

    // if (history.location.pathname === '/admin/login') { return <span /> }
    // if (auth.isAuthenticated && auth.role !== 'manager') { this.handleMenuClick({key: 'logout'}) }
    // if (!auth.isAuthenticated) { this.props.history.push('/admin/login') }
    return (
      <div className={classes.root}>
        {/* {...this.props} */}
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            collapsedMenu && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!collapsedMenu}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={() => this.onCollapseMenu(true)}
              className={classNames(
                classes.menuButton,
                collapsedMenu && classes.hide
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

        <SideMenu
          onCollapseMenu={this.onCollapseMenu}
          collapsed={collapsedMenu}
        />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {/* <Route path="/admin/category" component={CategoryScreen} /> */}
          </Switch>
          <div className="globalFooter">
            <div className="copyright">
              <Icon type="copyright" /> کلیه حقوق محفوظ است
            </div>
          </div>
        </main>
        {/* {!auth.isAuthenticated && <Redirect to="/admin/login" />} */}
      </div>
    );
  }
}

MainScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(MainScreen)
);
