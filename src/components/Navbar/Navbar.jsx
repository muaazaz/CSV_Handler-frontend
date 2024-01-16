import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
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
  mainDiv,
  nameText,
  responsiveDiv,
  responsiveNavStyles,
} from "./styles";
import { routes } from "../../constants/componentConstants";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalData } from "../../RTKQuery/globalSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    [openResp, setOpenResp] = useState(false),
    [anchorRespEl, setAnchorRespEl] = useState(null),
    [pages, setPages] = useState([]),
    { navTab } = useSelector((state) => state.global.globalData),
    navigate = useNavigate(),
    dispatch = useDispatch();

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
    dispatch(setGlobalData({ navTab: val }));
    navigate(val.replace(/ +/g, "").toLowerCase());
  };

  useEffect(() => {
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
          <Box sx={mainDiv}>
            <img src="/gigalabs-logo.png" alt="logo" />
            <span style={logoText}>Gigalabs</span>
          </Box>
          <Tabs
            value={navTab}
            onChange={handleTabChange}
            sx={{ marginTop: "1.3%", ...mainDiv }}
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
            <Typography sx={nameText}>{"John Doe"}</Typography>
            <IconButton onClick={handleUserMenu} sx={nameText}>
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
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ fontSize: "0.9rem" }}>Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
