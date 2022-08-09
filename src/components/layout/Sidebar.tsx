import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { makeStyles, useTheme } from "@mui/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Theme,
  Box,
  Button,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Logo, Home, LeftArrow, News } from "../../assets/svg/index.js";

const useStyles = makeStyles((theme: Theme) => ({
  subtitle: {
    color: theme.palette.primary.main,
    fontSize: "12px !important",
    padding: "12px !important",
    paddingLeft: "24px !important",
  },
  listItem: {
    padding: "12px !important",
    paddingLeft: "24px !important",
  },
  navLink: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    "& svg": {
      padding: 6,
    },
  },
  activeClassName: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
    "& svg": {
      padding: 6,
      borderRadius: 3,
      background: "rgba(180, 23, 48, 0.1)",

      "& path": {
        fill: theme.palette.secondary.main,
      },
    },
    "& .MuiListItem-root::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      width: 3,
      height: 25,
      transform: "translate(0, -50%)",
      background: theme.palette.secondary.main,
      borderRadius: "0px 5px 5px 0px",
    },
  },
}));

interface IChild {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface INav {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  children?: IChild[];
}

const SideBar = () => {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const navs = [
    {
      title: "Strona startowa",
      href: "home",
      icon: <Home />,
    },
    {
      title: "Moduły",
      children: [
        {
          title: "Zestawienie dot. planu finansowego",
          href: "plans",
          icon: <News />,
        },
        {
          title:
            "Zestawienie związane z decyzjami dot. zmian w planie finansowym",
          href: "summaries",
          icon: <News />,
        },
      ],
    },
    {
      title: "SŁOWNIKI podsystemu",
      children: [
        {
          title: "Parametry podsystemu",
          href: "parameters",
          icon: <News />,
        },
        {
          title: "Rodzaje świadczenia",
          href: "benefits",
          icon: <News />,
        },
      ],
    },
    {
      title: "UŻYTKOWNICY",
      children: [
        {
          title: "Zarządzaj użytkownikami",
          href: "users",
          icon: <News />,
        },
      ],
    },
    {
      title: "SYSTEM",
      children: [
        {
          title: "Logi",
          href: "logs",
          icon: <News />,
        },
      ],
    },
  ];

  const renderSideBar = (items: INav[]) => {
    return items.map((item: INav, index: number) => {
      return item.children ? (
        <React.Fragment key={index}>
          <Typography variant="body1" className={classes.subtitle}>
            {item.title}
          </Typography>

          {renderSideBar(item.children)}
        </React.Fragment>
      ) : (
        <NavLink
          key={index}
          to={item?.href || ""}
          className={({ isActive }) =>
            isActive ? classes.activeClassName : classes.navLink
          }
        >
          <ListItem disablePadding>
            <ListItemButton className={classes.listItem}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: 16,
                    fontWeight: 700,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </NavLink>
      );
    });
  };

  useEffect(() => {
    setIsOpen(isDesktop);
  }, [isDesktop]);

  return (
    <>
      <Box
        sx={{
          width: 323,
          borderRight: 0,
          transition: "0.3s",
          marginLeft: !isOpen ? "-323px" : 0,
          background: "#FAFAFA",
        }}
      >
        <Box sx={{ padding: "30px 0 40px 24px" }}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </Box>

        {renderSideBar(navs)}
      </Box>

      <Box>
        <Button
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            zIndex: 200,
            minWidth: 9,
            height: "100%",
            padding: "4px",
            borderRadius: 0,
            border: "1px solid #B4B4B4",
            borderTop: 0,
            borderBottom: 0,
            background: "#FAFAFA",
            ...(!isOpen && {
              "& svg": {
                transform: "rotate(180deg)",
              },
            }),
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <LeftArrow />
        </Button>
      </Box>
    </>
  );
};

export default SideBar;
