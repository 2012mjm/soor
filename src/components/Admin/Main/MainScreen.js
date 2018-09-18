import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { logout } from "../../../actions/auth";
import SideMenu from "../common/SideMenu/SideMenu";
import Header from "../common/Header/Header";

import styles from "./styles";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsedMenu: false
    };
    this.onLinkMenu = this.onLinkMenu.bind(this);
    this.onCollapseMenu = this.onCollapseMenu.bind(this);
  }

  onLinkMenu(key) {
    if (key === "logout") {
      this.props.dispatch(logout());
      this.props.history.push("/admin/login");
    } else {
      this.props.history.push(key);
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
    const { auth, history, classes } = this.props;
    const { collapsedMenu } = this.state;

    if (history.location.pathname === "/admin/login") {
      return <span />;
    }
    // if (auth.isAuthenticated && auth.role !== "manager") {
    //   this.onLinkMenu({ key: "logout" });
    // }
    if (!auth.isAuthenticated) {
      this.onLinkMenu("/admin/login");
    }

    return (
      <div className={classes.root}>
        <Header
          onCollapseMenu={this.onCollapseMenu}
          collapsed={collapsedMenu}
        />

        <SideMenu
          onCollapseMenu={this.onCollapseMenu}
          onLinkMenu={this.onLinkMenu}
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
        {!auth.isAuthenticated && <Redirect to="/admin/login" />}
      </div>
    );
  }
}

MainScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(MainScreen)
);
