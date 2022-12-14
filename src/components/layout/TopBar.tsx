import React, { useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Logout from "@mui/icons-material/Logout";

import { Help } from "../../assets/svg";

import { useAppSelector, useAppDispatch } from "../../services/hook";
import { logout } from "../auth/authSlice";

const useStyles = makeStyles((theme: Theme) => ({
  headerWrapper: {
    height: 85,
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    borderBottom: "1px solid #B4B4B4",
    background: theme.palette.common.white,
    paddingRight: 100,
    "& .MuiButton-root": {
      padding: 10,
    },
  },
  help: {
    padding: "15px !important",
    color: `${theme.palette.primary.main} !important`,
    fontWeight: "700 !important",
    fontSize: "13px !important",
  },
  username: {
    fontSize: "16px !important",
    color: `${theme.palette.text} !important`,
    marginRight: "15px !important",
  },
}));

const TopBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box className={classes.headerWrapper}>
        <Button variant="text" className={classes.help} startIcon={<Help />}>
          POMOC
        </Button>

        <Button
          variant="text"
          onClick={handleClick}
          sx={{ ml: 2, textTransform: "none" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Typography className={classes.username} variant="body1">
            {user?.firstname} {user?.surname}
          </Typography>
          <Avatar sx={{ width: 32, height: 32 }} />
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default TopBar;
