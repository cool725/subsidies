import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Box sx={{ padding: "40px" }}>
      <Typography variant="h4">404: Page Not Found</Typography>

      <NavLink to="/home">Go to home</NavLink>
    </Box>
  );
};

export default NotFound;
