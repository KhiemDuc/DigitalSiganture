import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import { Card, Icon, Button, Modal, Slide } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import logo from "../../assets/images/Knb.svg";
import { Clear } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Notification = styled("div")(() => ({
  padding: "16px",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  height: 64,
  boxShadow:
    "0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)",
  "& h5": {
    marginLeft: "8px",
    marginTop: 0,
    marginBottom: 0,
    fontWeight: "500",
  },
}));

const NotificationCard = styled(Box)(({ theme }) => ({
  position: "relative",
  "&:hover": {
    "& .messageTime": {
      display: "none",
    },
    "& .deleteButton": {
      opacity: "1",
    },
  },
  "& .messageTime": {
    color: theme.palette.text.secondary,
  },
  "& .icon": { fontSize: "1.25rem" },
}));

const Heading = styled("span")(({ theme }) => ({
  fontWeight: "500",
  marginLeft: "16px",
  color: theme.palette.text.secondary,
}));

const CardLeftContent = styled("div")(({ theme }) => ({
  padding: "12px 8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "rgba(0, 0, 0, 0.01)",
  "& small": {
    fontWeight: "500",
    marginLeft: "16px",
    color: theme.palette.text.secondary,
  },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  opacity: "0",
  position: "absolute",
  right: 5,
  marginTop: 9,
  marginRight: "24px",
  background: "rgba(0, 0, 0, 0.01)",
}));
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  typography: {
    fontFamily: '"Public Sans", sans-serif',
  },
});

const notifications = [
  {
    id: 1,
    heading: "Message",
    icon: { name: "chat", color: "primary" },
    timestamp: 1570702802573,
    title: "New message from Devid",
    subtitle: "Hello, Any progress...",
    path: "chat",
  },
  {
    id: 2,
    heading: "Alert",
    icon: { name: "notifications", color: "error" },
    timestamp: 1570702702573,
    title: "Server overloaded",
    subtitle: "Traffice reached 2M",
    path: "page-layouts/user-profile",
  },
  {
    id: 3,
    heading: "Message",
    icon: { name: "chat", color: "primary" },
    timestamp: 1570502502573,
    title: "New message from Goustove",
    subtitle: "Hello, send me details",
    path: "chat",
  },
];

export default function Sidebar({ children, appBarText }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleDrawerToggle = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{
            boxShadow: "none",
            // boxShadow:
            //   "0px 5px 5px -3px rgba(0, 0, 0, 0.06), 0px 8px 10px 1px rgba(0, 0, 0, 0.042), 0px 3px 14px 2px rgba(0, 0, 0, 0.036)",
          }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
              backgroundColor: "white",
            }}
          >
            <IconButton
              edge="start"
              color="black"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, color: "black" }}
            >
              {appBarText}
            </Typography>
            <IconButton color="black" onClick={handleDrawerToggle}>
              <Badge badgeContent={4} color="info">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexGrow: 1,
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ width: "150px", height: "100%" }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: "bold",
                }}
              >
                CA
              </Typography>
            </Box>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton
              onClick={() => {
                navigate("/admin/dashboard");
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Trang chủ" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate("/admin/orders");
              }}
            >
              <ListItemIcon>
                <MoveToInboxIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách yêu cầu" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/admin/user")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý người dùng" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Integrations" />
            </ListItemButton>
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>

      <Modal
        open={panelOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          transform: "none",
          transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
        }}
      >
        <Slide direction="left" in={panelOpen} timeout={800}>
          <Box
            sx={{
              width: "400px",
              backgroundColor: "white",
              height: "100%",
              transform: "none",
              transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
            }}
          >
            <Notification>
              <NotificationsIcon color="primary" />
              <h5>Notifications</h5>
            </Notification>

            {notifications?.map((notification) => (
              <NotificationCard key={notification.id}>
                <DeleteButton
                  size="small"
                  className="deleteButton"
                  // onClick={() => deleteNotification(notification.id)}
                >
                  <Clear className="icon" />
                </DeleteButton>

                <Link
                  to={`/${notification.path}`}
                  onClick={handleDrawerToggle}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ mx: 2, mb: 3 }} elevation={3}>
                    <CardLeftContent>
                      <Box display="flex">
                        <Icon className="icon" color={notification.icon.color}>
                          {notification.icon.name}
                        </Icon>
                        <Heading>{notification.heading}</Heading>
                      </Box>

                      {/* <Small className="messageTime">
                              {getTimeDifference(
                                new Date(notification.timestamp)
                              )}
                              ago
                            </Small> */}
                    </CardLeftContent>

                    <Box px={2} pt={1} pb={2}>
                      <Typography m={0}>{notification.title}</Typography>
                      <Typography color="text.secondary">
                        {notification.subtitle}
                      </Typography>
                    </Box>
                  </Card>
                </Link>
              </NotificationCard>
            ))}

            {!!notifications?.length && (
              <Box color="text.secondary">
                <Button>Clear Notifications</Button>
              </Box>
            )}
          </Box>
        </Slide>
      </Modal>
    </ThemeProvider>
  );
}
