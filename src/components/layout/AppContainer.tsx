import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function AppContainer() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 18,
          flexGrow: 1,
        }}
      >
        <TopBar />

        <Box
          style={{
            flexGrow: 1,
            padding: "22px 35px 24px 40px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AppContainer;
