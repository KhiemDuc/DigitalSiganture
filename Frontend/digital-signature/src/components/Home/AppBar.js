import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "../ToggleColorMode";
import { Link, useNavigate } from "react-router-dom";
// import { Avatar } from "@mui/material";
import AccountMenu from "./AccountMenu";
import { useSelector } from "react-redux";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function AppAppBar({ mode, toggleColorMode, hideButton }) {
  const [open, setOpen] = React.useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={"../static/img/Knb.svg"}
                style={logoStyle}
                alt="logo of sitemark"
                onClick={() => {
                  navigate("/");
                  window.scrollTo(0, 0);
                }}
              />
              {!hideButton && (
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <MenuItem
                    onClick={() => scrollToSection("features")}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Dịch Vụ
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("testimonials")}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Ý kiến phản hồi
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("highlights")}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Nổi bật
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("pricing")}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Hội Viên
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("team")}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Team
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection("faq")}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      FAQ
                    </Typography>
                  </MenuItem>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {currentUser ? (
                <AccountMenu />
              ) : (
                <>
                  <Link
                    to="/sign_in"
                    style={{ textDecoration: "none", color: "primary" }}
                  >
                    Đăng Nhập
                  </Link>
                  <Link
                    to="/sign_up"
                    className="btn btn-primary"
                    style={{ textDecoration: "none", marginLeft: "8px" }}
                  >
                    Đăng Ký
                  </Link>
                </>
              )}
            </Box>

            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem onClick={() => scrollToSection("features")}>
                    Dịch Vụ
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("testimonials")}>
                    Đánh giá
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("highlights")}>
                    Nổi bật
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("pricing")}>
                    Hội viên
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("team")}>
                    Team
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("faq")}>
                    FAQ
                  </MenuItem>
                  <Divider />

                  {currentUser ? (
                    <AccountMenu />
                  ) : (
                    <>
                      <Link
                        to="/sign_in"
                        style={{ textDecoration: "none", color: "primary" }}
                      >
                        Đăng Nhập
                      </Link>
                      <Link
                        to="/sign_up"
                        className="btn btn-primary"
                        style={{ textDecoration: "none", marginLeft: "8px" }}
                      >
                        Đăng Ký
                      </Link>
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
