import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Drawer,
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
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

class SideMenu extends Component {
  render() {
    const { collapsed, classes } = this.props;

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
            <ChevronRightIcon />
          </IconButton>
        </div>
        <List>
          <ListItem
            button
            onClick={() => this.props.onLinkMenu("/admin/login")}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="صفحه اصلی" />
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
    );
  }
}

SideMenu.propTypes = {
  collapsed: PropTypes.bool,
  onCollapseMenu: PropTypes.func,
  onLinkMenu: PropTypes.func,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(SideMenu)
);
