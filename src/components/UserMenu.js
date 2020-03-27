import React from "react";
import { withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";
import { ME } from "../sharedQueries";

// hooks
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

// components
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PersonIcon from "@material-ui/icons/Person";
import PublishIcon from "@material-ui/icons/Publish";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const LOG_OUT = gql`
  mutation logUserOut {
    logOut @client
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    "&:hover": {
      cursor: "pointer"
    }
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  nickName: {
    color: "white",
    marginLeft: "5px",
    fontWeight: 500
  },
  arrow: {
    color: "white",
    fontWeight: 500
  },
  icon: {
    marginRight: "5px"
  }
}));

const UserMenu = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data } = useQuery(ME);
  const [logOutMutation] = useMutation(LOG_OUT);

  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProfileClick = () => {
    if (data?.me) {
      props.history.push(`/user/${data.me.nickName}`);
    }

    setAnchorEl(null);
  };

  const onUploadClick = () => {
    props.history.push(`/book/upload`);

    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    logOutMutation();

    setAnchorEl(null);
  };

  return (
    <>
      <Box className={classes.root} aria-haspopup="true" onClick={handleOpen}>
        <Avatar className={classes.avatar} src={data?.me ? data.me.avatar : ""} />
        {matches && (
          <Typography className={classes.nickName}>{data?.me ? data.me.nickName : ""}</Typography>
        )}
        <ArrowDropDownIcon className={classes.arrow} />
      </Box>
      <Menu
        id="simple-menu"
        elevation={2}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem onClick={onProfileClick}>
          <PersonIcon className={classes.icon} /> 프로필
        </MenuItem>
        <MenuItem onClick={onUploadClick}>
          <PublishIcon className={classes.icon} />책 업로드
        </MenuItem>
        <MenuItem onClick={onLogoutClick}>
          <ExitToAppIcon className={classes.icon} />
          로그아웃
        </MenuItem>
      </Menu>
    </>
  );
};

export default withRouter(UserMenu);
