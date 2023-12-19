import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  appBar,
  avatarDiv,
  logoText,
  responsiveDiv,
  responsiveNavStyles,
} from "./styles";
import { routes } from "../../constants/componentConstants";

const Navbar = () => {
  const [open, setOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    [openResp, setOpenResp] = useState(false),
    [anchorRespEl, setAnchorRespEl] = useState(null),
    [tabValue, setTabValue] = useState("dashboard"),
    [pages, setPages] = useState([]),
    navigate = useNavigate();

  //TO open user menu
  const handleUserMenu = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  //Closing user menu
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setAnchorRespEl(null);
    setOpenResp(false);
  };
  //For loggin out
  const handleLogout = () => {
    navigate("/");
    handleClose();
  };
  //Handling responsive menu
  const handleRespMenu = (e) => {
    setAnchorRespEl(e.currentTarget);
    setOpenResp(true);
  };

  const handleTabChange = (e, val) => {
    setTabValue(val);
    navigate(val.replace(/ +/g, "").toLowerCase());
  };

  useEffect(() => {
    setTabValue(window.location.pathname.substring(1).split("/")[0]);
    setPages(routes);
  }, []);
  return (
    <div>
      <AppBar position="static" sx={appBar}>
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src="/gigalabs-logo.png" alt="logo" />
          <span style={logoText}>Gigalabs</span>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ marginTop: "1.3%" }}
          >
            {pages.map((page, index) => (
              <Tab
                key={index + page}
                label={page}
                value={page.replace(/ +/g, "").toLowerCase()}
              />
            ))}
          </Tabs>
          {/* Reponsive Menu */}
          <Box sx={responsiveDiv}>
            <MenuIcon onClick={handleRespMenu} />
            <Menu
              open={openResp}
              onClose={handleClose}
              anchorEl={anchorRespEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleClose}>
                  <NavLink
                    key={page}
                    to={page.toLowerCase()}
                    style={responsiveNavStyles}
                  >
                    {page}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* User avatar menu */}
          <Box sx={avatarDiv}>
            <IconButton sx={{ float: "right" }} onClick={handleUserMenu}>
              <Typography variant="content">{"John Doe"}</Typography>
              <ExpandMoreIcon />
            </IconButton>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <MenuItem>
                <Button sx={{ color: "gray" }} onClick={handleLogout}>
                  Log Out
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
