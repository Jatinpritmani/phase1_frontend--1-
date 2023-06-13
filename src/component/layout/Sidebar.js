import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginLogo from "../../assets/svg/whiteLogo.svg";
import LogOutIcon from "../../assets/svg/LogoutIcon.svg";
import HomeSelect from "../../assets/svg/HomeSelect.svg";
import CalendarSelect from "../../assets/svg/CalendarSelect.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon, HomeIcon, UserIcon, SettingsIcon } from "./SidebarIcon";
import { logout } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const IconList = [
  {
    icon: <HomeIcon fillF={"0.2"} fillS={"white"} />,
    navigate: "/feed",
    isActive: HomeSelect,
  },
  {
    icon: <CalendarIcon fillF={"0.2"} fillS={"white"} />,
    navigate: "/event",
    isActive: CalendarSelect,
  },
  {
    icon: <UserIcon fillF={"0.2"} fillS={"white"} />,
  },
  {
    icon: <SettingsIcon fillF={"0.2"} fillS={"white"} />,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  return (
    <Box sx={{ display: "flex", textAlign: "center", position: "fixed" }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Box
        height={"100vh"}
        p={5}
        sx={{
          width: 165,
          whiteSpace: "nowrap",
        }}
        bgcolor={"#025464"}
      >
        <img
          src={LoginLogo}
          //   srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          //   alt={item.title}
          loading="lazy"
          style={{ height: "54px", width: "48px" }}
          onClick={() => navigate("/feed")}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <List sx={{ mt: 7 }}>
            {IconList.map((item, index) => (
              <ListItem
                key={index}
                sx={{ display: "block" }}
                onClick={() => navigate(item?.navigate)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    {pathname === item?.navigate ? (
                      <img src={item.isActive} />
                    ) : (
                      item.icon
                    )}

                    {/* <img src={item.icon} /> */}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List sx={{ mt: 7, pb: 5 }}>
            <ListItem
              sx={{ display: "block" }}
              onClick={() => {
                dispatch(logout());
                navigate("/signin");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <img src={LogOutIcon} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
}
