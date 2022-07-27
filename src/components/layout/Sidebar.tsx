import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Drawer, Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { Logo } from "../../assets/svg/index.js";

const ToggleButton = styled(Button)({
  position: "fixed",
  top: 0,
  bottom: 0,
  zIndex: 200,
  "& .MuiButton-root": {
    minWidth: 20,
    height: "100%",
    padding: 4,
    background: "#fff",
    borderRadius: 0,
    borderTop: 0,
    borderBottom: 0,
  },
});

const SideBar = () => {
  const [isOpened, setIsOpened] = useState<boolean>(true);

  return (
    <>
      <Drawer
        anchor="left"
        open={isOpened}
        variant="permanent"
        sx={{ width: 323 }}
      >
        <Box sx={{ width: 298, padding: "30px 0 0 24px" }}>
          <Logo />
        </Box>
      </Drawer>

      <Box>
        <ToggleButton>
          <KeyboardArrowLeftIcon />
        </ToggleButton>
      </Box>
    </>
  );
};

export default SideBar;
