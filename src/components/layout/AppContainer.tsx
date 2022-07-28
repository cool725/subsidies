import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function AppContainer() {
  return (
    <Box style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <Box style={{ display: "flex", flexDirection: "column", paddingLeft: 18 }}>
        <TopBar />

        <Box style={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AppContainer;
