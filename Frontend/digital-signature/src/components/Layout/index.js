import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getLPTheme from "../../helpers/getLPTheme";
import { useState, useEffect } from "react";
import AppAppBar from "../Home/AppBar";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/infoSlice";
import { showToast, ToastType } from "../../common/toast";
import { Typography } from "@mui/material";

export default function Layout({ children, heading, subheading }) {
  const [mode, setMode] = useState("light");
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const LPtheme = createTheme(getLPTheme(mode));

  useEffect(() => {
    if (isLoggedIn) {
      console.log(user._id);
      dispatch(getUserInfo(user._id))
        .unwrap()
        .then(() => {})
        .catch((err) => {
          if (err.response.data.reason === "Token expired") return;
          showToast(
            "Lỗi khi lấy dữ liệu User vui lòng đăng nhập lại",
            ToastType.ERROR
          );
        });
    }
  }, [user, dispatch, isLoggedIn]);

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 4 },
        paddingBottom: "0 !important",
      }}
    >
      <ThemeProvider theme={LPtheme}>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Box sx={{ bgcolor: "background.default" }}>
          <AppAppBar
            hideButton="true"
            mode={mode}
            toggleColorMode={toggleColorMode}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { sm: "100%", md: "100%" },
              textAlign: { sm: "left", md: "left" },
            }}
          >
            <Typography component="h2" variant="h4" color="text.primary">
              {heading}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {subheading}
            </Typography>
          </Box>
        </Box>
        {children}
      </ThemeProvider>
    </Container>
  );
}
