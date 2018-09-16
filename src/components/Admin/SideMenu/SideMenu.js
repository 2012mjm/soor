import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import StarIcon from "@material-ui/icons/Star";
import SendIcon from "@material-ui/icons/Send";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.history.push(e.key);
  }

  render() {
    const { collapsed, classes, theme } = this.props;

    return (
      <Drawer
        variant="permanent"
        open={collapsed}
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !collapsed && classes.drawerPaperClose
          )
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => this.props.onCollapseMenu(false)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Send mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
      </Drawer>

      // <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
      //   <div className="logo" >
      //     {/* <img src={logo} alt="logo" height="39" width="97" className="logoimg" /> */}
      //   </div>
      //   <Menu id="mainSideMenu" theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
      //     <Menu.Item key="/admin/product">
      //       <Icon type="shopping-cart" />
      //       <span className="menu">محصولات</span>
      //     </Menu.Item>
      //     <Menu.Item key="/admin/store">
      //       <Icon type="shop" />
      //       <span className="menu">فروشگاه‌ها</span>
      //     </Menu.Item>
      //     <Menu.Item key="/admin/category">
      //       <Icon type="profile" />
      //       <span className="menu">دسته‌بندی‌ها</span>
      //     </Menu.Item>
      //     <Menu.Item key="/admin/invoice">
      //       <Icon type="exception" />
      //       <span className="menu">سفارشات</span>
      //     </Menu.Item>
      //     <Menu.Item key="/admin/customer">
      //       <Icon type="user" />
      //       <span className="menu">مشتری‌ها</span>
      //     </Menu.Item>
      //     <Menu.Item key="/admin/attribute">
      //       <Icon type="exception" />
      //       <span className="menu">خواص محصول</span>
      //     </Menu.Item>
      //   </Menu>
      // </Sider>
    );
  }
}

SideMenu.propTypes = {
  onCollapseMenu: PropTypes.func,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SideMenu);
