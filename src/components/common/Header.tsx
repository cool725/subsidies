import React from "react";
import { NavLink } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface HeaderProps {
  title?: string;
  className?: string;
  createPath?: string;
  createTitle?: string;
  onPageChange?: void;
  children?: any;
}

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottom: "1px solid #C7C7C7",
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: "28px",
  },
  createButton: {
    marginLeft: 15,
    background: "#002852",

    "& a": {
      textDecoration: "none",
      color: "#fff",
      paddingTop: 5,
      paddingBottom: 5,
    },
  },
});

const Header: React.FC<HeaderProps> = (props) => {
  const classes = useStyles();

  const {
    title = "",
    className,
    createPath = "",
    createTitle = "",
    onPageChange,
    children,
  } = props;

  const [perPage, setPerPage] = React.useState("10");

  const handleChange = (event: SelectChangeEvent) => {
    setPerPage(event.target.value as string);
  };

  return (
    <Box className={clsx(classes.header, className)}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h2" className={classes.headerTitle}>
          {title}
        </Typography>

        {createPath && (
          <Button variant="contained" className={classes.createButton}>
            <NavLink to={createPath}>{createTitle}</NavLink>
          </Button>
        )}
      </Box>

      <Box>
        {children}

        {onPageChange && (
          <Box sx={{ minWidth: 120, display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: "10px" }}>
              Wyświetlaj:
            </Typography>

            <FormControl sx={{ minWidth: 80 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={perPage}
                onChange={handleChange}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
