import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Home, Business, AccountBalance, SwapHoriz, Search, MoreVert } from "@mui/icons-material";

import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const links = [
    { text: "Home", to: "/", icon: <Home /> },
    { text: "Organization", to: "/organization", icon: <Business /> },
    { text: "Assets", to: "/assets", icon: <AccountBalance /> },
    { text: "Trade", to: "/trade", icon: <SwapHoriz /> },
  ];

  const drawerContent = (
    <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <div className="flex flex-col justify-between h-[100vh] py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row px-4">
            {" "}
            <img src="/assets/logo.png" width={50} />
            <div className="flex justify-center items-center">
              <h1 className="text-white text-xl font-bold">Procial Inc</h1>
            </div>
          </div>
          <div className="mx-4 p-2 bg-[#2b2b2b] flex flex-row gap-2 rounded-md">
            <Search />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:border-none focus:outline-none w-auto"
            />
          </div>
          <List>
            {links.map((link) => (
              <ListItem
                button
                key={link.text}
                component={Link}
                to={link.to}
                sx={{
                  backgroundColor:
                    location.pathname === link.to ? "#2b2b2b" : "transparent",
                  "&:hover": {
                    backgroundColor: "#2b2b2b",
                   
                  },
                }}
              >
               <ListItemIcon sx={{ color: "white" }}>{link.icon}</ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className="p-2 bg-[#2b2b2b] flex flex-row justify-evenly items-center">
            <img src="/assets/user.png" width={50} className="rounded-[50%] border-[#1c1c1c] border-[3px]"/>
            <div className="flex flex-col">
                <div>User Name</div>
                <div className="text-[12px]">username@mail.com</div>
            </div>
            <MoreVert />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex">
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ ml: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
              backgroundColor: "#1c1c1c",
            },
          }} anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
              backgroundColor: "#1c1c1c",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </div>
  );
}
